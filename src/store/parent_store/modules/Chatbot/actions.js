import axios from "axios";

export const actions = {
    async FetchNotifications({commit}) {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/notification",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data.data)
            commit('setNotify',response.data.data)
        } catch (error) {
            throw error;
        }
    },
    async ReadNotificaton({commit},id){
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get(
                `http://127.0.0.1:8000/api/markAsRead/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data.data)
        } catch (error) {
            throw error;
        }
    }
};
