import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

export default {
  namespace: true,
  state() {
    return {
      students: [],
      std:[],
      info:[],
      stages:[],
      levels:[],
      score:[]
    };
  },
  mutations,
  actions,
  getters,
};