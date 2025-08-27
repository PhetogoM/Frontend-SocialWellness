import React, { FC } from "react";
import { Link } from "react-router-dom";

const HomePage: FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top navigation */}
      <nav className="bg-indigo-600 text-white px-8 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Unipath</h1>
        <div className="flex gap-4">
          <Link
            to="/"
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Main content with welcome bubble */}
      <main className="flex flex-1 items-center justify-center">
        <div className="bg-indigo-600 text-white px-12 py-8 rounded-full shadow-2xl text-center">
          <h1 className="text-4xl font-bold">Welcome to Unipath!</h1>
          <p className="mt-4 text-lg">
            A social wellness platform to connect, share, and grow together.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4 mt-auto">
        &copy; 2025 Unipath. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
