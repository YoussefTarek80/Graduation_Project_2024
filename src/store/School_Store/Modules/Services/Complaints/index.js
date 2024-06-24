import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

export default {
  namespace: true,
  state() {
    const storedUser = localStorage.getItem("User");
    const storedEvents = localStorage.getItem("Events");
    const storedTeachers = localStorage.getItem("Teachers");
    const user = JSON.parse(storedUser);
    const events = JSON.parse(storedEvents);
    const teachers = JSON.parse(storedTeachers);
    return {
      token: null,
      user: user,
      studs: [],
      requests: [],
      trequests: [],
      events: events,
      teachers: teachers,
      controllers: [],
      subjects: [],
    };
  },
  mutations,
  actions,
  getters,
};