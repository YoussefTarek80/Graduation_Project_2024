import axios from "axios";
export const actions = {
    async AddRequest({ commit }, formData) {
        try {
            const token=sessionStorage.getItem("token")

            const response = await axios.post(
                "http://127.0.0.1:8000/api/parent/enrollRequest",
                formData,
                {
                    headers: {
                        // 'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            // Handle response if needed
        } catch (error) {
            throw error;
        }
    },
    async FetchRequests({commit}){
        try{
            const token=sessionStorage.getItem("token")
            const response = await axios.get(
                "http://127.0.0.1:8000/api/parent/ShowEnrollRequests",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            console.log("data",response.data)
            commit('SetRequests', response.data.data);
        } catch (error) {
            throw error;
        }
    },
    async UpdateRequests({commit}, { id, formData }){
        try{
            const token=sessionStorage.getItem("token")
            console.log(id)
            const response = await axios.post(
                `http://127.0.0.1:8000/api/parent/updateEnrollRequest/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            console.log("data",response.data)
        } catch (error) {
            throw error;
        }
    },
    async DeleteRequest({commit},id){
        try{
            const token=sessionStorage.getItem("token")
            const response = await axios.post(
                `http://127.0.0.1:8000/api/parent/deleteEnrollRequest/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
        } catch (error) {
            throw error;
        }
    },
    async ShowChildren({commit}){
        try{
            const token=sessionStorage.getItem("token")
            const response = await axios.get(
                `http://127.0.0.1:8000/api/parent/showChild`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            commit('SetChildren', response.data.data);
        } catch (error) {
            throw error;
        }
    },
    async addTransferRequest({commit},{formData,id}){
        try{
            const token=sessionStorage.getItem("token")
            console.log(id,formData)
            const response = await axios.post(
                `http://127.0.0.1:8000/api/parent/transferRequest/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
        }
        catch (err){
            throw err
        }
    },
    async FetchTransferDegree({commit},nationalID){
        try{
            const token=sessionStorage.getItem("token")
            console.log(nationalID)
            const response = await axios.get(
                `http://127.0.0.1:8000/api/parent/ShowTransferReqWithNationalID/${nationalID}`,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            console.log(response.data.data)
            commit('SetTransferGrade',response.data.data)

        }
        catch (err){
            throw err
        }
    }
};
