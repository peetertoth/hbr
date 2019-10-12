import Vue from 'vue';
import Vuex from 'vuex';

import AuthService from './service/AuthService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: undefined,
  },
  mutations: {
    setUser(state, payload) {
      const { user } = payload;
      state.user = user;
    },
  },
  actions: {
    getCurrentUser({ commit }) {
      AuthService.getUser().then((user) => {
        if (user) {
          console.log(`Received user data { name: ${user.name}, email: ${user.email} }`);

          commit({ type: 'setUser', user });
        }
      });
    },
    logoutUser({ commit }) {
      AuthService.logoutUser().then(() => {
        console.log('User logged out');

        commit({ type: 'setUser', user: undefined });
      });
    },
  },
});
