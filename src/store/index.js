import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import translation from './modules/translation';

Vue.use(Vuex);

const persistUserSession = store => {
  const userSession = window.localStorage.getItem('user-session');
  if (userSession) {
    store.commit('auth/setUser', JSON.parse(userSession));
  }

  store.subscribe((mutation) => {
    if (mutation.type === 'auth/setUser') {
      window.localStorage.setItem('user-session', JSON.stringify(mutation.payload));
    }
  })
}

export default new Vuex.Store({
  plugins: [persistUserSession],
  state: {
    notifications: []
  },

  mutations: {
    addNotification(state, { notification }) {
      let randomId = Math.floor(Math.random() * 1000);
      state.notifications.push({ id: randomId, ...notification });
    },
    removeNotification(state, { id }) {
     state.notifications = this.state.notifications.filter(notification => notification.id !== id);
    }
  },

  modules: {
    auth,
    translation,
  }
})