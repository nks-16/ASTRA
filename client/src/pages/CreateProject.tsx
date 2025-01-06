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
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-400 mb-6">New Project Submission</h1>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 p-3 bg-gray-700 text-white rounded-md w-full border border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Type:</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="mt-1 p-3 bg-gray-700 text-white rounded-md w-full border border-gray-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="mt-1 p-3 bg-gray-700 text-white rounded-md w-full border border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Expected ROI:</label>
              <input
                type="number"
                name="expectedROI"
                value={formData.expectedROI}
                onChange={handleInputChange}
                className="mt-1 p-3 bg-gray-700 text-white rounded-md w-full border border-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Upload Report:</label>
            <input
              type="checkbox"
              checked={uploadReport}
              onChange={() => setUploadReport(!uploadReport)}
              className="mt-1 mr-2"
            />
            <span className="text-sm text-gray-400">Check to upload a report PDF</span>
          </div>

          {uploadReport && (
            <div className="mt-4">
              <input type="file" className="p-3 bg-gray-700 text-white rounded-md w-full border border-gray-600" />
            </div>
          )}

          {!uploadReport && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">CO2 Reduction:</label>
                <input
                  type="number"
                  name="co2Reduction"
                  value={formData.co2Reduction}
                  onChange={handleInputChange}
                  className="mt-1 p-3 bg-gray-700 text-white rounded-md w-full border border-gray-600"
                />
              </div>
              {/* Add more fields here */}
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition-all"
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
