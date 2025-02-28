import { useState, ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "@/redux/features/user/userApi";
import { uploadImageToImgBB } from "@/utils/imageUpload";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaLock,
  FaEnvelope,
  FaIdBadge,
  FaShieldAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Loader from "@/components/Shared/Loader/Loader";

interface ProfileForm {
  name: string;
  profileImage?: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfileManagement = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const currentUser = useAppSelector(selectCurrentUser);

  const { data: profileData, isLoading } = useGetMyProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword] = useChangePasswordMutation();

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    setValue: setProfileValue,
    formState: { errors: profileErrors },
  } = useForm<ProfileForm>();

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    formState: { errors: passwordErrors },
  } = useForm<PasswordForm>();

  // Reference for password matching
  const newPassword = watch("newPassword");

  // Set initial form values when profile data is loaded
  useEffect(() => {
    if (profileData?.data) {
      setProfileValue("name", profileData.data.name);
      setImagePreview(profileData.data.profileImage || null);
    }
  }, [profileData, setProfileValue]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const onProfileSubmit = async (data: ProfileForm) => {
    try {
      // Upload image if there's a new file
      if (imageFile) {
        setIsUploading(true);
        const imageUrl = await uploadImageToImgBB(imageFile);
        data.profileImage = imageUrl;
        setIsUploading(false);
      }

      // Don't include email in the update
      await updateProfile({
        name: data.name,
        profileImage: data.profileImage,
      }).unwrap();

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to update profile"
      );
    }
  };

  const onPasswordSubmit = async (data: PasswordForm) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password don't match");
      return;
    }

    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();

      toast.success(
        "Password changed successfully. Please login again with your new password."
      );

      // Log out the user
      setTimeout(() => {
        // Clear auth state
        dispatch(logout());

        // Remove token from localStorage
        localStorage.removeItem("token");

        // Redirect to login page
        navigate("/login");
      }, 2000); // Short delay to allow the user to see the success message
    } catch (error) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to change password"
      );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-2 sm:px-1 py-3 sm:py-6 max-w-full">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Profile Information Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-8 text-gray-800">
            <FaUser className="inline-block mr-2 text-blue-600" />
            Profile Information
          </h3>

          <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <FaUser className="text-gray-300 text-5xl" />
                  </div>
                )}
              </div>

              <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                <FaUser className="mr-2" />
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaUser className="inline mr-2 text-blue-600" />
                Full Name
              </label>
              <input
                type="text"
                {...registerProfile("name", { required: "Name is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
              />
              {profileErrors.name && (
                <p className="mt-1 text-sm text-red-600">{profileErrors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaEnvelope className="inline mr-2 text-blue-600" />
                Email Address
              </label>
              <input
                type="email"
                value={profileData?.data?.email || ""}
                readOnly
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaIdBadge className="inline mr-2 text-blue-600" />
                Role
              </label>
              <input
                type="text"
                value={currentUser?.role || ""}
                readOnly
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed capitalize"
              />
              <p className="mt-1 text-xs text-gray-500">Role cannot be changed</p>
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className={`w-full py-3 rounded-lg text-white font-medium transition duration-200 ${
                isUploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isUploading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </motion.div>

        {/* Change Password Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-8 text-gray-800">
            <FaLock className="inline-block mr-2 text-green-600" />
            Change Password
          </h3>

          <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  {...registerPassword("currentPassword", {
                    required: "Current password is required",
                  })}
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showCurrentPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {passwordErrors.currentPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  {...registerPassword("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showNewPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </button>
              </div>
              {passwordErrors.newPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {passwordErrors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...registerPassword("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </button>
              </div>
              {passwordErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {passwordErrors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-green-800 mb-2 flex items-center">
                <FaShieldAlt className="mr-2" />
                Password Requirements
              </h4>
              <ul className="text-sm text-green-700 space-y-1 ml-6 list-disc">
                <li>Minimum 6 characters</li>
                <li>Include numbers and special characters</li>
                <li>Mix of uppercase and lowercase letters</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700 flex items-center">
                <FaInfoCircle className="mr-2" />
                You'll be logged out after changing your password
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition duration-200"
            >
              Change Password
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileManagement;
