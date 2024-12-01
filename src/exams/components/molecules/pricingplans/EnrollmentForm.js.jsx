import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const EnrollmentForm = ({ singlePackage, onSubmitSuccess, onCancel }) => {
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
        },
        mode: "onChange", // Validation occurs while typing
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
                {/* Name Field */}
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Enter your name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email Field */}
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    type="email"
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Enter your email"
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
                        disabled={!form.formState.isValid} // Disable button if form is invalid
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
