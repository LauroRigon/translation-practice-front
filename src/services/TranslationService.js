import apiClient from "@/services/apiClient";

export default {
  getTranslations() {
    return apiClient.get(`translation`);
  },

  getTranslation(id) {
    return apiClient.get(`translation/${id}`);
  },
}