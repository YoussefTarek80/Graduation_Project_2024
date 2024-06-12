import axios from "axios";

export const actions = {
    async UpdateProfile({commit, dispatch}, formData) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://127.0.0.1:8000/api/parent/updateProfile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response)
            // await dispatch("FetchUser");
        } catch (error) {
            throw error;
        }
    },
};
