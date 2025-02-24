/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const [registerUser, { isLoading, isError, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    const toastId = toast.loading("Registering...");
    try {
      await registerUser(data).unwrap();
      reset();
      toast.success("Registration successful! Please login.", {
        id: toastId,
        duration: 2000,
      });
      navigate("/login");
    } catch (err: any) {
      toast.error(err.data?.message || "Registration failed", { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Name is required" })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Email is required" })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
      {isError && (
        <p className="text-red-500">
          {error instanceof Error ? error.message : "An error occurred"}
        </p>
      )}

      <p className="mt-4 text-center">
        Already registered?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
