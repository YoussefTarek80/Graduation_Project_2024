import axios from "axios";
export const actions = {
    async FetchAdminstrations({ commit }, StateName) {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/showAdminstrations/${StateName}`
            );
            commit("SetAdminstration",response.data.data)
            // console.log(response.data.data)
            // Handle response if needed
        } catch (error) {
            throw error;
        }
    },
    async FetchSchools({ commit }, AdID) {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/showSchoolsAdminstrations/${AdID}`
            );
            commit("SetSchools",response.data.data)
            // console.log(response.data.data)
            // Handle response if needed
        } catch (error) {
            throw error;
        }
    },
    async FetchNotOwnSchool({ commit }, {AdID, ScID}) {
        try {
            console.log(ScID,AdID)
            const response = await axios.post(
                `http://127.0.0.1:8000/api/showSchoolsExceptSchool/${AdID}`,
                ScID
            );
            console.log(response.data.data)
            commit("SetSchools",response.data.data)
            // console.log(response.data.data)
            // Handle response if needed
        } catch (error) {
            throw error;
        }
    },
    async FetchBestSchools({ commit },adID){
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get(
                `http://127.0.0.1:8000/api/parent/recommended-schools/${adID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data.data)
            commit("SETBestSchools",response.data.data)
        } catch (error) {
            throw error;
        }
    }
};
