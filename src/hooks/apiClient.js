import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://vouch-digital-backend.onrender.com",
});

apiClient.interceptors.request.use(
  function (config) {
    if (!config.headers.authorization) {
      config.headers.authorization = `Bearer ${localStorage.getItem(
        "token"
      )}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
export default apiClient;
