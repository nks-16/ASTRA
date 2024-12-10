import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router

const SubmissionPage: React.FC = () => {
  const [submissionLink, setSubmissionLink] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async () => {
    if (!submissionLink) {
      setError('Submission link is required.');
      return;
    }

    setError('');
    setSuccessMessage('');
    try {
      // Replace `submitSolution` with your actual API call logic
      await new Promise((resolve) => setTimeout(resolve, 200)); // Simulating API call
      setSuccessMessage('Submission successful! Thank you.');
      setSubmissionLink(''); // Clear the input field

      // Redirect to home page after a delay
      setTimeout(() => {
        navigate('/'); // Replace '/' with your home page route
      }, 2000);
    } catch (error) {
      setError('Submission failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-800 w-full max-w-lg">
        <h2 className="text-4xl font-bold mb-6 text-center">Submission Page</h2>
        <input
          type="text"
          placeholder="Enter your submission link"
          value={submissionLink}
          onChange={(e) => setSubmissionLink(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-black text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4">{successMessage}</p>
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SubmissionPage;
