export const mutations = {
    Set_User(state, user) {
        state.user = user;
    },
    LOGOUT(state) {
        state.user = null;
    }
};
