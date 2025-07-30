import axios from 'axios';
import { API_BASE_URL } from '../config.js'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default axiosInstance;