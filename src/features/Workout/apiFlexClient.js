import axios from 'axios';

export const axiosflexClient = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1/workout/flex`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosflexClient.interceptors.response.use(
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
