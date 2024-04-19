import axios from "axios";
export const actions = {
    async loginSC({ commit, dispatch }, { email, password }) {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/school/login",
                { email, password }
            );
            const data = response.data.data;
            localStorage.setItem("token", data.token);
            await dispatch("FetchUser2");
        } catch (error) {
            throw error;
        }
    },
    async logoutSC({ commit }) {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://127.0.0.1:8000/api/school/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            localStorage.removeItem("token");
            localStorage.removeItem("User");
            commit("LOGOUT2");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    },
    async FetchUser2({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/school/showProfile",
                {
                    headers: { Authorization: `Bearer ${token}`, },
                }
            );
            const user = response.data.data;
            localStorage.setItem("User", JSON.stringify(user));
            commit("Set_User2", user);
        } catch (error) {
            console.error("Error fetching profile info:", error);
        }
    },
};
// إ