import axios from "axios";
import { controllers } from "chart.js";
export const actions = {
    async FetchSCEvents({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/school/showEvent",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const SC_Events = response.data.data;
            commit("Set_SCEvents", SC_Events);
            console.log(SC_Events);
        } catch (error) {
            console.error("Error fetching Events info:", error);
        }
    },
    async FetchADEvents({ commit }) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/school/ShowAdEvent",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const AD_Events = response.data.data;
            commit("Set_ADEvents", AD_Events);
            console.log(AD_Events);
        } catch (error) {
            console.error("Error fetching Events info:", error);
        }
    },
    async RemoveSCEvent({ commit, dispatch }, id) {
        try {
            const token = localStorage.getItem("token");
            console.log(id);
            const response = await axios.get(
                `http://127.0.0.1:8000/api/school/deleteEvent/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data.message);
            await dispatch('FetchSCEvents');
        } catch (err) {
            console.log(err);
        }
    },
    async UpdateSCEvent({ commit }, { id, name, date, time, description, address }) {
        try {
            const token = localStorage.getItem("token");
            const updateData = new FormData();
            updateData.append("name", name);
            updateData.append("date", date);
            updateData.append("time", time);
            updateData.append("description", description);
            updateData.append("address", address);
            const response = await axios.post(
                `http://127.0.0.1:8000/api/school/updateEvent/${id}`,
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data.message);
        }
        catch (err) {
            throw `Updating School Event Error:${err}`;
        }
    },
    async AddEvent({ dispatch }, { name, description, date, time, address }) {
        try {
            const token = localStorage.getItem("token");
            const eventData = new FormData();
            eventData.append("name", name);
            eventData.append("date", date);
            eventData.append("time", time);
            eventData.append("description", description);
            eventData.append("address", address);
            const response = await axios.post(
                "http://127.0.0.1:8000/api/school/addEvent",
                eventData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            await dispatch("FetchSCEvents");
            console.log("Event Added Successfully");
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
};