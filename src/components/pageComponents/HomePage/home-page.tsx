import React, { FC } from "react";
import { Link } from "react-router-dom";

const HomePage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 bg-gray-50 min-h-screen px-4">
      {/* Welcome Bubble */}
      <div className="bg-indigo-600 text-white text-5xl font-bold px-12 py-8 rounded-3xl shadow-lg text-center">
        Welcome to Unipath
      </div>

      {/* Optional description */}
      <p className="text-gray-700 mt-6 text-center max-w-xl">
        A social wellness platform to connect, share, and grow together.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <Link
          to="/login"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
