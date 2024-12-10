import axios from 'axios';

const API = axios.create({
  baseURL: 'https://nisb-hackathon.onrender.com/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (credentials: { email: string; password: string }) =>
  API.post('/auth/login', credentials);

export const signup = (data: { name: string; email: string; password: string }) =>
  API.post('/auth/signup', data);

export const createTeam = (teamName: string) =>
  API.post('/teams', { teamName });

export const joinTeam = (teamId: string) =>
  API.post(`/teams/join/${teamId}`);

export const fetchMCQs = () => API.get('/mcqs');

export const submitMCQAnswers = (answers: any) => API.post('/mcqs/submit', answers);

export const submitSolution = (data: { submissionLink: string }) =>
  API.post('/submits', data);

