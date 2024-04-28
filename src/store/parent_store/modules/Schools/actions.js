import axios from "axios";
export const actions = {
    async ChildRegister({ commit }, formData) {
        try {
            const token=localStorage.getItem("token")
            const response = await axios.post(
                "http://127.0.0.1:8000/api/parent/add-child",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            // Handle response if needed
        } catch (error) {
            throw error;
        }
    },
    async FetchChildren({commit}){
        try{
            const token=localStorage.getItem("token")
            const response = await axios.get(
                "http://127.0.0.1:8000/api/parent/children",
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            commit('SET_CHILDREN', response.data);
        }catch{

        }
    }

};
