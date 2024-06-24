import { createStore } from "vuex";
import module1 from './admin_store/modules/AD_Schools/index';
import module2 from './admin_store/modules/AD_Events/index';
import module3 from './admin_store/modules/Auth/index';
import module4 from './School_Store/modules/Auth/index';
import module5 from './School_Store/modules/Services/Students/index';
import module6 from './School_Store/modules/Services/Teachers/index';
import module7 from './School_Store/modules/Services/Controllers/index';
import module8 from './School_Store/modules/Services/Requests/index';
import module9 from './School_Store/modules/Services/Events/index';
import module10 from './School_Store/modules/Services/Subjects/index';
// import module11 from "./parent_store/modules/Auth/index";
// import module12 from "./parent_store/modules/Children/index";
// import module13 from "./parent_store/modules/Schools/index";

const store = createStore({
    namespace: true,
    modules: {
        module1,
        module2,
        module3,
        module4,
        module5,
        module6,
        module7,
        module8,
        module9,
        module10,
        // module11,
        // module12,
        // module13,
    },
});
export default store;
