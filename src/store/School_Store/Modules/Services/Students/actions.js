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
};

