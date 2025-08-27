import React, { FC } from "react";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <nav className="bg-indigo-600 text-white px-8 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">Unipath</h1>
      <div className="flex gap-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
      </div>
    </nav>
  );
};

export default Header;
