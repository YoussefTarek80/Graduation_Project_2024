export const mutations = {
    SetStudents(state, students) {
        state.students = students;
    },
    SetAllStd(state,std){
        state.std = std;
    },
    studentDetails(state,info){
        state.info = info;
    },
    Setstages(state,stages){
        state.stages = stages;
    },
    Setlevels(state,levels){
        state.levels = levels;
    },
    SetScore(state,score){
        state.score = score;
    }
};
