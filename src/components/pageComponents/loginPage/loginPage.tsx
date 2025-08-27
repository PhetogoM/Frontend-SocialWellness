import React, { useState, FC } from "react";
import { Link } from "react-router-dom";
import { LoginPageWrapper } from "./loginPage.styled.tsx"; // your styled component

const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
  };

  return (
    <LoginPageWrapper data-testid="loginPage">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-6">Sign in to Unipath</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </LoginPageWrapper>
  );
};

export default LoginPage;
