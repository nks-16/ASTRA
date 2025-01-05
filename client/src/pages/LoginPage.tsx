import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [role, setRole] = useState<string>('investor');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        role
      }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } else {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-4">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-400">Login</h2>

        <form onSubmit={handleLogin}>
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

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-300">I am a:</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  value="investor"
                  checked={role === 'investor'}
                  onChange={() => setRole('investor')}
                  className="text-blue-500"
                />
                Investor
              </label>
              <label>
                <input
                  type="radio"
                  value="proposer"
                  checked={role === 'proposer'}
                  onChange={() => setRole('proposer')}
                  className="text-blue-500"
                />
                Proposer
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
