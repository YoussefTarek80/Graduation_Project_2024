export const mutations = {
    Set_User2(state, user) {
        state.user = user;
    },
    LOGOUT2(state) {
        state.user = null;
    }
};
