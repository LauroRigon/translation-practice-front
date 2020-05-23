import AuthService from "@/services/AuthService";
import router from "@/router";
import {errorsToString} from "@/utils/error";

const defaultUser = { user: {}, token: '', expires_in: '' };

var initialUser = JSON.parse(window.localStorage.getItem('user-auth')) || defaultUser;

export const state = {
  user: initialUser,
};

export const methods = {
  register(credentials) {
    this.state.loadings.register = true;

    return AuthService.register(credentials)
      .then(response => {
        this.addNotification({ type: 'success', title: 'Feito',  message: 'Cadastrado' });
        this.state.loadings.register = false;

        router.push({ name: 'login' });
      })
      .catch(error => {

        this.addNotification({ type: 'danger', title: error.response.data.message, message: errorsToString(error.response && error.response.data.errors) });
        this.state.loadings.register = false;
      });
  },

  login(credentials) {
    if (this.debug) console.log('login triggered');

    this.state.loadings.login = true;
    return AuthService.login(credentials)
      .then(response => {
        this.state.user = response.data;
        window.localStorage.setItem('user-auth', JSON.stringify(this.state.user));
        this.addNotification({ type: 'success', title: 'Feito',  message: 'Divirta-se' });
        this.state.loadings.login = false;
        router.push({ name: 'translation-list' });
      })
      .catch(error => {
        this.state.loadings.login = false;
        this.addNotification({ type: 'danger', title: 'Errado sai maluco', message: error.response.data.error })
      });
  },

  logout() {
    AuthService.logout()
      .then(response => {
        this.logoutFromClient();
      });
  },

  logoutFromClient() {
    window.localStorage.removeItem('user-auth');
    this.state.user = defaultUser;
    router.push({ name: 'login' });
  }
};