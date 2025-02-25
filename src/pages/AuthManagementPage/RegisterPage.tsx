import RegisterForm from "@/components/Auth/Register/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
