import { createRouter, createWebHistory } from "vue-router";
import ADrouter from './AD_router/router';
import SCrouter from './SC_router/router';
import WelcomePageRouter from './WelcomPage/router';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...ADrouter.options.routes,
    ...SCrouter.options.routes,
    ...WelcomePageRouter.options.routes,
  ]
});

export default router;