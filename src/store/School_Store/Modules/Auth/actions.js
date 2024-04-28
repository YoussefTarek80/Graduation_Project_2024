import axios from "axios";
export const actions = {
    async loginSC({ commit, dispatch }, { email, password }) {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/school/login",
                { email, password }
            );
            const data = response.data.data;
            localStorage.setItem("token", data.token);
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
            localStorage.clear();
            commit("LOGOUT2");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    },
    async FetchUser2({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/school/showProfile",
                {
                    headers: { Authorization: `Bearer ${token}`, },
                }
            );
            const user = response.data.data;
            localStorage.setItem("User", JSON.stringify(user));
            commit("Set_User2", user);
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
    ///
    async FetchRequests({ commit }) {
        try {
            const token = localStorage.getItem("token");
            // const response = await axios.get(
            //     "http://127.0.0.1:8000/api/school/showProfile",
            //     {
            //         headers: { Authorization: `Bearer ${token}`, },
            //     }
            // );
            // const user = response.data.data;
            const requests = [
                {
                    type: "تحويل",
                    newScAddress: 'فيصل - الهرم - سهل حمزة',
                    manager: null,
                    studname: "يوسف طارق صلاح محمد",
                    parentName: "طارق صلاح محمد",
                    newSchool: 'عبدالله بن رواحة',
                    currSchool: 'مصطفي كامل',
                    level: 'الصف الخامس الابتدائي',
                    schoolYear: new Date().getFullYear(),
                    reason: 'ذكر السبب، مثل: عائلية، أو تغيير مكان الإقامة، أو أسباب صحية، أو أي سبب آخر',
                    parentPhone: '+201065390754',
                    parentEmail: 'tarek.salah122@gmail.com',
                    date: {
                        day: new Date().getDay() + 1,
                        month: new Date().getMonth(),
                        year: new Date().getFullYear(),
                    },
                    time: {
                        hrs: new Date().getHours(),
                        mins: new Date().getMinutes(),
                        secs: new Date().getSeconds(),
                    }
                },
                {
                    type: "تسجيل",
                    studname: "الاء خميس عبد النعيم",
                    parentName: "خميس عبد النعيم",
                    gender: "أنثي",
                    religion: "مسلم",
                    nationlity: "مصري",
                    address: "القاهرة - الهرم - المنيب",
                    nationalId: "084756456456",
                    phone: "+201065390754",
                    parentEmail: "khamess.abdel@gmail.com",
                    level: "الصف الأول الثانوي",
                    schoolYear: new Date().getFullYear(),
                    grade: "A+",
                    dob: {
                        day: '٩',
                        month: "يناير",
                        year: '٢٠٠٩',
                    },
                    date: {
                        day: new Date().getDay() + 1,
                        month: new Date().getMonth(),
                        year: new Date().getFullYear(),
                    },
                    time: {
                        hrs: new Date().getHours(),
                        mins: new Date().getMinutes(),
                        secs: new Date().getSeconds(),
                    }
                },
                {
                    parentName: "رمضان شوقي إسماعيل",
                    type: "استفسار",
                    query: "وصف الاستفسار؟",
                    senderEmail: "ramadan.shawky@gmail.com",
                    manager: 'مصطفي الخولي',
                    date: {
                        day: new Date().getDay() + 1,
                        month: new Date().getMonth(),
                        year: new Date().getFullYear(),
                    },
                    time: {
                        hrs: new Date().getHours(),
                        mins: new Date().getMinutes(),
                        secs: new Date().getSeconds(),
                    }
                },
            ];
            localStorage.setItem("Requests", JSON.stringify(requests));
            commit("Set_Requests", requests);
        } catch (error) {
            console.error("Error fetching Requests info:", error);
        }
    },
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
    async AddController({ dispatch }, controllerData) {
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
            // controllers.push(controllerData);
            // commit("Set_Controllers", controllers)
            await dispatch("FetchControllers");
        } catch (err) {
            throw `Adding Controller Error : ${err}`;
        }
    },
};
// إ