import StudentService from '../service/student_service';

export default {
  namespaced: true,
  state: {
    student: undefined,
  },
  mutations: {
    setStudent(state, payload) {
      const { student } = payload;
      state.student = student;
    },
  },
  actions: {
    loadStudent({ commit }, { id }) {
      return new Promise((resolve) => {
        StudentService.getStudentById(id).then((response) => {
          commit({ type: 'setStudent', student: response });
          resolve();
        });
      });
    },
  },
};
