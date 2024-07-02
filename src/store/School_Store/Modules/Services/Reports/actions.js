import axios from "axios";
export const actions = {
    async FetchSCReports({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/school/showReport",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const reports = response.data.data;
            console.log(reports);
            commit("Set_SCReports", reports);
        } catch (error) {
            console.error("Error fetching Reports :", error);
        }
    },
};