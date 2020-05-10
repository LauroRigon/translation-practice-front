import apiClient from "@/services/apiClient";

export default {
  register(credentials) {
    return apiClient.post(`auth/register`, credentials);
  },

  login(credentials) {
    return apiClient.post(`auth/login`, credentials);
  },

  logout() {
    return apiClient.post(`auth/logout`);
  },
}