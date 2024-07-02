import axios from "axios";
export const actions = {
    async SetReport({ commit }, eventData) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://127.0.0.1:8000/api/addReport",
                eventData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Added Successfully");
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async FetchReports({commit}){
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/showReport",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            commit('SET_REPORTS',response.data.data);
            console.log(response.data.data);
        } catch (err) {
            console.log(err);
            throw err; // Propagate the error to the caller if needed
        }
    },
    async DeleteReport({ commit, dispatch }, id) {
        try {
            const token = localStorage.getItem("token");
            await axios.get(
                `http://127.0.0.1:8000/api/deleteReport/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            await dispatch('FetchReports');
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};
