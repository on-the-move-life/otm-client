import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://otm-main-production.up.railway.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
