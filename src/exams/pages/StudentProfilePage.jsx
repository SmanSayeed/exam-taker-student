import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Define the countries object
const countries = [
  { code: "AF", name: "Afghanistan" },
  { code: "DZ", name: "Algeria" },
  { code: "AL", name: "Albania" },
  { code: "AU", name: "Australia" },
  { code: "AR", name: "Argentina" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BD", name: "Bangladesh" },
  { code: "BT", name: "Bhutan" },
  { code: "BM", name: "Bermuda" },
  { code: "BE", name: "Belgium" },
  { code: "BY", name: "Belarus" },
  { code: "US", name: "United States" },
];

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  country: z.string().optional(),
  country_code: z.string().optional(),
  address: z.string().optional(),
});

const StudentProfilePage = () => {
  const { data: profileData, isLoading: isLoadingProfile } =
    useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [preview, setPreview] = useState(null);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      country_code: "",
      address: "",
    },
  });

  // Initialize form data when profile data is loaded
  useEffect(() => {
    if (profileData?.data) {
      const profile = profileData.data;
      reset({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        country: profile.country || "",
        country_code: profile.country_code || "",
        address: profile.address || "",
      });

      // Set preview if profile image exists
      if (profile.profile_image) {
        setPreview(profile.profile_image);
      }
    }
  }, [profileData, reset]);

  // Handle profile image changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      const isValidSize = file.size <= 2 * 1024 * 1024; // 2MB

      if (!validTypes.includes(file.type)) {
        setImageError("Only jpg, jpeg, and png formats are allowed.");
        setProfileImage(null);
        setPreview(null);
        return;
      }

      if (!isValidSize) {
        setImageError("File size should not exceed 2 MB.");
        setProfileImage(null);
        setPreview(null);
        return;
      }

      setImageError("");
      setProfileImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  // Handle country selection
  const handleCountryChange = (countryCode) => {
    setValue("country", countryCode);
    setValue("country_code", countries[countryCode]?.code || "");
  };

  // Handle form submission
  // Handle form submission
  const onSubmit = async (data) => {
    const payload = new FormData();

    // Append form data
    Object.entries(data).forEach(([key, value]) => {
      if (value) payload.append(key, value);
    });

    // Append profile image if changed
    if (profileImage) {
      payload.append("profile_image", profileImage);
    }

    // Log the FormData entries for debugging
    for (let [key, value] of payload.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      await updateProfile(payload).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  // Handle cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setImageError("");
    setProfileImage(null);

    // Reset form to current profile data
    if (profileData?.data) {
      const profile = profileData.data;
      reset({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        country: profile.country || "",
        country_code: profile.country_code || "",
        address: profile.address || "",
      });
      setPreview(profile.profile_image);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const profile = profileData?.data;

  return (
    <div className="px-2">
      <Card className="mx-auto max-w-lg xl:max-w-xl w-full mt-20 md:mt-12">
        <CardHeader>
          <CardTitle className="text-2xl underline underline-offset-2">
            Student Profile
          </CardTitle>
          <CardDescription>
            View and manage your profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            // View Mode
            <div className="space-y-6">
              <div className="flex justify-center">
                {preview || profile?.profile_image ? (
                  <img
                    src={preview || profile.profile_image}
                    alt={`${profile.name}'s Profile`}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold">
                    {profile?.name?.[0]}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold">Name:</span>
                  <span className="col-span-2">{profile?.name}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold">Email:</span>
                  <span className="col-span-2">{profile?.email}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold">Phone:</span>
                  <span className="col-span-2">
                    {profile?.phone || "Not provided"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold">Country:</span>
                  <span className="col-span-2">
                    {countries[profile?.country]?.name ||
                      profile?.country ||
                      "Not provided"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold">Country Code:</span>
                  <span className="col-span-2">
                    {profile?.country_code || "Not provided"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold">Address:</span>
                  <span className="col-span-2">
                    {profile?.address || "Not provided"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold">Status:</span>
                  <span className="col-span-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${profile?.active_status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                    >
                      {profile?.active_status ? "Active" : "Inactive"}
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              </div>
            </div>
          ) : (
            // Edit Mode
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Profile Image */}
              <div className="flex flex-col items-center gap-4">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold">
                    {profile?.name?.[0]}
                  </div>
                )}

                <div className="grid gap-1.5 w-full">
                  <Label htmlFor="profile_image">Profile Image</Label>
                  <Input
                    id="profile_image"
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={handleImageChange}
                  />
                  {imageError && (
                    <span className="text-red-600 text-sm">{imageError}</span>
                  )}
                </div>
              </div>

              {/* Name */}
              <div className="grid gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Your name"
                />
                {errors.name && (
                  <span className="text-red-600 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <span className="text-red-600 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Country and Country Code */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={watch("country")}
                    onValueChange={handleCountryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Countries</SelectLabel>
                        {Object.entries(countries).map(([code, { name }]) => (
                          <SelectItem key={code} value={code}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="country_code">Country Code</Label>
                  <Input
                    id="country_code"
                    {...register("country_code")}
                    placeholder="+880"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="grid gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="Your phone number"
                />
              </div>

              {/* Address */}
              <div className="grid gap-1.5">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  {...register("address")}
                  placeholder="Your address"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfilePage;
