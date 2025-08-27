import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { RegisterPageWrapper } from './RegisterPage.styled';

interface RegisterPageProps {}

const RegisterPage: FC<RegisterPageProps> = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering:", name, email, password);
  };

  return (
    <RegisterPageWrapper data-testid="RegisterPage">
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <nav className="bg-indigo-600 text-white px-8 py-4 flex justify-between items-center shadow">
          <h1 className="text-xl font-bold">Unipath</h1>
          <div className="flex gap-6">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </div>
        </nav>

        <div className="flex flex-1 items-center justify-center px-4">
          <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-center text-2xl font-bold mb-6">Create an account</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
              >
                Register
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </RegisterPageWrapper>
  );
};

export default RegisterPage;

