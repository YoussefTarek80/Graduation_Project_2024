import axios from "axios";
import { controllers } from "chart.js";
export const actions = {
    async FetchSCRequests({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/school/ShowEnrollRequests",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const requests = response.data.data;
            commit("Set_SCRequests", requests);
        } catch (error) {
            console.error("Error fetching Requests info:", error);
        }
    },
    async FetchTRequests({ commit }) {
        try {
            const token = localStorage.getItem("token");
            let response = await axios.get(
                "http://127.0.0.1:8000/api/school/ShowTransferRequestsToOld",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            let requests = response.data.data;
            response = await axios.get(
                "http://127.0.0.1:8000/api/school/ShowTransferRequestsToNew",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            requests = requests.concat(response.data.data);
            commit("Set_SCTRequests", requests);
        } catch (error) {
            console.error("Error fetching Requests info:", error);
        }
    },
    async AcceptEnrollStudent({ commit, dispatch }, { id, status }) {
        const token = localStorage.getItem("token");
        try {
            await axios.post(
                `http://127.0.0.1:8000/api/school/SendEnrollRequests/${id}`,
                status,
                {
                    headers: { Authorization: `Bearer ${token}`, },
                });
            console.log(reponse.data.data);
            dispatch('FetchSCRequests');
        } catch (err) {
            throw err;
        }
    },
    async AcceptTransferStudent({ commit, dispatch }, { id, status }) {
        const token = localStorage.getItem("token");
        try {
            await axios.post(
                `http://127.0.0.1:8000/api/school/SendTransferReqToNew/${id}`,
                status,
                {
                    headers: { Authorization: `Bearer ${token}`, },
                });
            // console.log(reponse.data.data);
            dispatch('FetchTRequests');
        } catch (err) {
            throw err;
        }
    },
    async FetchWithdraw({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/school/studentToWithDrawFile",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const requests = response.data.data;
            commit("Set_SCWithdraw", requests);
            console.log(requests);
        } catch (error) {
            console.error("Error fetching Requests info:", error);
        }
    },
    async withdrawStudent({ commit }, id) {
        const token = localStorage.getItem("token");
        try {
            console.log(id);
            await axios.post(
                `http://127.0.0.1:8000/api/school/withDrawFile/${id}`, {},
                {
                    headers: { Authorization: `Bearer ${token}`, },
                });
            // console.log(reponse.data.data);
        } catch (err) {
            console.error("Error fetching withdraw info:", err);
        }
    },
};
