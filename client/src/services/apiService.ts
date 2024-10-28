import axios from 'axios';

export const fetchSampleData = () => {
  return axios.get<{ id: number; name: string }[]>('http://localhost:5010/api/sample');
};
