import TranslationService from "@/services/TranslationService";
import router from "@/router";
import {errorToString} from "@/utils/error";

export default {
  namespaced: true,
  state: {
    translations: [],
  },

  mutations: {
    setTranslations(state, translations) {
      state.translations = translations;
    }
  },

  actions: {
    fetchTranslations({ commit }) {
      return TranslationService.getTranslations()
        .then(response => {
          commit('setTranslations', response.data);
        })
        .catch(error => {
          commit('addNotification', { notification: { type: 'danger', title: 'Opss', message: 'Ocorreu um erro ao tentar recuperar Translations' }}, { root: true })
        });
    },

    fetchTranslation(context, id) {
      return TranslationService.getTranslation(id);
    },

    createTranslation({ commit }, translation) {
      return TranslationService.createTranslation(translation)
        .then(response => {
          commit('addNotification', { notification: { type: 'success', title: 'Opa', message: 'Tudo certo' }}, { root: true })
          router.push({ name: 'translation-list'});
        })
        .catch(error => {
          commit('addNotification', { notification: { type: 'danger', title: 'Opa', message: error.response && error.response.data.message }}, { root: true })
        });
    },

    updateTranslation({ commit }, { id, translation }) {
      return new Promise((resolve, reject) => {
        TranslationService.updateTranslation(id, translation)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            commit('addNotification', { notification: { type: 'danger', title: 'Opa', message: errorToString(error.response && error.response.data) }}, { root: true })
            reject(error)
          })
      })
    },

    patchTranslation({ commit }, { id, translation }) {
      return TranslationService.patchTranslation(id, translation)
        .catch(error => {
          commit('addNotification', { notification: { type: 'danger', title: 'Opa', message: errorToString(error.response && error.response.data) }}, { root: true })
        })
    },

    removeTranslation({ commit, dispatch }, id) {
      return TranslationService.removeTranslation(id)
        .then(response => {
          router.push({ name: 'translation-list' });
        })
        .catch(error => {
          commit('addNotification', { notification: { type: 'danger', title: 'Opa', message: errorToString(error.response && error.response.data) }}, { root: true });
        })
    }
  },

  getters: {
    translations (state) {
      return state.translations;
    }
  }
}