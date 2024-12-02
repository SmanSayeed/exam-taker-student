import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const EnrollmentForm = ({ singlePackage, onSubmitSuccess, onCancel }) => {
    const form = useForm({
        defaultValues: {
            payment_method: "",
            mobile_number: "",
            transaction_id: "",
            amount: singlePackage?.discountPrice || singlePackage?.price,
        },
        mode: "onChange",
    });

    const onSubmit = (data) => {
        console.log("Enrolling student with data:", data);

        // Simulate an API call for enrollment
        setTimeout(() => {
            alert(`Enrollment successful for ${singlePackage?.name}!`);
            form.reset(); // Clear the form after submission
            onSubmitSuccess(); // Close the dialog
        }, 1000);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Payment Method Field (Radio Buttons) */}
                <FormField
                    name="payment_method"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-md inline-block">Payment Method</FormLabel>
                            <FormControl>
                                <div className="flex gap-2 items-center">
                                    {["bkash", "nagad", "rocket"].map((method) => (
                                        <label key={method} className="flex items-center space-x-2 md:ml-2">
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
                        disabled={!form.formState.isValid}
                    >
                        Enroll Now
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
