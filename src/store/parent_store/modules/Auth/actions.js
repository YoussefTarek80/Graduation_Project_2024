import axios from "axios";
export const actions = {
    async ParentLogin({ commit, dispatch  }, { email, password }) {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/parent/login",
                { email, password }
            );
            const data = response.data.data;
            console.log(response)
            sessionStorage.setItem("token", data.token);
            // await dispatch("FetchUser");
        } catch (error) {
            throw error;
        }
    },
    async ParentRegister({ commit }, formData) {
        try {
            const token =sessionStorage.getItem("token")
            const response = await axios.post(
                "http://127.0.0.1:8000/api/parent/register",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',

                    }
                }
            );
            // Handle response if needed
        } catch (error) {
            throw error;
        }
    },
    async ParentLogout({ commit }) {
        try {
            const token = sessionStorage.getItem("token");
            await axios.post(
                "http://127.0.0.1:8000/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("User");
            commit("LOGOUT");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    },
    async FetchParent({ commit }) {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/parent/showProfile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const parent = response.data.data;
            sessionStorage.setItem("User", JSON.stringify(parent));
            commit("Set_Parent", parent);
        } catch (error) {
            console.error("Error fetching profile info:", error);
        }
    },
};
