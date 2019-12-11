import VisitService from '../service/visit_service';

export default {
  namespaced: true,
  state: {
    visits: [],
  },
  mutations: {
    setVisits(state, payload) {
      const { visits } = payload;
      state.visits = visits;
    },
  },
  actions: {
    loadVisits({ commit }) {
      VisitService.getVisits().then((response) => {
        commit({ type: 'setVisits', visits: response });
      });
    },
  },
};
