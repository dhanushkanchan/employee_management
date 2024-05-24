import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const getEmployees = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/employees/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const getHierarchy = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/hierarchy/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hierarchy:', error);
    throw error;
  }
};

export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await axios.post(`${BASE_URL}/upload/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading CSV:', error);
    throw error;
  }
};
