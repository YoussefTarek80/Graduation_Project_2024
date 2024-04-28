import { createStore } from "vuex";
import module1 from './admin_store/modules/AD_Schools/index';
import module2 from './admin_store/modules/AD_Events/index';
import module3 from './admin_store/modules/Auth/index';
import module4 from './School_Store/Modules/Auth/index';
// import module5 from "./parent_store/modules/Auth/index";
// import module6 from "./parent_store/modules/Children/index";
// import module7 from "./parent_store/modules/Schools/index";

const store = createStore({
    namespace: true,
    modules: {
        module1,
        module2,
        module3,
        module4,
        // module5,
        // module6,
        // module7,
    },
});
export default store;
