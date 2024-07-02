import { createStore } from "vuex";
import module4 from './Modules/Auth/index';
import module5 from './Modules/Services/Students/index';
import module6 from './Modules/Services/Teachers/index';
import module7 from './Modules/Services/Controllers/index';
import module8 from './Modules/Services/Requests/index';
import module9 from './Modules/Services/Events/index';
import module10 from './Modules/Services/Subjects/index';
import module11 from './Modules/Services/Reports/index';
import module12 from './Modules/Services/Technical-Support/index';
const store = {
    namespace: true,
    modules: {
        module4,
        module5,
        module6,
        module7,
        module8,
        module9,
        module10,
        module11,
        module12,
    },
}
export default store;
