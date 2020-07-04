import axios from "axios";
import store from "@/store";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 2200,
  withCredentials: false,
  headers: {
    "Accept": "application/json; charset=utf-8",
    "Content-Type": "application/json; charset=utf-8"
  }
});

apiClient.interceptors.request.use(config => {
  const user = store.getters["auth/user"];
  if (user.token) {
    config.headers['Authorization'] = 'Bearer ' + user.token;
  }

  return config;
});

apiClient.interceptors.response.use(response => response, error => {
  if (error.response.status === 401 && user.token) {
    store.dispatch('auth/logoutFromClient');
  }

  return Promise.reject(error);
});

export default apiClient;