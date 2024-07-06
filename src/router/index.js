import { createRouter, createWebHistory } from "vue-router";
import ADrouter, { routerGuardAdmin } from './AD_router/router';
import SchoolRouter, { routerGuardSchool } from './SC_router/router';
import WelcomePageRouter from './WelcomPage/router';
import Parentrouter, { routerGuardParent } from './Parent_router/router';
import LandingPageRouter from './LandingPage/router.js';
import UnAuthorized from '../components/School/UnAuthorized.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...ADrouter.options.routes,
        ...WelcomePageRouter.options.routes,
        ...Parentrouter.options.routes,
        ...LandingPageRouter.options.routes,
        ...SchoolRouter.options.routes,
        {
            path: '/darv-system/401-UnAuthorized',
            name: 'UnAuthorized',
            title: 'غير امن | نظام درب التعليمي',
            component: UnAuthorized
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/darv-system/401-UnAuthorized'
        },
        {
            scrollBehavior(to, from, savedPosition) {
                return { top: 0 };
            },
        }
    ]
});
router.beforeEach(routerGuardParent);
router.beforeEach(routerGuardAdmin);
router.beforeEach(routerGuardSchool);
export default router;