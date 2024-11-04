import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegistrationMutation } from "./../../../features/auth/authApi";

// Utility function to fetch IP
const fetchUserIP = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error fetching IP address:", error);
        return null;
    }
};

const RegisterForm = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const [imageError, setImageError] = useState("");
    const [ipAddress, setIpAddress] = useState(""); // State to store IP address
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

    // Fetch IP address when component mounts
    useEffect(() => {
        const getUserIP = async () => {
            const ip = await fetchUserIP();
            setIpAddress(ip);
        };
        getUserIP();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const validTypes = ["image/jpeg", "image/jpg", "image/png"];
            const isValidType = validTypes.includes(file.type);
            const isValidSize = file.size <= 2 * 1024 * 1024; // 2 MB

            if (!isValidType) {
                setImageError("Only jpg, jpeg, and png formats are allowed.");
                setProfileImage(null);
                return;
            }

            if (!isValidSize) {
                setImageError("File size should not exceed 2 MB.");
                setProfileImage(null);
                return;
            }

            setImageError("");
            setProfileImage(file);
        }
    };

    const handleRegister = (formData) => {
        // Create a new FormData object
        const payload = new FormData();

        // Append form data to FormData object
        payload.append("name", formData.firstName);
        payload.append("email", formData.email);
        payload.append("password", formData.password);
        payload.append("password_confirmation", formData.password_confirmation);
        payload.append("phone", formData.phone);
        // payload.append("active_status", isActive);
        // Convert isActive to 1 or 0 and append it
        payload.append("active_status", isActive ? 1 : 0);

        // Check if the profile image exists and append it
        if (profileImage) {
            payload.append("profile_image", profileImage);  // Append the profile image
        }

        payload.append("ip_address", ipAddress);  // Append IP address
        payload.append("country", formData.country);
        payload.append("country_code", formData.country_code);
        payload.append("address", formData.address);

        // Make the registration API call with the FormData payload
        registration(payload);
    };

    useEffect(() => {
        if (error?.data) {
            console.log("err is ", error)
            toast.error(error?.data?.message);

            setError("root.random", {
                type: "random",
                message: `Something went wrong: ${error?.data?.message}`,
            });
        }

        if (isSuccess && data?.data) {
            toast.success(data?.message);
            navigate("/login");
        }
    }, [error, setError, isSuccess, data, navigate]);

    return (
        <form onSubmit={handleSubmit(handleRegister)}>
            <div className="grid gap-4 space-y-2 text-left ">
                {/* Name */}
                <div className="grid gap-1">
                    <div className="flex items-center">
                        <Label htmlFor="firstName">Name</Label>
                    </div>
                    <Input
                        {...register("firstName", { required: "First Name is Required" })}
                        id="firstName"
                        name="firstName"
                        placeholder="Max"
                    />
                    {errors.firstName && <span className="text-red-600">{errors.firstName.message}</span>}
                </div>

                {/* Email */}
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

                {/* Country and Country code */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-1">
                        <div className="flex items-center">
                            <Label htmlFor="country">Country</Label>
                        </div>
                        <Select name="country" id="country"
                            {...register("country_code", { required: "Country code is Required" })} >
                            <SelectTrigger className="">
                                <SelectValue placeholder="Bangladesh" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Country</SelectLabel>
                                    <SelectItem value="AF">Afghanistan</SelectItem>
                                    <SelectItem value="DZ">Algeria</SelectItem>
                                    <SelectItem value="AL">Albania</SelectItem>
                                    <SelectItem value="AU">Australia</SelectItem>
                                    <SelectItem value="AR">Argentina</SelectItem>
                                    <SelectItem value="AZ">Azerbaijan</SelectItem>
                                    <SelectItem value="AZ">Azerbaijan</SelectItem>
                                    <SelectItem value="BD">Bangladesh</SelectItem>
                                    <SelectItem value="BT">Bhutan</SelectItem>
                                    <SelectItem value="BM">Bermuda</SelectItem>
                                    <SelectItem value="BE">Belgium</SelectItem>
                                    <SelectItem value="BY">Belarus</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.country && <span className="text-red-600">{errors.country.message}</span>}
                    </div>

                    <div className="grid gap-1">
                        <div className="flex items-center">
                            <Label htmlFor="country_code">Country Code</Label>
                        </div>
                        <Input
                            {...register("country_code", { required: "Country code is Required" })}
                            id="country_code"
                            name="country_code"
                            type="number"
                            placeholder="+88"
                        />
                        {errors.country_code && <span className="text-red-600">{errors.country_code.message}</span>}
                    </div>
                </div> */}

                {/* Phone and Profile Image */}
                <div className="">
                    {/* Phone */}
                    <div className="grid gap-1">
                        <div className="flex items-center">
                            <Label htmlFor="phone">Phone (optional)</Label>
                        </div>
                        <Input
                            {...register("phone", { required: "Phone number is Required" })}
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+880 16123-4567"
                        />
                        {errors.phone && <span className="text-red-600">{errors.phone.message}</span>}
                    </div>

                    {/* Profile Image */}
                    {/* <div className="grid gap-1">
                        <div className="flex items-center">
                            <Label htmlFor="profile_image">Profile Image</Label>
                        </div>
                        <Input
                            id="profile_image"
                            name="profile_image"
                            type="file"
                            accept="image/jpeg, image/jpg, image/png"
                            onChange={handleImageChange}
                        />
                        {imageError && <span className="text-red-600">{imageError}</span>}
                    </div> */}
                </div>

                {/* Address */}
                <div className="grid gap-1">
                    <div className="flex items-center">
                        <Label htmlFor="address">Address</Label>
                    </div>
                    <Input
                        {...register("address")}
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Chattogram, Bangladesh"
                    />
                    {errors.address && <span className="text-red-600">{errors.address.message}</span>}
                </div>

                {/* Password */}
                <div className="grid gap-1 relative">
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

                {/* Confirm Password */}
                <div className="grid gap-1 relative">
                    <div className="flex items-center">
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                    </div>
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
                    {errors.password_confirmation && <span className="text-red-600">{errors.password_confirmation.message}</span>}
                </div>

                {/* Active status */}
                {/* <div className="flex items-center space-x-2">
                    <Checkbox
                        id="active_status"
                        checked={isActive}
                        onCheckedChange={(checked) => setIsActive(checked)}
                    />
                    <label
                        htmlFor="active_status"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Active Status
                    </label>
                </div> */}

                {/* Submit button */}
                <Button type="submit" disabled={isLoading}>
                    {
                        isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : "Register"
                    }
                </Button>
            </div>
        </form>
    );
};

export default RegisterForm;