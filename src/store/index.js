
import {createStore} from "vuex";
import adminStore from "./admin_store/index.js"
import parentStore from "./parent_store/index.js"
import SchoolStore from "./School_Store/index.js"
const store = createStore({
    namespace:true,
    modules:{adminStore,parentStore,SchoolStore}
});
export default store;