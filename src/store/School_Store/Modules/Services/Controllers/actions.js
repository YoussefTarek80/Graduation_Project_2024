import axios from "axios";
import { controllers } from "chart.js";
export const actions = {
    async FetchControllers({ commit }) {
        try {
            const token = localStorage.getItem("token");
            // const response = await axios.get(
            //     "http://127.0.0.1:8000/api/showEvent",
            //     {
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //         },
            //     }
            // );
            // console.log(response.data.data)
            const schoolControllers = [
                {
                    id: 0,
                    name: "مصطفي كامل",
                    address: "الجيزة - الزمالك",
                    role: "كنترول تصحيح",
                    age: 42
                },
                {
                    id: 1,
                    name: "محمد فتحي",
                    address: "القاهرة - المهندسين",
                    role: "كنترول تسجيل الطلاب",
                    age: 40
                },
                {
                    id: 2,
                    name: "محمد عزت",
                    address: "القاهرة - المهندسين",
                    role: "كنترول تحويل الطلاب",
                    age: 38
                },
                {
                    id: 3,
                    name: "معتز خالد",
                    address: "الجيزة - فيصل",
                    role: "كنترول إزالة ملف",
                    age: 35
                }
            ];
            localStorage.setItem("SchoolControllers", JSON.stringify(schoolControllers));
            commit("Set_Controllers", schoolControllers);
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
            // await axios.post(
            //     `http://127.0.0.1:8000/api/deleteEvent/${id}`,
            //     {},
            //     {
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //         },
            //     }
            // );
            console.log(controllers);
            commit('Set_Controllers', controllers);
            await dispatch('FetchControllers');
        } catch (err) {
            console.log(err);
        }
    },
    async UpdateController({ commit }, { id, name, age, address, role }) {
        try {
            const token = localStorage.getItem("token");
            // await axios.post(
            //     `http://127.0.0.1:8000/api/updateEvent/${id}`,
            //     updateData,
            //     {
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //         },
            //     }
            // );
            console.log("Controller Info Updated Successfully")
        }
        catch (err) {
            console.log(err)
        }
    },
};