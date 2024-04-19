export const mutations = {
    SET_ADD_SCHOOL_STATUS(state, status) {
        state.addSchoolStatus = status;
    },
    SET_SCHOOLS(state, schools) {
        state.schools = schools;
    },
    SET_FETCH_SCHOOLS_STATUS(state, status) {
        state.fetchSchoolsStatus = status;
    },
};
