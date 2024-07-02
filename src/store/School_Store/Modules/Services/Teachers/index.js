import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

export default {
  namespace: true,
  state() {
    const storedTeachers = localStorage.getItem("Teachers");
    const teachers = JSON.parse(storedTeachers);
    return {
      teachers: teachers,
    };
  },
  mutations,
  actions,
  getters,
};