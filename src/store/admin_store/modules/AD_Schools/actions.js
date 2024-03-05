import axios from "axios";
export const actions = {
    async addNewSchool({ commit }, { name, phone, address }) {
        commit("SET_ADD_SCHOOL_STATUS", "loading");
        try {
            const token = localStorage.getItem("token");
            const data = { name, phone, address };
            await axios.post("http://192.168.1.18:8000/api/addSchool", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            commit("SET_ADD_SCHOOL_STATUS", "success");
            console.log("Added Done");
        } catch (err) {
            commit("SET_ADD_SCHOOL_STATUS", "error");
            console.error(err);
        }
    },
    async fetchSchools({ commit }) {
        commit("SET_FETCH_SCHOOLS_STATUS", "loading");
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://192.168.1.18:8000/api/showSchool",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            commit("SET_SCHOOLS", response.data.data);
            commit("SET_FETCH_SCHOOLS_STATUS", "success");
        } catch (error) {
            commit("SET_FETCH_SCHOOLS_STATUS", "error");
            console.error("Error fetching schools:", error);
        }
    },
    async RemoveSchool({ commit }, id) {
        try {
            const token = localStorage.getItem("token");
            console.log(id);
            await axios.post(
                `http://192.168.1.18:8000/api/deleteSchool/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (err) {
            console.log(err);
        }
    },
    async updateSchool({ commit }, { id, name, phone, address, file }) {
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("name", name);
            formData.append("phone", phone);
            formData.append("address", address);
            formData.append("image", file);
            await axios.post(
                `http://192.168.1.18:8000/api/updateSchool/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Update Done");
        } catch (err) {
            console.error(err);
            throw err; 
        }
    },
};
