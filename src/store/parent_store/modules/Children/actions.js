import axios from "axios";
export const actions = {
    async Parentlogin({ commit, dispatch  }, { email, password }) {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/parent/login",
                { email, password }
            );
            const data = response.data.data;
            console.log(response)
            localStorage.setItem("token", data.token);
            // await dispatch("FetchUser");
        } catch (error) {
            throw error;
        }
    },
    async ParentRegister({ commit }, formData) {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/parent/register",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            // Handle response if needed
        } catch (error) {
            throw error;
        }
    }
    // async logout({ commit }) {
    //     try {
    //         const token = localStorage.getItem("token");
    //         await axios.post(
    //             "http://192.168.1.18:8000/api/logout",
    //             {},
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         localStorage.removeItem("token");
    //         localStorage.removeItem("User");
    //         commit("LOGOUT");
    //     } catch (error) {
    //         console.error("Logout failed:", error);
    //     }
    // },
    // async FetchUser({ commit }) {
    //     try {
    //         const token = localStorage.getItem("token");
    //         const response = await axios.get(
    //             "http://192.168.1.18:8000/api/showProfile",
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         const user = response.data.data;
    //         localStorage.setItem("User", JSON.stringify(user));
    //         commit("Set_User", user);
    //     } catch (error) {
    //         console.error("Error fetching profile info:", error);
    //     }
    // },
};
