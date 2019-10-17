import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import CxltToastr from 'cxlt-vue2-toastr';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css';


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

export default new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
