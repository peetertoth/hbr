export default {
  namespaced: true,
  state: {
    loading: false,
  },
  mutations: {
    setLoading(state, payload) {
      const { loading } = payload;
      state.loading = loading;
    },
  },
  actions: {
    startLoading({ commit }) {
      commit({ type: 'setLoading', loading: true });
    },
    stopLoading({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit({ type: 'setLoading', loading: false });
          resolve();
        }, 800);
      });
    },
  },
};
