import axios from "axios";
import { promise } from "zod";
import { apiRefreshToken } from "./axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_URLADMIN,
});

instance.defaults.withCredentials = true;
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  async function (error) {

    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const res = await apiRefreshToken();
      
      if (res && res.status) {
        localStorage.setItem('accessToken', res.accessToken);
        return window.location.reload();
        // axios.defaults.headers.common['Authorization'] = `Bearer ${res.accessToken}`;
        // originalRequest.headers['Authorization'] = `Bearer ${res.accessToken}`;
        // return axios(originalRequest);
      }
    }

    if (error && error.response && error.response.data)
      return error.response.data;
    return promise.reject(error);
  }
);

export default instance;
