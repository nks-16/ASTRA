import React, { useState } from "react";
import { joinTeam } from "../services/apiService";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom

const JoinTeam: React.FC = () => {
  const [teamId, setTeamId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // To track success
  const navigate = useNavigate(); // Hook for navigation

  const handleJoinTeam = async () => {
    try {
      if (!teamId) {
        setError("Team ID is required");
        return;
      }
      setError("");
      await joinTeam(teamId); // API call to join the team
      setSuccess(true); // Set success to true
      navigate("/mcq"); // Navigate to MCQ page upon success
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to join the team");
    }
  };

  return (
    <motion.div
      className="p-6 bg-gray-800 rounded-2xl shadow-lg max-w-sm mx-auto"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="text-2xl font-semibold text-blue-400 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Join a Team
      </motion.h2>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {!success ? (
          <>
            <div>
              <label
                htmlFor="teamId"
                className="block text-sm font-semibold text-gray-400 mb-2"
              >
                Team ID
              </label>
              <input
                id="teamId"
                type="text"
                placeholder="Enter Team ID"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                className="w-full p-4 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400"
              />
            </div>
            <motion.button
              onClick={handleJoinTeam}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-lg font-semibold text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Team
            </motion.button>
          </>
        ) : (
          <motion.button
            className="w-full py-3 bg-green-600 hover:bg-green-500 text-lg font-semibold text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/mcq")} // Navigate to MCQ page after success
          >
            Go to MCQ Page
          </motion.button>
        )}
      </motion.div>

      {error && (
        <motion.div
          className="mt-6 p-4 bg-red-800 text-red-200 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p>{error}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default JoinTeam;
