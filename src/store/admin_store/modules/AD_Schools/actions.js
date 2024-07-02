import axios from "axios";
export const actions = {
    async addNewSchool({ commit }, { name, phone, address, manager_name, manager_address, manager_phone, manager_email }) {
        commit("SET_ADD_SCHOOL_STATUS", "loading");
        try {
            const token = localStorage.getItem("token");
            const data = { name, phone, address, manager_name, manager_address, manager_phone, manager_email };
            await axios.post("http://127.0.0.1:8000/api/addSchool", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            commit("SET_ADD_SCHOOL_STATUS", "success");
            console.log("Added Done");
        } catch (err) {
            commit("SET_ADD_SCHOOL_STATUS", "error");
            console.error(err);
            throw err
        }
    },
    async fetchSchools({ commit }) {
        commit("SET_FETCH_SCHOOLS_STATUS", "loading");
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/showSchool",
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
                `http://127.0.0.1:8000/api/deleteSchool/${id}`,
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
    async updateSchool({ commit }, { id, name, phone, address, file, manager_name, manager_address, manager_phone, manager_email }) {
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("name", name);
            formData.append("phone", phone);
            formData.append("address", address);
            formData.append("image", file);
            formData.append("manager_name", manager_name);
            formData.append("manager_address", manager_address);
            formData.append("manager_phone", manager_phone);
            formData.append("manager_email", manager_email);
            await axios.post(
                `http://127.0.0.1:8000/api/updateSchool/${id}`,
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
