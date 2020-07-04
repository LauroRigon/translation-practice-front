import AuthService from "@/services/AuthService";
import router from "@/router";
import {errorToString} from "@/utils/error";

const defaultUser = { user: {}, token: '', expires_in: '' };

export default {
  namespaced: true,
  state: {
    user: defaultUser,
  },

  mutations: {
    setUser(state, userData) {
      state.user = userData;
    }
  },

  actions: {
    register({ commit }, credentials) {
      return AuthService.register(credentials)
        .then(response => {
          commit('addNotification', {notification: { type: 'success', title: 'Done',  message: 'All set!' }}, { root: true });
          commit('setUser', response.data);
          router.push({ name: 'translation-list' });
        })
        .catch(error => {
          commit('addNotification', {notification: { type: 'danger', title: error.response.data.message, message: errorToString(error.response && error.response.data) }}, { root: true })
        });
    },

    login({ commit }, credentials) {
      return AuthService.login(credentials)
        .then(response => {
          commit('setUser', response.data);
          router.push({ name: 'translation-list' });
        })
        .catch(error => {
          commit('addNotification', {notification: { type: 'danger', title: error.response.data.message, message: errorToString(error.response && error.response.data) }}, { root: true })
        });
    },

    logoutFromClient({ commit }) {
      commit('setUser', {});
      router.push({ name: 'login' });
    }
  },

  getters: {
    user(state) {
      return state.user;
    }
  }
}