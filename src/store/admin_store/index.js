import { createStore } from "vuex";
import authModule from "./modules/Auth/index.js";
import schoolsModule from "./modules/AD_Schools/index.js";
import eventsModule from "./modules/AD_Events/index.js";
const store = createStore({
    namespace: true,
    modules: {
        auth: authModule,
        school:schoolsModule,
        event:eventsModule
    },
});
export default store;
