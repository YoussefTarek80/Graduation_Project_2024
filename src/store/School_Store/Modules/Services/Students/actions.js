import axios from "axios";
export const actions = {
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
    async fetchStdScStages({ commit }, { studentId }) {
        try {
            console.log(studentId)
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `http://127.0.0.1:8000/api/school/showStudentStage/${studentId}`,
                {
                    headers: { Authorization: `Bearer ${token}`, },
                }
            );
            const stages = response.data.data;
            commit("Set_StdStages", stages);
        }
        catch (error) {
            console.error("Error fetching stages:", error);
        }
    },
    async fetchStdScLevels({ commit }, { studentId, stageId }) {
        try {
            const token = localStorage.getItem("token");
            console.log(studentId, stageId);
            const response = await axios.get(`http://127.0.0.1:8000/api/school/showStudentLevel/${studentId}/${stageId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            commit('Set_StdLevels', response.data.data);
        } catch (err) {
            console.error(err);
        }
    },
    async fetchStdScTerms({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://127.0.0.1:8000/api/school/showterms`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            commit('Set_StdTerms', response.data.data);
        } catch (err) {
            console.error(err);
        }
    },
    async fetchStdSubjects({ commit }, { studentId, levelId, termId }) {
        try {
            const token = localStorage.getItem("token");
            console.log(studentId, levelId, termId);
            const response = await axios.get(`http://127.0.0.1:8000/api/school/getScoresByStudentGradeAndTerm/${studentId}/${levelId}/${termId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            const subjects = response.data.data[0].terms[0].scores;
            commit('Set_StdSubjects', subjects)
            console.log("retreived data :", subjects);
            console.log("retreived data :", response.data.data);
        } catch (err) {
            console.error(err);
            throw err
        }
    },
};

