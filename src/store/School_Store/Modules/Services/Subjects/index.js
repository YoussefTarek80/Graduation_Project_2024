import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

export default {
  namespace: true,
  state() {
    return {
      stages: [],
      subjects: [],
      studs_subject: [],
      levels: [],
      terms: [],
    };
  },
  mutations,
  actions,
  getters,
};