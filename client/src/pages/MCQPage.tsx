import React, { useState, useEffect } from "react";
import { fetchMCQs, submitMCQAnswers } from "../services/apiService";
import { useNavigate } from "react-router-dom";

const MCQPage: React.FC = () => {
  const [mcqs, setMcqs] = useState<any[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isTeamCreated = localStorage.getItem("teamCreated");

    if (!isTeamCreated) {
      // If team is not created, redirect to create team page
      navigate("/create-team");
    } else {
      // If team is created, load the MCQs
      const loadMCQs = async () => {
        try {
          const response = await fetchMCQs();
          setMcqs(response.data);
        } catch (error) {
          setMessage("Failed to fetch MCQs. Please try again.");
          setMessageType("error");
        }
      };
      loadMCQs();
    }
  }, [navigate]);

  const handleSubmit = async () => {
    try {
      const response = await submitMCQAnswers({ answers });
      const calculatedScore = response.data.score;
      setScore(calculatedScore);

      if (calculatedScore > 7) {
        setMessage(`Congratulations! Your score is ${calculatedScore}. You are eligible to proceed.`);
        setMessageType("success");
        navigate("/submission"); // Navigate to submission page
      } else {
        setMessage(`Your score is ${calculatedScore}. Unfortunately, you need a higher score to proceed.`);
        setMessageType("error");
        navigate("/create-team"); // Navigate to team creation page
      }
    } catch (error) {
      setMessage("Failed to submit answers. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className="p-6 text-center bg-gradient-to-br from-indigo-700 to-cyan-600 rounded-lg shadow-2xl max-w-3xl mx-auto text-white">
      <h2 className="text-4xl font-extrabold mb-6">MCQ Page</h2>
      
      {/* Display message if exists */}
      {message && (
        <div className={`mb-4 p-4 rounded-lg text-white ${messageType === 'success' ? 'bg-green-600' : messageType === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}>
          <p>{message}</p>
        </div>
      )}

      {mcqs.map((mcq, index) => (
        <div key={index} className="mb-6 p-6 bg-white text-gray-800 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
          <p className="text-lg font-semibold mb-4">{mcq.question}</p>
          {mcq.options.map((option: string, optIndex: number) => (
            <label
              key={optIndex}
              className="block text-base mb-3 cursor-pointer hover:text-cyan-600 transition-all duration-200"
            >
              <input
                type="radio"
                name={`mcq-${index}`}
                value={optIndex}
                onChange={() => {
                  const newAnswers = [...answers];
                  newAnswers[index] = optIndex;
                  setAnswers(newAnswers);
                }}
                className="mr-2 accent-indigo-500"
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-8 py-3 px-8 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-500 transition-all duration-200"
      >
        Submit
      </button>
    </div>
  );
};

export default MCQPage;
