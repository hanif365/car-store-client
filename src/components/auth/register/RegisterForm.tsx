/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-gray-300 px-4 pt-20">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>
        <p className="text-center text-gray-600">Please register to create an account</p>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-blue-500 sm:text-sm transition duration-200 ease-in-out"
          />
          {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-blue-500 sm:text-sm transition duration-200 ease-in-out"
          />
          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-blue-500 sm:text-sm transition duration-200 ease-in-out"
          />
          {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
        {registerError && <p className="mt-2 text-sm text-red-600">{registerError}</p>}
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
