import React, { useState, FC } from "react";
import { Link } from "react-router-dom";

const RegisterPage: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering:", name, email, password);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">Create an account</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
        />
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
          Register
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
