import { createStore } from "vuex";
import authModule from "./Modules/Auth/index.js";

const store = createStore({
    namespace: true,
    modules: {
        auth: authModule,
    },
});
export default store;