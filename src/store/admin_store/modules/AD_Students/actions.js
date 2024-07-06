import axios from "axios";
export const actions = {
    async FetchStudents({ commit },{school,stage,grade}) {
        try {
            const token = localStorage.getItem("token");
            const response=await axios.post(`http://127.0.0.1:8000/api/getStudent/${school}/${stage}/${grade}`,{},  {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log(response.data.data)

            commit('SetStudents',response.data.data)

        } catch (err) {
            console.error(err);
            throw err
        }
    },
    async FetchAllStudent({commit}){
        try {
            const token = localStorage.getItem("token");
            const response=await axios.get(`http://127.0.0.1:8000/api/getStudentsSchools`,  {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("All Students",response.data.data)
            commit("SetAllStd",response.data.data)

        } catch (err) {
            console.error(err);
            throw err
        }
    },
    async FetchSpecificStudent({commit},studentId){
        try {
            const token = localStorage.getItem("token");
            const response=await axios.get(`http://127.0.0.1:8000/api/studentinfo/${studentId}`,  {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("All Students",response.data.data)
            commit("studentDetails",response.data.data)
        } catch (err) {
            console.error(err);
            throw err
        }
    },
    async FetchStageStudent({commit},studentId){
        try {
            const token = localStorage.getItem("token");
            const response=await axios.get(`http://127.0.0.1:8000/api/showStudentStage/${studentId}}`,  {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("stages",response.data.data)
            commit("Setstages",response.data.data)
        } catch (err) {
            console.error(err);
            throw err
        }
    },
    async FetchLevelStudent({commit},{studentId,stageId}){
        try {
            const token = localStorage.getItem("token");
            const response=await axios.get(`http://127.0.0.1:8000/api/showStudentLevel/${studentId}/${stageId}`,  {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("levels",response.data.data)
            commit("Setlevels",response.data.data)
        } catch (err) {
            console.error(err);
            throw err
        }
    },
    async FetchScore({commit},{studentId,levelId,termId}){
        try {
            const token = localStorage.getItem("token");
            const response=await axios.get(`http://127.0.0.1:8000/api/getScoresByStudentGradeAndTerm/${studentId}/${levelId}/${termId}`,  {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("score",response.data.data)
            commit("SetScore",response.data.data)
        } catch (err) {
            console.error(err);
            throw err
        }
}

};
