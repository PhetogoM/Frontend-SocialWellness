import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

const Footer: FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-blue-100 text-indigo-900 py-6 mt-auto shadow-inner">
      <div className="container mx-auto flex justify-between items-center px-6">
        <p className="text-lg font-medium">&copy; {new Date().getFullYear()} Unipath. All Rights Reserved</p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
