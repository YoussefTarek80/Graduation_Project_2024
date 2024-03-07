import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/admin_store";
import AOS from "aos";
import "aos/dist/aos.css";
import AlertError from "./UI/AlertError.vue";
import loading from "./UI/LoadingComponent/laoding.vue";
import laoding_Search from "./UI/LoadingComponent/loading2.vue";
import BaseTeleport from "./UI/BaseTeleport.vue";
import Navbar_Component from "./components/Admin/Navbar/Navbar.vue";
import Footer_Component from "./components/Admin/Footer/footer.vue";

const app = createApp(App);
app.use(router);
app.use(store);
AOS.init();
app.component("AlertError", AlertError);
app.component("loading", loading);
app.component("laoding_Search", laoding_Search);

app.component("BaseTeleport", BaseTeleport);
app.component("Navbar_Component", Navbar_Component);
app.component("Footer_Component", Footer_Component);
app.mount("#app");
