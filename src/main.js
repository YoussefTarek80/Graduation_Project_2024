import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.js'
import store from './store/index.js';
import AOS from 'aos'
import 'aos/dist/aos.css'
import AlertError from './UI/AlertError.vue'
import loading from './UI/laoding.vue'
import Navbar_Component from './components/Admin/Navbar/Navbar.vue'
import Footer_Component from'./components/Admin/Footer/footer.vue'
const app=createApp(App);
app.use(router);
app.use(store);
AOS.init()
app.component('AlertError',AlertError);
app.component('loading',loading);
app.component('Navbar_Component',Navbar_Component);
app.component('Footer_Component',Footer_Component);
app.mount('#app')

