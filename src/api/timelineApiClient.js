import axios from 'axios';

export const timelineAxiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1/timeline`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

timelineAxiosClient.interceptors.response.use(
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
