import GroupService from '../service/group_service';

export default {
  namespaced: true,
  state: {
    group: undefined,
  },
  mutations: {
    setGroup(state, payload) {
      const { group } = payload;
      state.group = group;
    },
  },
  actions: {
    loadGroup({ commit }, { id }) {
      return new Promise((resolve) => {
        GroupService.getGroupById(id).then((response) => {
          commit({ type: 'setGroup', group: response });
          resolve();
        });
      });
    },
  },
};
