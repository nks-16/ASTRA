import React, { useState } from "react";
import { signup } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signup({ name, email, password });
      setMessage({ type: "success", text: "Signup successful! Redirecting to login..." });
      setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
    } catch (error) {
      setMessage({ type: "error", text: "Signup failed. Please check your details and try again." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <motion.div
        className="w-full max-w-lg p-8 bg-gray-900 rounded-3xl shadow-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <motion.h2
          className="text-4xl font-extrabold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Create Your Account
        </motion.h2>

        {/* Notification Message */}
        {message && (
          <motion.div
            className={`mb-6 p-4 rounded-lg text-center font-semibold ${
              message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {message.text}
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-400 mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-gray-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-400 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-gray-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-400 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-gray-500"
            />
          </div>

          {/* Signup Button */}
          <motion.button
            onClick={handleSignup}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Signup
          </motion.button>
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          className="text-center mt-6 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-gray-300 hover:text-white underline">
              Log in
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
