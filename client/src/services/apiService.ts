// apiservices.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

// Type definitions for the expected request and response data
interface SignupData {
  name: string;
  email: string;
  password: string;
  role: 'investor' | 'proposer';
}

interface LoginData {
  email: string;
  password: string;
}

interface ProjectData {
  title: string;
  type: string;
  location: string;
  expectedROI: number;
  co2Reduction: number;
  renewableEnergy: boolean;
  jobCreation: number;
  transparency: boolean;
  wasteManagement: number;
  genderDiversityRate: number;
  accountability: boolean;
}

interface Project {
  _id: string;
  title: string;
  type: string;
  location: string;
  expectedROI: number;
  co2Reduction: number;
  renewableEnergy: boolean;
  jobCreation: number;
  transparency: boolean;
  wasteManagement: number;
  genderDiversityRate: number;
  accountability: boolean;
  status: string; // 'pending', 'accepted', 'rejected'
  approver: string | null;
}

interface Investor {
  _id: string;
  name: string;
  email: string;
}

// Function to handle user signup
export const signup = async (userData: SignupData): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Error during signup', error);
    throw error;
  }
};

// Function to handle user login
export const login = async (userData: LoginData): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Error during login', error);
    throw error;
  }
};

// Function to create a new project
export const createProject = async (projectData: ProjectData, token: string): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_URL}/projects/create`,
      projectData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating project', error);
    throw error;
  }
};

// Function to get projects of a user
export const getUserProjects = async (token: string): Promise<Project[]> => {
  try {
    const response = await axios.get(`${API_URL}/projects/user-projects`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user projects', error);
    throw error;
  }
};

// Function to get all investors
export const getInvestors = async (): Promise<Investor[]> => {
  try {
    const response = await axios.get(`${API_URL}/investors`);
    return response.data;
  } catch (error) {
    console.error('Error fetching investors', error);
    throw error;
  }
};
