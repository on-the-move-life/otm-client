import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_MODE === 'production' ? process.env.REACT_APP_BASE_URL : 'http://localhost:882'}/api/v1/nutrition`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // let res = error.response;
    // if (res.status === 401) {
    //   window.location.href = "https://example.com/login";
    // }
    // console.error("Looks like there was a problem. Status Code:");
    return Promise.reject(error);
  },
);
