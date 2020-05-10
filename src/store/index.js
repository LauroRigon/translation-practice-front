import { state as authState, methods as authMethods } from "@/store/auth";
import { state as translationState, methods as translationMethods } from "@/store/translation";

const store = {
  debug: true,
  state: {
    notifications: [],
    loadings: {
      login: false,
    },
    ...authState,
    ...translationState,
  },
  ...authMethods,
  ...translationMethods,

  addNotification(notification) {
    if (this.debug) console.log('addNotification triggered with', notification);

    let randomId = Math.floor(Math.random() * 1000);
    this.state.notifications.push({ id: randomId, ...notification });
  },

  removeNotification(id) {
    if (this.debug) console.log('clearMessageAction triggered', id);

    this.state.notifications = this.state.notifications.filter(notification => notification.id !== id)
  },
};

export default store;