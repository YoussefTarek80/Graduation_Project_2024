import { createStore } from "vuex";
import authModule from "./modules/Auth/index.js";
import schoolsModule from "./modules/AD_Schools/index.js";

const store = createStore({
    namespace: true,
    modules: {
        auth: authModule,
        school:schoolsModule
    },
});
export default store;
