export default {
  namespaced: true,
  state: {
    rawData: '',
    parsedData: [],
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
  },
  actions: {
    loadRawData({ commit }, { rawData }) {
      commit({ type: 'setRawData', rawData });
    },
    loadParsedData({ commit }, { parsedData }) {
      commit({ type: 'setParsedData', parsedData });
    },
  },
};
