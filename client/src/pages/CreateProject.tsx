import React, { useState } from 'react';
import { createProject } from '../services/apiService'; // Import the createProject function from apiservices

const CreateProject: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [expectedROI, setExpectedROI] = useState<number>(0);
  const [co2Reduction, setCo2Reduction] = useState<number>(0);
  const [renewableEnergy, setRenewableEnergy] = useState<boolean>(false);
  const [wasteManagement, setWasteManagement] = useState<number>(0);
  const [genderDiversityRate, setGenderDiversityRate] = useState<number>(0);
  const [accountability, setAccountability] = useState<boolean>(false);
  const [transparency, setTransparency] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [isManual, setIsManual] = useState<boolean>(true); // State to check if user chooses manual input or PDF upload
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    let projectData: any;

    if (isManual) {
      projectData = {
        title,
        type,
        location,
        expectedROI,
        co2Reduction,
        renewableEnergy,
        wasteManagement,
        genderDiversityRate,
        accountability,
        transparency,
        token,
      };
    } else {
      // If PDF is selected, handle the PDF upload to the backend
      if (!pdfFile) {
        console.error('No PDF file selected');
        return;
      }

      const formData = new FormData();
      formData.append('pdf', pdfFile);
      formData.append('token', token); // Include the token as well if necessary

      try {
        const response = await fetch('http://localhost:5000/upload-pdf', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error uploading PDF:', errorData);
          return;
        }

        const data = await response.json();
        projectData = {
          ...data.projectData, // Extracted data from the backend
        };
      } catch (err) {
        console.error('Error uploading PDF:', err);
        return;
      }
    }

    // Calculate scores
    const envScore = ((co2Reduction / 100) * 800) + (renewableEnergy ? 300 : 0) + ((wasteManagement / 100) * 400);
    const socScore = (genderDiversityRate / 100) * 750 + (wasteManagement / 100);
    const govScore = (accountability ? 1 : 0) + (transparency ? 1 : 0);
    const esg = (0.4 * envScore) + (0.3 * socScore) + (0.3 * govScore);

    // Add scores to the project data
    projectData = { ...projectData, envScore, socScore, govScore, esg };

    try {
      const createResponse = await createProject(projectData, token);
      console.log('Project created successfully:', createResponse);
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateProject}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Project Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Expected ROI"
          value={expectedROI}
          onChange={(e) => setExpectedROI(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="CO2 Reduction"
          value={co2Reduction}
          onChange={(e) => setCo2Reduction(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={renewableEnergy}
          onChange={(e) => setRenewableEnergy(e.target.checked)}
        />
        <input
          type="number"
          placeholder="Waste Management Score"
          value={wasteManagement}
          onChange={(e) => setWasteManagement(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Gender Diversity Rate"
          value={genderDiversityRate}
          onChange={(e) => setGenderDiversityRate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={accountability}
          onChange={(e) => setAccountability(e.target.checked)}
        />
        <input
          type="checkbox"
          checked={transparency}
          onChange={(e) => setTransparency(e.target.checked)}
        />

        {/* Option to choose between manual input or uploading PDF */}
        <div>
          <label>
            <input
              type="radio"
              checked={isManual}
              onChange={() => setIsManual(true)}
            />
            Manual Input
          </label>
          <label>
            <input
              type="radio"
              checked={!isManual}
              onChange={() => setIsManual(false)}
            />
            Upload PDF
          </label>
        </div>

        {/* If PDF is selected, show the upload button */}
        {!isManual && (
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files ? e.target.files[0] : null)}
          />
        )}

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
