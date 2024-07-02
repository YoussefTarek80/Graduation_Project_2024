import axios from "axios";
import { controllers } from "chart.js";
export const actions = {
    async FetchChatQueries({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/school/showChatpot",
                {
                    headers: { Authorization: `Bearer ${token}`, },
                }
            );
            const queries = response.data.data;
            commit("Set_Queries", queries);
        } catch (error) {
            console.error("Error fetching queries:", error);
        }
    },
    async AnswerQuery({ commit }, { id, answer }) {
        try {
            const token = localStorage.getItem("token");
            console.log(id, answer);
            const answerform = new FormData();
            answerform.append("answer", answer);
            const response = await axios.post(
                `http://127.0.0.1:8000/api/school/addAnswer/${id}`,
                answerform,
                {
                    headers: { Authorization: `Bearer ${token}`, },
                }
            );
            console.log(response.data.message)
        } catch (error) {
            console.error("Error fetching queries:", error);
        }
    },
};
