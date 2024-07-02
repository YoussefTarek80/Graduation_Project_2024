import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
// import store from "./store/admin_store/index.js";
// import ParentStore from "./store/parent_store/index.js";
import store from './store/index.js'
import AOS from "aos";
import "aos/dist/aos.css";
import AlertError from "./UI/AlertError.vue";
import loading from "./UI/LoadingComponent/laoding.vue";
import laoding_Search from "./UI/LoadingComponent/loading2.vue";
import laoding_INFO from "./UI/loadingInformation/loading_info.vue";
import laoding_INFO3 from "./UI/loadingInformation/loading_info2.vue";
import laoding_INFO2 from "./UI/LoadingComponent/loading3.vue";

import BaseTeleport from "./UI/BaseTeleport.vue";
import Pagination from "./UI/Pagination.vue";
import Navbar_Component from "./components/Admin/Navbar/Navbar.vue";
import ScNavbarComp from "./components/School/Navbar/Navbar.vue"
import Footer_Component from "./components/Admin/Footer/footer.vue";

const app = createApp(App);
app.use(router);
app.use(store);
// app.use(ParentStore);
AOS.init();
app.component("AlertError", AlertError);
app.component("loading", loading);
app.component("loading_Search", laoding_Search);
app.component("laoding_INFO", laoding_INFO);
app.component("laoding_INFO2", laoding_INFO2);
app.component("laoding_INFO3", laoding_INFO3);
app.component("BaseTeleport", BaseTeleport);
app.component("Pagination", Pagination);
app.component("Navbar_Component", Navbar_Component);
app.component("ScNavbarComp", ScNavbarComp);
app.component("Footer_Component", Footer_Component);
app.mount("#app");

