import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center p-4">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-blue-400 mb-6">Welcome to ASTRA</h1>
        <p className="text-lg text-gray-400 mb-6">
          Your go-to platform for ESG-focused investment strategies and project proposals.
        </p>
        <div className="flex justify-center space-x-6">
          <Link to="/login" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-400 transition duration-300">
            Login
          </Link>
          <Link to="/signup" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-400 transition duration-300">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
