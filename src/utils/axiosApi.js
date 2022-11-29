import { BASE_URL } from './config';
import axios from 'axios';
const axiosApi = axios.create({
  baseURL: BASE_URL
});

export default axiosApi;
