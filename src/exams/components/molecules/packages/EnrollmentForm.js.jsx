import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useSubscribeToPackageMutation } from "@/features/packages/packagesApi";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const EnrollmentForm = ({ singlePackage, onCancel }) => {
    const form = useForm({
        defaultValues: {
            payment_method: "",
            mobile_number: "",
            transaction_id: "",
            amount: singlePackage?.discountPrice || singlePackage?.price,
        },
        mode: "onChange",
    });

    const [subscribeToPackage, { isLoading }] = useSubscribeToPackageMutation();

    const onSubmit = async (data) => {
        const payload = new FormData();

        payload.append("resource_id", singlePackage?.id);
        payload.append("resource_type", "package");
        payload.append("payment_method", data.payment_method);
        payload.append("mobile_number", data.mobile_number);
        payload.append("transaction_id", data.transaction_id);
        payload.append("amount", data.amount);
        if (data.coupon) {
            payload.append("coupon", data.coupon);
        }

        try {
            const response = await subscribeToPackage(payload).unwrap();
            toast.success(response?.message || "");
            form.reset();
        } catch (error) {
            console.error(error);
            toast.error(error?.data?.message);
        }
    };

    return (
        <Form {...form}>
            {/* Payment Instructions */}
            <div className="bg-gray-100 p-4 rounded-md text-center text-sm mb-4">
                <h3 className="text-lg font-bold mb-2">Payment Instructions</h3>
                <p className="text-gray-700">
                    Please send the payment to the given number:
                </p>
                <strong className="mt-2 text-gray-600 space-y-1">
                    01706429945(personal)
                </strong>
                <p className="mt-2 text-gray-700">
                    After sending the payment, enter the transaction ID in the form below to complete your enrollment.
                </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Payment Method Field (Radio Buttons) */}
                <FormField
                    name="payment_method"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-md inline-block">Select Any Payment Method</FormLabel>
                            <FormControl>
                                <div className="flex gap-6 items-center justify-center">
                                    {["bkash", "nagad", "rocket"].map((method) => (
                                        <label key={method} className="flex items-center space-x-2">
                                            <input
                                                {...field}
                                                type="radio"
                                                value={method}
                                                checked={field.value === method}
                                                onChange={() => field.onChange(method)}
                                                className="form-radio"
                                            />
                                            <span className="capitalize">{method}</span>
                                        </label>
                                    ))}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Mobile Number Field */}
                <FormField
                    name="mobile_number"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Enter your mobile number"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Transaction ID Field */}
                <FormField
                    name="transaction_id"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Transaction ID</FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Enter the transaction ID"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Amount Field (Read-Only) */}
                <FormField
                    name="amount"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md"
                                    readOnly
                                    value={field.value}
                                    disabled
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                    <Button
                        type="submit"
                        disabled={isLoading || !form.formState.isValid}
                    >
                        {
                            isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : "Enroll Now"
                        }
                    </Button>
                    <Button
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default EnrollmentForm;
