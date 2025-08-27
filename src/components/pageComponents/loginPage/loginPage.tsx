import React, { useState, FC } from "react";
import { Link } from "react-router-dom";
import { LoginPageWrapper } from "./loginPage.styled";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
  };

  return (
    <LoginPageWrapper data-testid="loginPage">
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <nav className="bg-indigo-600 text-white px-8 py-4 flex justify-between items-center shadow">
          <h1 className="text-xl font-bold">Unipath</h1>
          <div className="flex gap-6">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/features" className="hover:underline">
              Features
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
          <div className="flex gap-3">
            <Link
              to="/login"
              className="bg-white text-indigo-600 px-4 py-1 rounded-full font-medium hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-indigo-500 px-4 py-1 rounded-full font-medium hover:bg-indigo-400"
            >
              Register
            </Link>
          </div>
        </nav>

        {/* Login form */}
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-center text-2xl font-bold mb-6">
              Sign in to Unipath
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                Login
              </button>
            </form>

            <div className="mt-6">
              <p className="text-center text-gray-500 mb-3">Or sign in with</p>
              <div className="flex flex-col gap-3">
                <button className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600">
                  Google
                </button>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700">
                  Phone
                </button>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </LoginPageWrapper>
  );
};

export default LoginPage;
