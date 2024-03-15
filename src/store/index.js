import { createStore } from "vuex";
import authModule from "./admin_store/modules/AD_Schools/index.js";
const store = createStore({
    namespace: true,
    modules: {
        auth: authModule,
    },
});
export default store;