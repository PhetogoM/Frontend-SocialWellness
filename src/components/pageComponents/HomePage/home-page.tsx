import React, { FC } from "react";
import { Link } from "react-router-dom";

const HomePage: FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Welcome Bubble */}
      <div className="bg-indigo-600 text-white text-6xl font-bold px-16 py-12 rounded-3xl shadow-xl text-center">
        Welcome to Unipath
      </div>
    </div>
  );
};

export default HomePage;