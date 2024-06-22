import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

export default {
  namespace: true,
  state() {
    return {
      stages: [],
      level: [],
      terms:[],
      subjects:[]
    };
  },
  mutations,
  actions,
  getters,
};