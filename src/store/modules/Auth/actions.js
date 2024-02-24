import axios from "axios";

export const actions = {
    async login({ commit }, { email, password }) {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                { email, password }
            );
            const data = response.data.data;
            localStorage.setItem("token", data.token);
            const user={
                name:data.name,
                email:data.email
            }
            localStorage.setItem("user", JSON.stringify(user));
            commit("SET_USER", user);
        } catch (error) {
            throw error;
        }
    },
};
