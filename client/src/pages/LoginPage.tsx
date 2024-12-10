import React, { useState } from "react";
import { login } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful! Redirecting to your dashboard...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      toast.error("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <ToastContainer />
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
          Welcome Back!
        </motion.h2>

        {/* Form */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
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

          {/* Login Button */}
          <motion.button
            onClick={handleLogin}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
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
            Don't have an account?{" "}
            <a href="/signup" className="text-gray-300 hover:text-white underline">
              Sign up
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
