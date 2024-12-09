import React from "react";
import CreateTeam from "./CreateTeam";
import JoinTeam from "./JoinTeam";
import { motion } from "framer-motion";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-4">
      <motion.div
        className="w-full max-w-5xl p-8 bg-gray-900 rounded-3xl shadow-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <motion.h1
          className="text-4xl font-bold text-center mb-12 text-blue-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Team Dashboard
        </motion.h1>

        {/* Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Create Team Section */}
          <motion.div
            className="p-6 bg-gray-800 rounded-2xl shadow-lg flex flex-col justify-between"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">
              Create a Team
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Start your journey by creating a team. Set your team name, share
              your team ID with members, and collaborate effectively!
            </p>
            <CreateTeam />
          </motion.div>

          {/* Join Team Section */}
          <motion.div
            className="p-6 bg-gray-800 rounded-2xl shadow-lg flex flex-col justify-between"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">
              Join a Team
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Already have a team ID? Join an existing team and get started
              right away with your teammates.
            </p>
            <JoinTeam />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
