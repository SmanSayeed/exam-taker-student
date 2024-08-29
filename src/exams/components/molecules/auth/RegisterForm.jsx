import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

// import { useUserRegisterMutation } from "@/features/auth/authApi";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const [imageError, setImageError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        watch,
        control
    } = useForm();
    const watchPassword = watch("password");

    // const [userRegister, { data, isSuccess, isLoading, error }] = useUserRegisterMutation();

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
        const payload = {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.confirmPassword,
            role: formData.role,
            phone: formData.phone,
            active_status: isActive,
            picture: profileImage
        }

        userRegister(payload);
    }

    // useEffect(() => {
    //     if (error?.data) {
    //         toast.error(error?.data?.message);

    //         setError("root.random", {
    //             type: "random",
    //             message: `Something went wrong: ${error?.data?.message}`
    //         });
    //     }

    //     if (isSuccess && data?.data) {
    //         toast.success(data?.message);
    //         navigate("/admin/users");
    //     }
    // }, [error, setError, isSuccess, data, navigate]);

    return (
        <form onSubmit={handleSubmit(handleRegister)} >
            <div className="grid gap-4 space-y-2">
                {/* name */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-1">
                        <div className="flex items-center">
                            <Label htmlFor="firstName">First name</Label>
                        </div>
                        <Input
                            {...register("firstName", { required: "First Name is Required" })}
                            id="firstName"
                            name="firstName"
                            placeholder="Max"
                        />
                        {errors.firstName && <span className="text-red-600">{errors.firstName.message}</span>}
                    </div>
                    <div className="grid gap-1">
                        <div className="flex items-center">
                            <Label htmlFor="lastName">Last name</Label>
                        </div>
                        <Input
                            {...register("lastName", { required: "Last Name is Required" })}
                            id="lastName"
                            name="lastName"
                            placeholder="Robinson"
                        />
                        {errors.lastName && <span className="text-red-600">{errors.lastName.message}</span>}
                    </div>
                </div>

                {/* email */}
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

                <div className="grid grid-cols-2 gap-4">
                    {/* phone number */}
                    <div className="grid gap-1">
                        <div className="flex items-center">
                            <Label htmlFor="phone">Phone(optional)</Label>
                        </div>
                        <Input
                            {...register("phone")}
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+880 16123-4567"
                        />
                    </div>

                    {/* role */}
                    <div className="grid gap-1">
                        {/* <Label>Role</Label> */}
                        <div className="flex items-center">
                            <Label htmlFor="Role">Registration as</Label>
                        </div>
                        <Controller
                            name="role"
                            control={control}
                            rules={{ required: "Role is required" }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="As a" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="sub_admin">Sub-admin</SelectItem>
                                        <SelectItem value="editor">Editor</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.role && <span className="text-red-600">{errors.role.message}</span>}
                    </div>
                </div>
                
                {/* profile image */}
                <div className="grid gap-1">
                    <div className="flex items-center">
                        <Label htmlFor="picture">Profile Image</Label>
                    </div>
                    <Input
                        {...register("picture")}
                        id="picture"
                        name="picture"
                        type="file"
                        accept="image/jpeg, image/jpg, image/png"
                        onChange={handleImageChange}
                    />
                    {imageError && <span className="text-red-600">{imageError}</span>}
                    {errors.picture && <span className="text-red-600">{errors.picture.message}</span>}
                </div>

                {/* password */}
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
                        placeholder="A-Strong_Password"
                    />
                    {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                </div>

                {/* confirm password */}
                <div className="grid gap-1">
                    <div className="flex items-center">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                    </div>
                    <Input
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: value => value === watchPassword || "Passwords do not match"
                        })}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Retype the password"
                    />
                    {errors.confirmPassword && <span className="text-red-600">{errors.confirmPassword.message}</span>}
                </div>

                {/* Active status */}
                <div className="flex items-center space-x-2">
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
                </div>

                <Button
                    // disabled={isLoading}
                >
                    Create an account
                </Button>
            </div>
        </form>
    )
}
export default RegisterForm;