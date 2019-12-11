import VisitService from '../service/visit_service';

export default {
  namespaced: true,
  state: {
    visit: undefined,
  },
  mutations: {
    setVisit(state, payload) {
      const { visit } = payload;
      state.visit = visit;
    },
  },
  actions: {
    loadVisit({ commit }, { id }) {
      return new Promise((resolve) => {
        VisitService.getVisitById(id).then((response) => {
          commit({ type: 'setVisit', visit: response });
          resolve();
        });
      });
    },
  },
};
