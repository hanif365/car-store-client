/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../redux/features/auth/authApi';
import { setUser } from '../../../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import verifyToken from '@/utils/verifyToken';
import { TUser } from '../../../redux/features/auth/authSlice';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const onSubmit = async (data: LoginFormData) => {
    console.log("form data", data);
    const toastId = toast.loading("Logging in...");
    
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const result = await login(userInfo).unwrap();
      console.log("result", result);
      const user = verifyToken(result?.data?.accessToken) as TUser;
      console.log("user", user);
      dispatch(setUser({ user, token: result?.data?.accessToken }));
      toast.success("Logged in successfully", { id: toastId, duration: 2000 });
      localStorage.setItem('token', result?.data?.accessToken);

      navigate('/dashboard');
      // navigate(`/${user?.role}/dashboard`);
    } catch (error: any ) {
      setLoginError(error.data.message || 'Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Email is required" })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {loginError && <p className="mt-2 text-sm text-red-600">{loginError}</p>}
    </form>
  );
};

export default LoginForm;