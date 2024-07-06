import axios from "axios";
import { controllers } from "chart.js";
export const actions = {
    async FetchTeachers({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/school/showTeachers",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const teachers = response.data.data
            commit("Set_Teachers", teachers);
            console.log(response.data.data)
        } catch (error) {
            console.error("Error fetching Events info:", error);
        }
    },
    async FetchTeacherApps({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/school/getApplication",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const teachapps = response.data.data
            commit("Set_TeacherApps", teachapps);
            console.log(response.data.data)
        } catch (error) {
            console.error("Error fetching teachapps info:", error);
        }
    },
    async AcceptRejectTeachApp({ commit, dispatch }, { id, status }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/school/getApplication",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch("FetchTeacherApps");
            console(response.data.data);
        } catch (error) {
            console.error("Error fetching teachapp info:", error);
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