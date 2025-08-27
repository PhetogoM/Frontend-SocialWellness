import React, { FC } from "react";
import { Link } from "react-router-dom";
import { HomePageWrapper } from "./loginPage.styled";

const HomePage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-indigo-600 text-white px-8 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Unipath</h1>
        <div className="flex gap-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </div>
      </nav>

      <main className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to Unipath</h2>
          <p className="text-gray-600 mb-6">
            A social wellness platform to connect, share, and grow together.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            >
              Register
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
