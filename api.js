
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

export const registerUser = async (userData) => {
  try {
    // Check if user already exists
    const existingUser = await api.get(`/users?email=${userData.email}`);
    if (existingUser.data.length > 0) {
      throw new Error('User already exists');
    }

    const response = await api.post('/users', {
      ...userData,
      id: `user-${Date.now()}`, // Generate a simple ID
      createdAt: new Date().toISOString()
    });
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.get(`/users?email=${email}&password=${password}`);
    if (response.data.length > 0) {
      return response.data[0];
    }
    throw new Error('Invalid credentials');
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
