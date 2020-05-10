import Vue from 'vue'
import App from './App.vue'
import Vuelidate from "vuelidate/src";
import "nprogress/nprogress.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import router from "./router"

Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
