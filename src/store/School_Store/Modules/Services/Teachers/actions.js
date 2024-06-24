import axios from "axios";
import { controllers } from "chart.js";
export const actions = {
    async FetchTeachers({ commit }) {
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
            const teachers = [
                {
                    id: 0,
                    name: "مصطفي كامل",
                    address: "الجيزة - الزمالك",
                    subject: "اللغة العربية",
                    age: 42
                },
                {
                    id: 1,
                    name: "محمد فتحي",
                    address: "القاهرة - المهندسين",
                    subject: "اللغة الإنجليزية",
                    age: 40
                },
                {
                    id: 2,
                    name: "محمد عزت",
                    address: "القاهرة - المهندسين",
                    subject: "الكيمياء",
                    age: 38
                }
            ];
            localStorage.setItem("Teachers", JSON.stringify(teachers));
            commit("Set_Teachers", teachers);
        } catch (error) {
            console.error("Error fetching Events info:", error);
        }
    },
    async RemoveTeacher({ commit, dispatch }, id) {
        try {
            const token = localStorage.getItem("token");
            console.log(id);
            // await axios.post(
            //     `http://127.0.0.1:8000/api/deleteEvent/${id}`,
            //     {},
            //     {
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //         },
            //     }
            // );
            // const evns = events;
            console.log(teachers);
            teachers.splice(events.indexOf(id), 1);
            commit('Set_Teachers', teachers);
            await dispatch('FetchTeachers');
        } catch (err) {
            console.log(err);
        }
    },
    async UpdateTeacher({ commit }, { id, name, age, address, subject }) {
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
            console.log("Teacher Info Updated Successfully")
        }
        catch (err) {
            console.log(err)
        }
    },
    async AddTeacher({ dispatch }, teacherData) {
        try {
            const token = localStorage.getItem("token");
            // const response = await axios.post(
            //     "http://127.0.0.1:8000/api/addEvent",
            //     eventData,
            //     {
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //         },
            //     }
            // );
            await dispatch("FetchTeachers");
            console.log("Teacher Added Successfully");
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
};