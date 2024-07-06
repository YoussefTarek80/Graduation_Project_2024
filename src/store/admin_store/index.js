
import authModule from "./modules/Auth/index.js";
import schoolsModule from "./modules/AD_Schools/index.js";
import eventsModule from "./modules/AD_Events/index.js";
import subjectModule from "./modules/AD_Subjects/index.js";
import studentModule from "./modules/AD_Students/index.js";
import adminModule from "./modules/AD_Admins/index.js";
import reportModule from "./modules/AD_Reports/index.js";
const store = ({
    namespace: true,
    modules: {
        auth: authModule,
        school:schoolsModule,
        event:eventsModule,
        subject:subjectModule,
        student:studentModule,
        admins:adminModule,
        report:reportModule
    },
});
export default store;
