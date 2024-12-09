import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTeamPage: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Show the message about not qualifying for the next round
    setMessage("Unfortunately, you have not qualified for the next round.");
    setMessageType("error");

    // Navigate back to the home page after 2 seconds
    setTimeout(() => {
      navigate("/"); // Redirect to the home page
    }, 2000);
  }, [navigate]);

  return (
    <div className="p-6 text-center bg-gradient-to-br from-indigo-700 to-cyan-600 rounded-lg shadow-2xl max-w-3xl mx-auto text-white">
      <h2 className="text-4xl font-extrabold mb-6">Team Creation Page</h2>

      {/* Display message if exists */}
      {message && (
        <div className={`mb-4 p-4 rounded-lg text-white ${messageType === 'success' ? 'bg-green-600' : messageType === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}>
          <p>{message}</p>
        </div>
      )}

      <p className="text-lg mt-4">You will be redirected to the home page shortly.</p>
    </div>
  );
};

export default CreateTeamPage;
