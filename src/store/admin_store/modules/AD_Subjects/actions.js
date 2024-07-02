import axios from "axios";
export const actions = {
    async GetStages({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response=await axios.get("http://127.0.0.1:8000/api/showStages",  {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            commit('SetStatges',response.data.data)

        } catch (err) {
            console.error(err);
            throw err
        }
    },
    async GetLevels({ commit },id) {
        try {
            const token = localStorage.getItem("token");
            const response=await axios.get(`http://127.0.0.1:8000/api/showLevels/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            commit('SetLevels',response.data.data)
        } catch (err) {
            console.error(err);
            throw err
        }
    },
    async GetTerms({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response=await axios.get(`http://127.0.0.1:8000/api/showterms`,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            commit('SetTerms',response.data.data)
        } catch (err) {
            console.error(err);
            throw err
        }
    },
    async GetSubjects({ commit },{levelid,termid}) {
        try {
            const token = localStorage.getItem("token");
            console.log(levelid,termid)
            const response=await axios.get(`http://127.0.0.1:8000/api/showSubjects/${levelid}/${termid}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            commit('SetSubject',response.data.data)
            console.log("Retreived Successfully",response.data.data);
        } catch (err) {
            console.error(err);
            throw err
        }
    },
};
