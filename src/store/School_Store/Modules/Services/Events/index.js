import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

export default {
  namespace: true,
  state() {
    const storedEvents = localStorage.getItem("Events");
    const events = JSON.parse(storedEvents);
    return {
      events: events,
    };
  },
  mutations,
  actions,
  getters,
};