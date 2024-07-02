import axios from "axios";
export const actions = {
    async SetEvent({ commit }, eventData) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://127.0.0.1:8000/api/addEvent",
                eventData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // commit('ADD_EVENT');
            console.log("Added Successfully");
        } catch (err) {
            console.log(err);
            throw err; // Propagate the error to the caller if needed
        }
    },
    async FetchEvents({ commit }){
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/showEvent",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log(response.data.data)
            commit("SET_EVENTS", response.data.data);
        } catch (err) {
            console.log(err);
        }
    },
    async RemoveEvent({ commit,dispatch  }, id) {
        try {
            const token = localStorage.getItem("token");
            console.log(id);
            await axios.post(
                `http://127.0.0.1:8000/api/deleteEvent/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            await dispatch('FetchEvents');
        } catch (err) {
            console.log(err);
        }
    },
    async UpdateEvent({commit},{updateData, id}){
        try{
            const token=localStorage.getItem("token");
            await axios.post(
                `http://127.0.0.1:8000/api/updateEvent/${id}`,
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("updated Succeffuly")
        }
        catch(err){
            throw err
        }
    }

};
