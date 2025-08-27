import React, { FC } from "react";

const HomePage: FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="bg-indigo-100 text-indigo-800 px-16 py-12 rounded-3xl shadow-2xl text-center">
          <h1 className="text-6xl font-extrabold mb-4">Welcome!</h1>
          <p className="text-xl font-medium">
            A social wellness platform to connect, share, and grow together.
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
