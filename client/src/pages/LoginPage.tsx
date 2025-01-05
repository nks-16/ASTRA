// LoginPage.tsx
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the login logic here
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-4">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-blue-400">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
