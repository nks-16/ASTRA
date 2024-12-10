import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitSolution } from '../services/apiService'; // Import API service
import axios from 'axios';

const SubmissionPage: React.FC = () => {
  const [submissionLink, setSubmissionLink] = useState('');
  const [problemList, setProblemList] = useState<{ id: string; title: string }[]>([]);
  const [selectedProblem, setSelectedProblem] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isEligible, setIsEligible] = useState(false); // Eligibility state
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Check eligibility and fetch problems
  useEffect(() => {
    const checkEligibilityAndFetchProblems = async () => {
      try {
        // Check if user is eligible for submission
        const { data: eligibilityData } = await axios.get(
          'https://nisb-hackathon.onrender.com/api/teams/check-eligibility'
        );
        if (!eligibilityData.isEligible) {
          setIsEligible(false);
          navigate('/not-eligible'); // Redirect if ineligible
          return;
        }
        setIsEligible(true);

        // Fetch problem list
        const { data: problems } = await axios.get(
          'https://nisb-hackathon.onrender.com/api/problems'
        );
        setProblemList(problems);
      } catch (err) {
        console.error('Error fetching eligibility or problems:', err);
        navigate('/error'); // Redirect to an error page
      } finally {
        setLoading(false);
      }
    };
    checkEligibilityAndFetchProblems();
  }, [navigate]);

  const validateLink = (link: string) => {
    const githubRegex = /^https:\/\/(www\.)?github\.com\/.+/i;
    const websiteRegex = /^https:\/\/.+\..+/i;
    return githubRegex.test(link) || websiteRegex.test(link);
  };

  const handleSubmit = async () => {
    if (!submissionLink || !selectedProblem) {
      setError('Both problem selection and submission link are required.');
      return;
    }

    if (!validateLink(submissionLink)) {
      setError('Invalid link. Only GitHub or personal website links are allowed.');
      return;
    }

    setError('');
    setSuccessMessage('');
    try {
      await submitSolution({ submissionLink });
      setSuccessMessage('Submission successful! Thank you.');
      setSubmissionLink('');
      setSelectedProblem('');

      // Redirect to home page after a delay
      setTimeout(() => {
        navigate('/'); // Update to your desired home route
      }, 2000);
    } catch (err) {
      console.error('Submission failed:', err);
      setError('Submission failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isEligible) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>You are not eligible to make a submission.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-800 w-full max-w-lg">
        <h2 className="text-4xl font-bold mb-6 text-center">Submission Page</h2>

        {/* Dropdown for Problem Selection */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="problem">
            Select Problem
          </label>
          <select
            id="problem"
            value={selectedProblem}
            onChange={(e) => setSelectedProblem(e.target.value)}
            className="w-full p-3 bg-black text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              -- Select a Problem --
            </option>
            {problemList.map((problem) => (
              <option key={problem.id} value={problem.id}>
                {problem.title}
              </option>
            ))}
          </select>
        </div>

        {/* Submission Link Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="submissionLink">
            Submission Link
          </label>
          <input
            id="submissionLink"
            type="text"
            placeholder="Enter your GitHub or website link"
            value={submissionLink}
            onChange={(e) => setSubmissionLink(e.target.value)}
            className="w-full p-3 bg-black text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Success Message */}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

        {/* Submit Button */}
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
