import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

export default {
  namespace: true,
  state() {
    return {
      studs: [],
      subjects: [],
      stages: [],
      levels: [],
      terms: [],
    };
  },
  mutations,
  actions,
  getters,
};