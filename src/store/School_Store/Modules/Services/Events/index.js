import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

export default {
  namespace: true,
  state() {
    return {
      SC_Events: [],
      AD_Events: [],
    };
  },
  mutations,
  actions,
  getters,
};