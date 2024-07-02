import axios from "axios";
import { controllers } from "chart.js";
export const actions = {
    async loginSC({ commit, dispatch }, { email, password, role }) {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/school/login",
                { email, password, role }
            );
            const data = response.data.data;
            console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("staff_role", data.staff_role);
            localStorage.setItem('stageID', '');
            localStorage.setItem('levelID', '');
            localStorage.setItem('termID', '');
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
            localStorage.removeItem('token');
            localStorage.removeItem('User');
            localStorage.removeItem('stageID');
            localStorage.removeItem('levelID');
            localStorage.removeItem('termID');
            commit("LOGOUT2");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    },
    async FetchUser2({ commit }, role) {
        try {
            const token = localStorage.getItem("token");
            if (role === 'manager') {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/school/manager/showProfile",
                    {
                        headers: { Authorization: `Bearer ${token}`, },
                    }
                );
                const user = response.data.data;
                localStorage.setItem("User", JSON.stringify(user));
                commit("Set_User2", user);
            }
            else if (role === 'staff') {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/school/staff/showProfile",
                    {
                        headers: { Authorization: `Bearer ${token}`, },
                    }
                );
                const user = response.data.data;
                localStorage.setItem("User", JSON.stringify(user));
                commit("Set_User2", user);
            }
        } catch (error) {
            console.error("Error fetching profile info:", error);
        }
    },
};
