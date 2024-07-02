import axios from "axios";
import { controllers } from "chart.js";
export const actions = {
    async loginSC({ commit, dispatch }, { email, password, role }) {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/school/login",
                { email, password, role }
            );
            const data = response.data.data;
            console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("staff_role", data.staff_role);
            await dispatch("FetchUser2");
        } catch (error) {
            throw error;
        }
    },
    async logoutSC({ commit }) {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://127.0.0.1:8000/api/school/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            localStorage.removeItem('token');
            localStorage.removeItem('User');
            commit("LOGOUT2");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    },
    async FetchUser2({ commit }, role) {
        try {
            const token = localStorage.getItem("token");
            if (role === 'manager') {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/school/manager/showProfile",
                    {
                        headers: { Authorization: `Bearer ${token}`, },
                    }
                );
                const user = response.data.data;
                localStorage.setItem("User", JSON.stringify(user));
                commit("Set_User2", user);
            }
            else if (role === 'staff') {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/school/staff/showProfile",
                    {
                        headers: { Authorization: `Bearer ${token}`, },
                    }
                );
                const user = response.data.data;
                localStorage.setItem("User", JSON.stringify(user));
                commit("Set_User2", user);
            }
        } catch (error) {
            console.error("Error fetching profile info:", error);
        }
    },
    async FetchStudents({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/school/showStudents",
                {
                    headers: { Authorization: `Bearer ${token}`, },
                }
            );
            const studs = response.data.data;
            commit("Set_Students", studs);
        } catch (error) {
            console.error("Error fetching Students info:", error);
        }
    },
    async FetchSubjects({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/school/showStudents",
                {
                    headers: { Authorization: `Bearer ${token}`, },
                }
            );
            const subjects = response.data.data;
            commit("Set_Subjects", subjects);
        } catch (error) {
            console.error("Error fetching Students info:", error);
        }
    },
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
            // console.log(reponse.data.data);
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
    ///
    async FetchSCEvents({ commit }) {
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
            const events = [
                {
                    id: 0,
                    name: "بدء الحجة",
                    address: "دار الأوبرا",
                    date: '2024-04-15',
                    time: '09:00',
                    status: "تم الحدث",
                },
                {
                    id: 1,
                    name: "نهائة الحجة",
                    address: "دار الأوبرا",
                    date: '2024-06-15',
                    time: '09:00',
                    status: "مفعل",
                }
            ];
            localStorage.setItem("Events", JSON.stringify(events));
            commit("Set_Events", events);
        } catch (error) {
            console.error("Error fetching Events info:", error);
        }
    },
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
    async RemoveSCEvent({ commit, dispatch }, id) {
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
            console.log(id);
            // commit('Set_Events', events);
            // await dispatch('FetchSCEvents');
        } catch (err) {
            console.log(err);
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
    async UpdateStudent({ commit }, { id, name, level, address }) {
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("name", name);
            formData.append("level", level);
            formData.append("address", address);
            await axios.post(
                `http://127.0.0.1:8000/api/school/updateStudent/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Student Data Updated Successfully");
        } catch (error) {
            console.error("Error fetching profile info:", error);
        }
    },
    async UpdateSCEvent({ commit }, { id, name, date, time, status, desc }) {
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
            console.log("Event Info Updated Successfully");
        }
        catch (err) {
            throw `Updating School Event Error:${err}`;
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
    async AddEvent({ dispatch }, { name, date, time, status, desc }) {
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
            await dispatch("FetchSCEvents");
            console.log("Event Added Successfully");
        } catch (err) {
            console.log(err);
            throw err;
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



// async FetchSCRequests({ commit }) {
//     try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//             "http://127.0.0.1:8000/api/school/ShowEnrollRequests",
//             {
//                 headers: { Authorization: `Bearer ${token}`, },
//             }
//         );
//         const requests = response.data.data;
//         commit("Set_SCRequests", requests);
//         response = await axios.get(
//             "http://127.0.0.1:8000/api/school/ShowTransferRequestsToNew",
//             {
//                 headers: { Authorization: `Bearer ${token}`, },
//             }
//         );
//         requests = response.data.data;
//         commit("Set_SCRequests", requests);
//         response = await axios.get(
//             "http://127.0.0.1:8000/api/school/ShowTransferRequestsToOld",
//             {
//                 headers: { Authorization: `Bearer ${token}`, },
//             }
//         );
//         requests = response.data.data;
//         commit("Set_SCRequests", requests);
//         // response = await axios.get(
//         //     "http://127.0.0.1:8000/api/school/ShowEnrollRequests",
//         //     {
//         //         headers: { Authorization: `Bearer ${token}`, },
//         //     }
//         // );
//         // requests = response.data.data;
//         // commit("Set_SCQuestionRequests", requests);
//     } catch (error) {
//         console.error("Error fetching Requests info:", error);
//     }
// },