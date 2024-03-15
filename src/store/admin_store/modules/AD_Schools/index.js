import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

export default {
  namespace: true,
  state() {
    return {
      schools: [],
      addSchoolStatus: 'idle',
      fetchSchoolsStatus: 'idle',
    };
  },
  mutations,
  actions,
  getters,
};