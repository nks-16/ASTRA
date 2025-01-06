import React, { useState } from 'react';
import { signup } from '../services/apiService'; // Import the signup function from apiservices

const Signup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<'investor' | 'proposer'>('investor');
  const [error, setError] = useState<string>('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { name, email, password, role };

    try {
      const response = await signup(userData);
      console.log('Signup successful:', response);
      // Redirect or show success message
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value as 'investor' | 'proposer')}>
          <option value="investor">Investor</option>
          <option value="proposer">Proposer</option>
        </select>
        <button type="submit">Signup</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
