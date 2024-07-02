import axios from "axios";
export const actions = {
    async Add_Question_For_School({commit},form) {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.post(
                "http://127.0.0.1:8000/api/parent/addQuestion",form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("addSuccessfully",response.data.data)
            // commit('setNotify',response.data.data)
        } catch (error) {
            throw error;
        }
    },
    async GetChildSchools({commit}) {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/parent/getChildSchools",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("All Schools",response.data.data)
            commit('setSchools',response.data.data)
        } catch (error) {
            throw error;
        }
    },
};
