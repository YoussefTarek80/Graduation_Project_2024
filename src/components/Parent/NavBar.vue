<template>
  <header class="flex items-center justify-between flex-row-reverse sm:px-20 sm:p-0 p-8 relative">
    <div class="relative">
      <div>
        <img src="../../assets/Parent/NavbarLogo.png" class="sm:w-80 w-44">
      </div>
      <div class="absolute -right-20 top-10 cursor-pointer animate-bounce" @mouseover="isHover = true">
        <img src="../../../src/assets/Parent/Navbar-profile3.png" class="w-14">
        <span class="w-7 h-7 block rounded-full absolute -top-2 -right-4 text-center bg-red-500 text-white font-bold">{{ notificationCount }}</span>
      </div>
    </div>
    <div class="cursor-pointer" @click="SideBarActivate">
      <img src="../../assets/Parent/Menubar.png" class="sm:w-16 w-14">
    </div>
  </header>
  <transition name="slide-fade">
    <Notification :ishover="isHover" @update-notification-count="updateNotificationCount"
                  @mouseleave="isHover = false"></Notification>
  </transition>
  <transition name="slide-fade">
    <div class="side-bar sm:w-4/12 w-full fixed right-0 top-0 h-screen z-50 text-white bg-white shadow-2xl"
         v-if="closeSideBar">
      <div class="side-bar-head bg-white h-52 flex items-center px-5 relative">
        <div>
          <img src="../../assets/Logo/Profile.png">
        </div>
        <div class="flex flex-col px-5 text-xl">
          <span>{{ GetParent.name }}</span>
          <span>{{ GetParent.email }}</span>
        </div>
        <div @click="SideBarActivate" class="cursor-pointer">
          <i class="fa-solid fa-xmark-large absolute left-0 top-0 p-10 text-3xl animate-pulse"></i>
        </div>
      </div>
      <nav class="text-black">
        <ul class="flex flex-col items-center w-full px-10 text-xl">
          <router-link v-for="(route, index) in navRoutes" :key="index" :to="route.to"
                       class="flex items-center justify-between w-full">
            <li class="flex gap-2">
              <p>{{ route.label }}</p>
              <p v-if="route.num" class="text-red-700">({{ route.num }})</p>
            </li>
            <img :src="route.icon" alt="icon">
          </router-link>
          <router-link to="/Darb/Login" @click="logout" class="flex items-center justify-between w-full">
            <li>تسجيل خروج</li>
            <img src="../../../src/assets/Parent/Navbar-profile6.png" alt="icon">
          </router-link>
        </ul>
      </nav>
    </div>
  </transition>
  <div class="dropback w-full h-full z-40 bg-black opacity-30 fixed top-0" v-if="closeSideBar"
       @click="closeSideBar = false"></div>
</template>

<script>
import chatBot from "./chatBot/chat_bot.vue";
import {mapActions, mapGetters} from "vuex";
import Notification from "../../views/Parent/Services/Notification/notification.vue";
import axios from "axios";

export default {
  components: {
    Notification,
    chatBot
  },
  data() {
    return {
      navRoutes: [
        {to: '/Darb/Dashboard', label: 'الرئيسية', icon: '../../../src/assets/Parent/home_553416.png'},
        {to: '/Darb/Requests', label: 'قائمة الطلبات', icon: '../../../src/assets/Parent/request.png'},
        {to: '/Darb/Profile', label: 'الملف الشخصي', icon: '../../../src/assets/Parent/Navbar-profile1.png'},
        {to: '/Darb/Assistant', label: 'الدعم والشكاوي', icon: '../../../src/assets/Parent/Navbar-profile2.png'},
        {to: '/Darb/AI', label: 'الذكاء الاصطناعي', icon: '../../../src/assets/Parent/Navbar-profile4.png'},
      ],
      closeSideBar: false,
      showChatBot: true,
      isHover: false,
      notificationCount: 0
    };
  },
  computed: {
    ...mapGetters(['GetParent'])
  },
  async created() {
    await this.FetchParent();
  },
  methods: {
    ...mapActions(['FetchParent']),
    async logout() {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.post(
            `http://127.0.0.1:8000/api/parent/logout`,{},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );
        console.log(response.data.data)
      } catch (error) {
        throw error;
      }
      sessionStorage.removeItem('token')
    },
    SideBarActivate() {
      this.closeSideBar = !this.closeSideBar;
    },
    updateNotificationCount(count) {
      this.notificationCount = count;
    }
  }
};
</script>

<style scoped>
header {
  background: linear-gradient(to right, #FFFFFF, #ECECEC);
}

.side-bar-head {
  background-image: url('../../assets/Logo/head-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.side-bar {
  font-family: "Kufam", sans-serif;
  user-select: none;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-enter,
.slide-fade-leave {
  transform: translateX(0);
  opacity: 1;
}

a {
  transition: 0.3s ease;
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
}

a:hover {
  background: #F3F3F3;
}
</style>
