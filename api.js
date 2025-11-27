
import axios from 'axios';


const API_URL = 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const saveQuizResult = async (result) => {
  try {
    const response = await api.post('/results', result);
    return response.data;
  } catch (error) {
    console.error("Failed to save result to json-server:", error);

    return null; 
  }
};

export const fetchUserHistory = async (userId) => {
  try {
    const response = await api.get(`/results?userId=${userId}&_sort=timestamp&_order=desc`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch history from json-server:", error);
    return [];
  }
};
