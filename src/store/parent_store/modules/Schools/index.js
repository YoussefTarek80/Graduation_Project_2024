import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

export default {
  namespace: true,
  state() {
    return {
      Adminstrations:[],
      Schools:[],
      BestSchools:[]
    };
  },
  mutations,
  actions,
  getters,
};