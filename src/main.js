import Vue from 'vue'
import App from './App.vue'
import Vuelidate from "vuelidate/src";
import "nprogress/nprogress.css";
import './assets/style/index.scss';
import store from '@/store'
import moment from "moment";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faEdit, faTrash, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faPlus);
library.add(faEdit);
library.add(faTrash);
library.add(faPowerOff);

Vue.component('font-awesome-icon', FontAwesomeIcon);

import "./config/autoImport.js";
import router from "./router"

Vue.use(Vuelidate);
Vue.config.productionTip = false;

Vue.filter('date', function (value) {
  if (!value) return '';
  return moment(value).format('DD/MM/YY');
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
