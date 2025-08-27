import React, { FC } from "react";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
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
  );
};

export default Header;
