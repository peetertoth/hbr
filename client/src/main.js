import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import CxltToastr from 'cxlt-vue2-toastr';
import jQuery from 'jquery';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './assets/common.css';

import App from './App.vue';
import router from './router';
import store from './store';


Vue.use(BootstrapVue);

Vue.use(CxltToastr, {
  position: 'bottom right',
  timeout: 5000,
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
});

Vue.config.productionTip = false;

const vue = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

Vue.toast = vue.$toast;

jQuery.extend(true, jQuery.fn.datetimepicker.defaults, {
  icons: {
    time: 'far fa-clock',
    date: 'far fa-calendar',
    up: 'fas fa-arrow-up',
    down: 'fas fa-arrow-down',
    previous: 'fas fa-chevron-left',
    next: 'fas fa-chevron-right',
    today: 'fas fa-calendar-check',
    clear: 'far fa-trash-alt',
    close: 'far fa-times-circle'
  }
});
