
import authModule from "./modules/Auth/index.js";
import childModule from "./modules/Requests/index.js";
import schoolModule from "./modules/Schools/index.js";
import profileModule from "./modules/Profile/index.js";
import notificationModule from "./modules/Notifications/index.js";
import ChatBotModule from "./modules/Chatbot/index.js";
const store = ({
    namespace: true,
    modules: {
        auth: authModule,
        child:childModule,
        school:schoolModule,
        profile:profileModule,
        notification:notificationModule,
        chatBot:ChatBotModule
    },
});
export default store;
