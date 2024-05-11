import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

export default {
  namespace: true,
  state() {
    const storedUser = localStorage.getItem("User");
    const parent = JSON.parse(storedUser);
    return {
      token: null,
      parent: parent,
    };
  },
  mutations,
  actions,
  getters,
};