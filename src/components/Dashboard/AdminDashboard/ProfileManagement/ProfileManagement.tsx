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

  console.log("profileData", profileData);

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
    <div className="container mx-auto px-1 py-6 max-w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        {/* Profile Information Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100"
        >
          <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-blue-600 flex items-center">
            <FaUser className="mr-2" /> Update Profile
          </h3>

          <form
            onSubmit={handleProfileSubmit(onProfileSubmit)}
            className="space-y-6"
          >
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-6 bg-gray-100 flex items-center justify-center border-4 border-blue-100 shadow-md">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-gray-300 text-6xl" />
                )}
              </div>

              <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm sm:text-base transition-all duration-200 transform hover:scale-105 shadow-md flex items-center">
                <span className="mr-2">Upload Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* Name */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaUser className="mr-2 text-blue-500" /> Name
              </label>
              <input
                type="text"
                {...registerProfile("name", { required: "Name is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
                placeholder="Enter your name"
              />
              {profileErrors.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠</span> {profileErrors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaEnvelope className="mr-2 text-blue-500" /> Email
              </label>
              <input
                type="email"
                value={profileData?.data?.email || ""}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none cursor-not-allowed text-sm sm:text-base"
              />
              <p className="mt-2 text-xs text-gray-500 italic">
                Email cannot be changed
              </p>
            </div>

            {/* Role */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaIdBadge className="mr-2 text-blue-500" /> Role
              </label>
              <input
                type="text"
                value={currentUser?.role || ""}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none cursor-not-allowed text-sm sm:text-base capitalize"
              />
              <p className="mt-2 text-xs text-gray-500 italic">
                Role cannot be changed
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isUploading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium text-sm sm:text-base transition-all duration-200 shadow-md ${
                isUploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isUploading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading Photo...
                </span>
              ) : (
                "Update Profile"
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Change Password Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col"
        >
          <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-green-600 flex items-center">
            <FaLock className="mr-2" /> Change Password
          </h3>

          <form
            onSubmit={handlePasswordSubmit(onPasswordSubmit)}
            className="space-y-6 flex-grow"
          >
            {/* Current Password */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  {...registerPassword("currentPassword", {
                    required: "Current password is required",
                  })}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <FaEyeSlash className="text-gray-500 text-lg" />
                  ) : (
                    <FaEye className="text-gray-500 text-lg" />
                  )}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠</span>{" "}
                  {passwordErrors.currentPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="group">
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
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <FaEyeSlash className="text-gray-500 text-lg" />
                  ) : (
                    <FaEye className="text-gray-500 text-lg" />
                  )}
                </button>
              </div>
              {passwordErrors.newPassword && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠</span>{" "}
                  {passwordErrors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...registerPassword("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-gray-500 text-lg" />
                  ) : (
                    <FaEye className="text-gray-500 text-lg" />
                  )}
                </button>
              </div>
              {passwordErrors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠</span>{" "}
                  {passwordErrors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Password Security Tips */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 mt-4">
              <h4 className="text-sm font-medium text-green-800 mb-2 flex items-center">
                <FaShieldAlt className="mr-2" /> Password Security Tips
              </h4>
              <ul className="text-xs text-green-700 space-y-1 ml-6 list-disc">
                <li>Use at least 6 characters</li>
                <li>Include uppercase and lowercase letters</li>
                <li>Add numbers and special characters</li>
                <li>Avoid using personal information</li>
                <li>Don't reuse passwords across multiple sites</li>
                <li>Don't share your password with anyone</li>
              </ul>
            </div>

            {/* Additional Information */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <FaInfoCircle className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-xs text-blue-700">
                  After changing your password, you'll be automatically logged
                  out and redirected to the login page. Please sign in with your
                  new password.
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium text-sm sm:text-base transition-all duration-200 shadow-md mt-4"
            >
              Change Password
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileManagement;
