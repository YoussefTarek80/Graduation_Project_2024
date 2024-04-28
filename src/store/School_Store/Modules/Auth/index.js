import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

export default {
  namespace: true,
  state() {
    const storedUser = localStorage.getItem("User");
    const storedReqs = localStorage.getItem("Requests");
    const storedEvents = localStorage.getItem("Events");
    const storedTeachers = localStorage.getItem("Teachers");
    const storedcontrollers = localStorage.getItem("SchoolControllers");
    const user = JSON.parse(storedUser);
    const requests = JSON.parse(storedReqs);
    const events = JSON.parse(storedEvents);
    const teachers = JSON.parse(storedTeachers);
    const controllers = JSON.parse(storedcontrollers);
    return {
      token: null,
      user: user,
      studs: [],
      requests: requests,
      events: events,
      teachers: teachers,
      controllers: controllers,
    };
  },
  mutations,
  actions,
  getters,
};