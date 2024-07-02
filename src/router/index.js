import { createRouter, createWebHistory } from "vue-router";
import ADrouter,{routerGuardAdmin} from './AD_router/router'
import WelcomePageRouter from './WelcomPage/router'
import Parentrouter, {routerGuardParent} from './Parent_router/router'
import LandingPageRouter from './LandingPage/router.js'
import SchoolRouter from './SC_router/router.js'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...ADrouter.options.routes,
        ...WelcomePageRouter.options.routes,
        ...Parentrouter.options.routes,
        ...LandingPageRouter.options.routes,
        ...SchoolRouter.options.routes
      ],
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
});
router.beforeEach(routerGuardParent);
router.beforeEach(routerGuardAdmin);
export default router;