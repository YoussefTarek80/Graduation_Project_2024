import axios from "axios";
export const actions = {
    async FetchAdmins({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/getAllAdminstrations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            commit('SET_ADMINS',response.data.data);
            console.log("ADmins",response.data.data)
        } catch (err) {
            console.log(err);
            throw err; // Propagate the error to the caller if needed
        }
    },
};
