export const mutations = {
    Set_User2(state, user) {
        state.user = user;
    },
    Set_Students(state, studs) {
        state.studs = studs;
    },
    Set_Subjects(state, subjects) {
        state.subjects = subjects;
    },
    Set_SCRequests(state, requests) {
        state.requests = requests;
    },
    Set_SCTRequests(state, requests) {
        state.trequests = requests;
    },
    Set_SCEvents(state, events) {
        state.events = events;
    },
    Set_Teachers(state, teachers) {
        state.teachers = teachers;
    },
    Set_Controllers(state, controllers) {
        state.controllers = controllers;
    },
    LOGOUT2(state) {
        state.user = null;
    }
};
