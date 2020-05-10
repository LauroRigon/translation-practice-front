import Vue from "vue"
import VueRouter from "vue-router"
import NProgress from "nprogress"
import routes from "./routes"
import store from "../store"

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  if (!routeTo.meta.public) {
    if (store.state.user.token) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;