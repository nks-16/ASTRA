import React from 'react';
import { Link } from 'react-router-dom';

const UserPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-blue-400 text-center mb-8">Welcome, User</h1>
        <div className="space-y-6 text-center">
          <div>
            <Link
              to="/new-submission"
              className="text-lg font-medium text-blue-500 hover:text-blue-400 transition duration-200"
            >
              New Submission
            </Link>
          </div>
          <div>
            <Link
              to="/previous-submissions"
              className="text-lg font-medium text-blue-500 hover:text-blue-400 transition duration-200"
            >
              Previous Submissions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
