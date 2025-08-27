import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-200 text-indigo-900 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-6 py-6">
        {/* Logo / Title */}
        <h1 className="text-4xl font-extrabold">Unipath</h1>

        {/* Navigation buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
