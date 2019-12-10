export default {
  namespaced: true,
  state: {
    rawData: '',
    parsedData: [],
    group: null
  },
  mutations: {
    setRawData(state, payload) {
      const { rawData } = payload;
      state.rawData = rawData;
    },
    setParsedData(state, payload) {
      const { parsedData } = payload;
      state.parsedData = parsedData;
    },
    setGroup(state, payload) {
      const { group } = payload;
      state.group = group;
    },
  },
  actions: {
    loadRawData({ commit }, { rawData }) {
      commit({ type: 'setRawData', rawData });
    },
    loadParsedData({ commit }, { parsedData }) {
      commit({ type: 'setParsedData', parsedData });
    },
    loadGroup({ commit }, { group }) {
      commit({ type: 'setGroup', group });
    },
  },
};
