/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    const toastId = toast.loading("Registering...");
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      await registerUser(userInfo).unwrap();
      toast.success("Registration successful", { id: toastId, duration: 2000 });
      navigate('/login');
    } catch (error: any) {
      setRegisterError(error.data.message || 'Registration failed');
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-gray-300 px-4 pt-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md space-y-6"
      >
        <div className="text-center space-y-2">
          {/* <h2 className="text-xl font-bold text-gray-800">Create Account</h2> */}
          <p className="text-gray-600 font-semibold">Please fill in your information</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-gray-300 transition duration-200 ease-in-out"
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-gray-300 transition duration-200 ease-in-out"
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-gray-300 transition duration-200 ease-in-out"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        {registerError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600 text-center">{registerError}</p>
          </div>
        )}

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition duration-150">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
