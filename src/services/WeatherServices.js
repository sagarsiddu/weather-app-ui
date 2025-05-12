// src/services/weatherService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/weather';

export const fetchWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${city}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};
