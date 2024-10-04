import axios from 'axios';

export const profileAxiosClient = axios.create({
  // baseURL: `http://localhost:3001`,
  baseURL: `${process.env.REACT_APP_INSIGHT_SERVICE_BASE_URL}/client`,

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

profileAxiosClient.interceptors.response.use(
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
