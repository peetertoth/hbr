import Vue from 'vue';
import Vuex from 'vuex';

import CommonModule from './store_modules/common_module';
import UserModule from './store_modules/user_module';
import GroupListModule from './store_modules/group_list_module';
import GroupDetailsModule from './store_modules/group_details_module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common: CommonModule,
    user: UserModule,
    group: GroupListModule,
    groupDetails: GroupDetailsModule,
  },
});
