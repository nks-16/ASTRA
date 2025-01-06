import React, { useState } from 'react';
import axios from 'axios';

const NewSubmission = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    expectedROI: '',
    co2Reduction: '',
    renewableEnergy: false,
    jobCreation: '',
    transparency: false,
    wasteManagement: '',
    genderDiversityRate: '',
    accountability: false,
  });

  const [uploadReport, setUploadReport] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/projects/create', formData);
      console.log('Project submitted', response.data);
    } catch (error) {
      console.error('Error submitting project', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-blue-400 text-center mb-8">New Project Submission</h1>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-600 rounded-md w-full bg-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Type:</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-600 rounded-md w-full bg-gray-700 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400">Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-600 rounded-md w-full bg-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Expected ROI:</label>
              <input
                type="number"
                name="expectedROI"
                value={formData.expectedROI}
                onChange={handleInputChange}
                className="mt-2 p-3 border border-gray-600 rounded-md w-full bg-gray-700 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">Upload Report:</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={uploadReport}
                onChange={() => setUploadReport(!uploadReport)}
                className="mt-1 mr-3"
              />
              <span className="text-sm text-gray-400">Check to upload a report PDF</span>
            </div>
          </div>

          {uploadReport ? (
            <div className="mt-4">
              <input
                type="file"
                className="p-3 border border-gray-600 rounded-md w-full bg-gray-700 text-white"
              />
            </div>
          ) : (
            <div className="space-y-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">CO2 Reduction:</label>
                <input
                  type="number"
                  name="co2Reduction"
                  value={formData.co2Reduction}
                  onChange={handleInputChange}
                  className="mt-2 p-3 border border-gray-600 rounded-md w-full bg-gray-700 text-white placeholder-gray-400"
                />
              </div>
              {/* Add more fields as necessary */}
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Submit Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSubmission;
