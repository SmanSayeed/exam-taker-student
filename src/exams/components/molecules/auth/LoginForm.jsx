import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";

import { useLoggedInMutation } from "@/features/auth/authApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoaderSubmit } from "../../atoms/LoaderSubmit";

const LoginForm = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const [loggedIn, { data, isLoading, error }] = useLoggedInMutation();

    const handleLogin = (formData) => {
        loggedIn(formData);
    }

    useEffect(() => {
        if (error?.data) {
            setError("root.random", {
                type: "random",
                message: error.data?.message,
            });

            toast.error(error.data?.message);
        }

        if (data && data?.data?.token) {
            toast.success(data?.message);
            navigate("/exams");
        }
    }, [data, error, navigate, setError]);

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <div className="grid gap-4">
                <div className="grid gap-1">
                    <div className="flex items-center">
                        <Label htmlFor="email">Email</Label>
                    </div>
                    <Input
                        {...register("email", { required: "Email is Required" })}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                    />
                    {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                </div>
                <div className="grid gap-1">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Your password must be at least 8 characters",
                            },
                        })}
                        id="password"
                        name="password"
                        type="password"
                    />
                    {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                </div>

                <p className="text-red-600">{errors?.root?.random?.message}</p>

                <Button
                    disabled={isLoading}
                >
                    {
                        isLoading ? (
                            <LoaderSubmit />
                        ) : "Login"
                    }
                </Button>
            </div>
        </form>
    )
}

export default LoginForm;