import AuthService from '../service/auth_service';

export default {
  namespaced: true,
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
          commit({ type: 'setUser', user });
        }
      });
    },
    logoutUser({ commit }) {
      AuthService.logoutUser().then(() => {
        commit({ type: 'setUser', user: undefined });
      });
    },
  },
};
