import axios from "axios";
import { controllers } from "chart.js";
export const actions = {
    async FetchSCEvents({ commit }) {
        try {
            const token = localStorage.getItem("token");
            // const response = await axios.get(
            //     "http://127.0.0.1:8000/api/showEvent",
            //     {
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //         },
            //     }
            // );
            // console.log(response.data.data)
            const events = [
                {
                    id: 0,
                    name: "بدء الحجة",
                    address: "دار الأوبرا",
                    date: '2024-04-15',
                    time: '09:00',
                    status: "تم الحدث",
                },
                {
                    id: 1,
                    name: "نهائة الحجة",
                    address: "دار الأوبرا",
                    date: '2024-06-15',
                    time: '09:00',
                    status: "مفعل",
                }
            ];
            localStorage.setItem("Events", JSON.stringify(events));
            commit("Set_Events", events);
        } catch (error) {
            console.error("Error fetching Events info:", error);
        }
    },
    async RemoveSCEvent({ commit, dispatch }, id) {
        try {
            const token = localStorage.getItem("token");
            console.log(id);
            // await axios.post(
            //     `http://127.0.0.1:8000/api/deleteEvent/${id}`,
            //     {},
            //     {
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //         },
            //     }
            // );
            console.log(id);
            // commit('Set_Events', events);
            // await dispatch('FetchSCEvents');
        } catch (err) {
            console.log(err);
        }
    },
    async UpdateSCEvent({ commit }, { id, name, date, time, status, desc }) {
        try {
            const token = localStorage.getItem("token");
            // await axios.post(
            //     `http://127.0.0.1:8000/api/updateEvent/${id}`,
            //     updateData,
            //     {
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //         },
            //     }
            // );
            console.log("Event Info Updated Successfully");
        }
        catch (err) {
            throw `Updating School Event Error:${err}`;
        }
    },
    async AddEvent({ dispatch }, { name, date, time, status, desc }) {
        try {
            const token = localStorage.getItem("token");
            // const response = await axios.post(
            //     "http://127.0.0.1:8000/api/addEvent",
            //     eventData,
            //     {
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //         },
            //     }
            // );
            await dispatch("FetchSCEvents");
            console.log("Event Added Successfully");
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
};