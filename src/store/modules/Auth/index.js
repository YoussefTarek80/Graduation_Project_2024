import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

export default {
  namespace: true,
  state() {
    const storedUser = localStorage.getItem("User");
    const user = JSON.parse(storedUser);
    return {
      token: null,
      user: user,
    };
  },
  mutations,
  actions,
  getters,
};