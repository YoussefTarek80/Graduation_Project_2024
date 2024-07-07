import axios from "axios";
import { controllers } from "chart.js";
export const actions = {
    async FetchTeachers({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/school/getTeacher",
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
            console.log(id, status);
            await axios.post(
                `http://127.0.0.1:8000/api/school/sendAcceptOrReject/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            await dispatch('FetchTeachers');
        } catch (err) {
            console.log(err);
        }
    },
    async AddTeacher({ dispatch }, { name, email, address, subject_id, phone }) {
        try {
            const token = localStorage.getItem("token");
            const form = new FormData();
            form.append("name", name);
            form.append("email", email);
            form.append("phone", phone);
            form.append("subject_id", subject_id);
            form.append("address", address);
            const response = await axios.post(
                "http://127.0.0.1:8000/api/school/addTeacher",
                form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            console.log(response.data.data);
            await dispatch("FetchTeachers");
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async subjectList({ commit }) {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/Subjects`
            );
            commit("Set_TeacherSubjects", response.data.data);
        } catch (err) {
            console.log(err);
        }
    },
    async RemoveTeacher({ commit, dispatch }, id) {
        try {
            const token = localStorage.getItem("token");
            console.log(id);
            await axios.get(
                `http://127.0.0.1:8000/api/school/deleteTeacher/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            await dispatch('FetchTeachers');
        } catch (err) {
            console.log(err);
        }
    },
    async UpdateTeacher({ commit }, { id, address, phone, email }) {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://127.0.0.1:8000/api/school/updateTeacher/${id}`,
                { address, phone, email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Teacher Info Updated Successfully")
        }
        catch (err) {
            console.log(err)
        }
    },
};