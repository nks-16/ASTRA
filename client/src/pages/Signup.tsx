import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [role, setRole] = useState<string>('');  // Role no longer has a default value
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // API Call to register user
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        role
      }),
    });

    const data = await response.json();

    if (data.success) {
      navigate('/login');
    } else {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-4">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-400">Sign Up</h2>
        
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-300">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg"
            />
          </div>

          {/* Role field */}
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-semibold text-gray-300">Role</label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Investor/Proposer"
              required
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg"
            />
            <small className="text-gray-400">Enter 'Investor' or 'Proposer'</small>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
