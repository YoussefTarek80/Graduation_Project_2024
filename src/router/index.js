import { createRouter, createWebHistory } from "vue-router";
import routerAdmin from './AD_router/router'
import routerSChool from './SC_router/router'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...routerAdmin.options.routes,
        ...routerSChool.options.routes,
    ]
});
export default router;