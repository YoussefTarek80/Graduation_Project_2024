import axios from "axios";
import { controllers } from "chart.js";
export const actions = {
    async FetchControllers({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/school/showStaff",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const Controllers = response.data.data;
            console.log(Controllers);
            commit("Set_Controllers", Controllers);
        } catch (error) {
            console.error("Error fetching Controllers :", error);
        }
    },
    async AddController({ commit, dispatch }, { name, email, address, phone, birthdate, role }) {
        try {
            const token = localStorage.getItem("token");
            const data = new FormData();
            data.append('staff_name', name);
            data.append('email', email);
            data.append('staff_phone', phone);
            data.append('staff_address', address);
            data.append('birthdate', birthdate);
            data.append('staff_role', role);
            console.log(data);
            // const response = await axios.post(
            await axios.post(
                "http://127.0.0.1:8000/api/school/addStaff",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // const controller = response.data.data;
            // commit("Set_Controller", controller);
            await dispatch("FetchControllers");
        } catch (err) {
            throw `Adding Controller Error : ${err}`;
        }
    },
    async RemoveController({ commit, dispatch }, id) {
        try {
            const token = localStorage.getItem("token");
            await axios.get(
                `http://127.0.0.1:8000/api/school/deleteStaff/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            await dispatch('FetchControllers');
        } catch (err) {
            console.log(err);
        }
    },
    async UpdateController({ commit }, { id, name, phone, address, role }) {
        try {
            const token = localStorage.getItem("token");
            const updateData = new FormData();
            updateData.append('staff_name', name);
            updateData.append('staff_phone', phone);
            updateData.append('staff_address', address);
            updateData.append('staff_role', role);
            await axios.post(
                `http://127.0.0.1:8000/api/school/updateStaff/${id}`,
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Controller Info Updated Successfully")
        }
        catch (err) {
            console.log(err)
        }
    },
};