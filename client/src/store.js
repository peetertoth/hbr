import Vue from 'vue';
import Vuex from 'vuex';

import CommonModule from './store_modules/common_module';
import UserModule from './store_modules/user_module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common: CommonModule,
    user: UserModule,
  },
});
