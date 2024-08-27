import axios from 'axios';

export const axiosClient = axios.create({
  // baseURL: `http://localhost:3001`,
  baseURL: `${'http://localhost:3000'}/client`,

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
