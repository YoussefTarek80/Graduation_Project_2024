import axios from "axios";
import { controllers } from "chart.js";
export const actions = {
    async fetchScStages({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `http://127.0.0.1:8000/api/school/showStages`,
                {
                    headers: { Authorization: `Bearer ${token}`, },
                }
            );
            const stages = response.data.data;
            commit("Set_Stages", stages);
        }
        catch (error) {
            console.error("Error fetching stages:", error);
        }
    },
    async fetchScLevels({ commit }, id) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://127.0.0.1:8000/api/school/showLevels/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            commit('Set_Levels', response.data.data);
        } catch (err) {
            console.error(err);
        }
    },
    async fetchScTerms({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://127.0.0.1:8000/api/school/showterms`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            commit('Set_Terms', response.data.data);
        } catch (err) {
            console.error(err);
        }
    },
    async fetchScSubjects({ commit }, { levelID, termID }) {
        try {
            const token = localStorage.getItem("token");
            console.log(levelID);
            console.log(termID);
            const response = await axios.get(`http://127.0.0.1:8000/api/school/showSubjects/${levelID}/${termID}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            commit('Set_Subjects', response.data.data)
            console.log("retreived data :", response.data.data);
        } catch (err) {
            console.error(err);
            throw err
        }
    },
    async fetchStudSubject({ commit }, term_subject) {
        try {
            const token = localStorage.getItem("token");
            console.log(term_subject)
            const response = await axios.get(`http://127.0.0.1:8000/api/school/getStudentsGrade/${term_subject}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            commit('Set_StudentSubject', response.data.data)
            console.log("retreived data :", response.data.data);
        } catch (err) {
            console.error(err);
            throw err
        }
    },
};