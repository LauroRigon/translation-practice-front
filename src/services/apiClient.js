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
  if (store.state.user.token) {
    config.headers['Authorization'] = 'Bearer ' + store.state.user.token;
  }

  return config;
});

apiClient.interceptors.response.use(response => response, error => {
  if (error.response.status === 401 && store.state.user.token) {
    store.logoutFromClient();
  }

  return Promise.reject(error);
});

export default apiClient;