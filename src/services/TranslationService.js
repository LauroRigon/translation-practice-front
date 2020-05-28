import apiClient from "@/services/apiClient";

export default {
  getTranslations() {
    return apiClient.get(`translation`);
  },

  getTranslation(id) {
    return apiClient.get(`translation/${id}`);
  },

  createTranslation(data) {
    return apiClient.post(`translation`, data);
  },

  updateTranslation(data) {
    return apiClient.patch(`translation/${data['_id']}`, data);
  },

  removeTranslation(id) {
    return apiClient.delete(`translation/${id}`);
  }
}