import axios from "axios";
import { promise } from "zod";
import { refreshAuthToken } from "./authApi";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_URLADMIN,
});

instance.defaults.withCredentials = true;
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {

    return response && response.data ? response.data : response;

  },
  
  async function (error) {

    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const res = await refreshAuthToken();
      
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
