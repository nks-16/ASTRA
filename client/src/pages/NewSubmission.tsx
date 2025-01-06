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
    <div>
      <h1>New Submission</h1>
      <form>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <br />
        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
        />
        <br />
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
        <br />
        <label>Expected ROI:</label>
        <input
          type="number"
          name="expectedROI"
          value={formData.expectedROI}
          onChange={handleInputChange}
        />
        <br />
        {/* Form Fields for CO2 reduction, etc. */}
        <label>Upload Report:</label>
        <input type="checkbox" onChange={() => setUploadReport(!uploadReport)} />
        {uploadReport ? (
          <div>
            <input type="file" />
          </div>
        ) : (
          <div>
            {/* Manual Form Fields */}
            <label>CO2 Reduction:</label>
            <input
              type="number"
              name="co2Reduction"
              value={formData.co2Reduction}
              onChange={handleInputChange}
            />
            {/* Add other manual fields here */}
          </div>
        )}
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default NewSubmission;
