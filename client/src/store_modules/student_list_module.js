import StudentService from '../service/student_service';

export default {
  namespaced: true,
  state: {
    students: [],
  },
  mutations: {
    setStudents(state, payload) {
      const { students } = payload;
      state.students = students;
    },
  },
  actions: {
    loadStudents({ commit }) {
      StudentService.getStudents().then((response) => {
        commit({ type: 'setStudents', students: response });
      });
    },
  },
};
