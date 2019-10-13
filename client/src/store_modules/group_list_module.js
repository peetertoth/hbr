import GroupService from '../service/group_service';

export default {
  namespaced: true,
  state: {
    groups: [],
  },
  mutations: {
    setGroups(state, payload) {
      const { groups } = payload;
      state.groups = groups;
    },
  },
  actions: {
    loadGroups({ commit }) {
      GroupService.getGroups().then((response) => {
        commit({ type: 'setGroups', groups: response });
      });
    },
  },
};
