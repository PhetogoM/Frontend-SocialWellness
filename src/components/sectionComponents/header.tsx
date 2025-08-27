import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-indigo-600 text-white px-8 py-4 flex items-center shadow">
      {/* Logo / Title */}
      <h1 className="text-xl font-bold">Unipath: Social Wellness</h1>

      {/* Navigation buttons on the right */}
      <div className="flex gap-4 ml-auto">
        <button
          onClick={() => navigate("/")}
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default Header;
