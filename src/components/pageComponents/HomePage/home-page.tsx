import React, { FC } from "react";

const HomePage: FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main content centered */}
      <main className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <div className="inline-block bg-indigo-100 text-indigo-800 px-6 py-4 rounded-full shadow-lg mb-6">
            Welcome to Unipath!
          </div>
          <p className="text-gray-600 mb-6">
            A social wellness platform to connect, share, and grow together.
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
