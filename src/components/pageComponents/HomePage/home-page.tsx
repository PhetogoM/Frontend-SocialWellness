import React, { FC } from "react";
import { Link } from "react-router-dom";

const HomePage: FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-blue-400 text-white py-6 px-8 flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-bold">Unipath: Social Wellness</h1>
        <div className="flex gap-4">
          <Link
            to="/"
            className="bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Centered Welcome Bubble */}
      <main className="flex flex-1 items-center justify-center">
        <div className="bg-white rounded-3xl p-12 shadow-xl text-center max-w-lg">
          <h2 className="text-5xl font-extrabold mb-4 text-blue-500">Welcome</h2>
          <p className="text-gray-600 text-lg">
            A social wellness platform to connect, share, and grow together.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-300 text-white py-6 text-center mt-auto shadow-inner">
        &copy; {new Date().getFullYear()} Unipath. All Rights Reserved.
      </footer>
    </div>
  );
};

export default HomePage;
