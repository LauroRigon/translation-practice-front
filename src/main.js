import Vue from 'vue'
import App from './App.vue'
import Vuelidate from "vuelidate/src";
import "nprogress/nprogress.css";
import './assets/style/index.scss';

import moment from "moment";
import BootstrapVueIcons from "bootstrap-vue/dist/bootstrap-vue-icons.esm";

import "./config/autoImport.js";
import router from "./router"

Vue.use(BootstrapVueIcons);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

Vue.filter('date', function (value) {
  if (!value) return '';
  return moment(value).format('DD/MM/YY');
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
