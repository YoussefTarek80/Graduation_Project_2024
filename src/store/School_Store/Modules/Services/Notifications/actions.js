import axios from "axios";
import { controllers } from "chart.js";
export const actions = {
    async FetchScNotifications({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/school/notification",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const Notifications = response.data.data;
            commit("Set_SCNotifications", Notifications);
        } catch (error) {
            console.error("Error fetching Notifications:", error);
        }
    },
    async mark_as_read({ commit, dispatch }, id) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `http://127.0.0.1:8000/api/school/markAsRead/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // dispatch("FetchScNotifications");
        } catch (error) {
            console.error("Error mark_as_read:", error);
        }
    },
};