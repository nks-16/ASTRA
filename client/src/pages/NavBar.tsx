// NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-semibold text-white">
          <Link to="/">YourApp</Link>
        </div>
        <div className="hidden md:flex space-x-6 text-white">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/login" className="hover:text-blue-400">Login</Link>
          <Link to="/signup" className="hover:text-blue-400">Signup</Link>
        </div>
        <div className="md:hidden flex items-center">
          <button className="text-white">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
