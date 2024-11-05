import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegistrationMutation } from "./../../../features/auth/authApi";

const fetchUserIP = async () => {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error fetching IP address:", error);
        return null;
    }
};

const RegisterForm = () => {
    const navigate = useNavigate();
    const [ipAddress, setIpAddress] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        watch
    } = useForm();
    const watchPassword = watch("password");

    const [registration, { data, isSuccess, isLoading, error }] = useRegistrationMutation();

    useEffect(() => {
        const getUserIP = async () => {
            const ip = await fetchUserIP();
            setIpAddress(ip);
        };
        getUserIP();
    }, []);

    const handleRegister = (formData) => {
        const payload = new FormData();
        payload.append("name", formData.firstName);
        payload.append("email", formData.email);
        payload.append("password", formData.password);
        payload.append("password_confirmation", formData.password_confirmation);
        payload.append("phone", formData.phone);
        payload.append("active_status", 1);
        payload.append("ip_address", ipAddress);
        payload.append("country", formData.country);
        payload.append("country_code", formData.country_code);
        payload.append("address", formData.address);

        registration(payload);
    };

    useEffect(() => {
        if (error?.data) {
            console.log("Error:", error);
            toast.error(error?.data?.message);

            if (error.data.errors) {
                Object.entries(error.data.errors).forEach(([field, messages]) => {
                    setError(field, {
                        type: "manual",
                        message: messages[0],
                    });
                });
            } else {
                setError("root.random", {
                    type: "random",
                    message: `Something went wrong: ${error?.data?.message}`,
                });
            }
        }

        if (isSuccess && data?.data) {
            toast.success(data?.message);
            navigate("/login");
        }
    }, [error, setError, isSuccess, data, navigate]);

    return (
        <form onSubmit={handleSubmit(handleRegister)}>
            <input type="hidden" name="active_status" value={1} />
            <div className="grid gap-4 space-y-2 text-left">
                <div className="grid gap-1">
                    <Label htmlFor="firstName">Name</Label>
                    <Input
                        {...register("firstName", { required: "First Name is Required" })}
                        id="firstName"
                        name="firstName"
                        placeholder="Max"
                    />
                    {errors.firstName && <span className="text-red-600">{errors.firstName.message}</span>}
                </div>

                <div className="grid gap-1">
                    <Label htmlFor="email">Email</Label>
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
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        {...register("phone", { required: "Phone number is Required" })}
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="01*********"
                    />
                    {errors.phone && <span className="text-red-600">{errors.phone.message}</span>}
                </div>

                <div className="grid gap-1">
                    <Label htmlFor="address">Address</Label>
                    <Input
                        {...register("address")}
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Chattogram, Bangladesh"
                    />
                    {errors.address && <span className="text-red-600">{errors.address.message}</span>}
                </div>

                <div className="grid gap-1 relative">
                    <Label htmlFor="password">Password</Label>
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
                        type={showPass ? "text" : "password"}
                        placeholder="Password"
                    />
                    {showPass ? (
                        <EyeOff
                            onClick={() => setShowPass(!showPass)}
                            size={18}
                            className="absolute right-3 top-1/2 cursor-pointer"
                        />
                    ) : (
                        <Eye
                            onClick={() => setShowPass(!showPass)}
                            size={18}
                            className="absolute right-3 top-1/2 cursor-pointer"
                        />
                    )}
                    {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                </div>

                <div className="grid gap-1 relative">
                    <Label htmlFor="password_confirmation">Confirm Password</Label>
                    <Input
                        {...register("password_confirmation", {
                            required: "Confirm Password is required",
                            validate: (value) => value === watchPassword || "Passwords do not match",
                        })}
                        id="password_confirmation"
                        name="password_confirmation"
                        type={showConfirmPass ? "text" : "password"}
                        placeholder="Confirm Password"
                    />
                    {showConfirmPass ? (
                        <EyeOff
                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                            size={18}
                            className="absolute right-3 top-1/2 cursor-pointer"
                        />
                    ) : (
                        <Eye
                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                            size={18}
                            className="absolute right-3 top-1/2 cursor-pointer"
                        />
                    )}
                    {errors.password_confirmation && (
                        <span className="text-red-600">{errors.password_confirmation.message}</span>
                    )}
                </div>

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : (
                        "Register"
                    )}
                </Button>
            </div>
        </form>
    );
};

export default RegisterForm;
