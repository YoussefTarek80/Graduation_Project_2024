<template>
  <header data-aos="fade-left" data-aos-duration="2000" class="sm:px-20 px-10 sm:py-5 fixed sm:w-full w-full z-30" :class="{ white: navWhite, small: navSmall, 'shadow-xl': navSmall }">
    <nav class="flex flex-wrap items-center justify-between">
      <div class="flex items-center justify-between">
        <img src="../../assets/LandingPage/Group%2088.png" :class="{ 'small-img': navSmall }" class="sm:w-80 w-52">
      </div>
      <div class="flex flex-wrap items-center justify-center links sm:flex hidden">
        <ul class="flex flex-wrap text-3xl" v-if="!isLoginRoute">
          <li class="mx-10 my-10 sm:w-auto sm:bg-transparent bg-white w-full text-center"><a href="#DarbDetails" @click="smoothScroll">عن درب</a></li>
          <li class="mx-10 my-10 sm:w-auto sm:bg-transparent bg-white w-full text-center"><a href="#about_us" @click="smoothScroll">المميزات</a></li>
          <li class="mx-10 my-10 sm:w-auto sm:bg-transparent bg-white w-full text-center"><a href="#contact_us" @click="smoothScroll">اتصل بنا</a></li>
        </ul>
      </div>
      <div class="buttons sm:flex hidden">
        <button v-if="!isLoginRoute" @click="this.$router.push('/DarbHome/Login')" class="bg-customOrange text-white p-5 w-80 text-3xl rounded-2xl" :class="{ 'small-btn': navSmall }">
          الانضمام الي عالمنا
        </button>
        <button v-if="isLoginRoute" @click="this.$router.push('/DarbHome')" class="bg-customOrange text-white p-5 w-80 text-3xl rounded-2xl" :class="{ 'small-btn': navSmall }">
          الرجوع الي الرئيسية
        </button>
      </div>
      <div class="text-5xl menu-bar sm:hidden block mt-5" @click="toggleMenu" :class="{ 'small-img': navSmall }">
        <i class="fa-light fa-bars"></i>
      </div>
    </nav>

    <div v-if="showMenu" data-aos="fade-in" class="mobile-menu  list-none select-none  flex flex-col items-center bg-white p-10  text-3xl border-2 border-gray-300 rounded-tr-full rounded-br-full rounded-bl-full shadow-2xl mt-2 ">
      <ul class="flex flex-col items-center" v-if="!isLoginRoute">
        <li class="my-5  "><a href="#DarbDetails" @click="smoothScroll; showMenu=false;">عن درب</a></li>
        <li class="my-5 "><a href="#about_us" @click="smoothScroll; showMenu=false;">المميزات</a></li>
        <li class="my-5 "><a href="#contact_us" @click="smoothScroll; showMenu=false;">اتصل بنا</a></li>
      </ul>
      <button v-if="!isLoginRoute" @click="this.$router.push('/DarbHome/Login'); showMenu=false;" class="bg-customOrange text-white  w-52 text-xl rounded-2xl py-2">
        الانضمام الي عالمنا
      </button>
      <button v-if="isLoginRoute" @click="this.$router.push('/DarbHome'); showMenu=false;" class="bg-customOrange text-white w-52 text-xl rounded-2xl py-2">
        الرجوع الي الرئيسية
      </button>
    </div>
  </header>

  <button @click="gotoTop" class="px-5 py-4 bg-customOrange m-10 fixed bottom-0 left-0 rounded-2xl z-50" v-if="ReturnTop" data-aos="fade-in" data-aos-duration="1000">
    <i class="fa-solid fa-arrow-up-long text-white"></i>
  </button>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      navWhite: false,
      navSmall: false,
      ReturnTop: false,
      showMenu: false
    };
  },
  computed: {
    isLoginRoute() {
      return this.$route.path === '/DarbHome/Login' || this.$route.path === '/DarbHome/Support';
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 113.5999984741211) {
        this.navWhite = true;
        this.navSmall = true;
        this.ReturnTop = true;
      } else {
        this.navWhite = false;
        this.navSmall = false;
        this.ReturnTop = false;
      }
      this.showMenu = false;
    },
    smoothScroll(event) {
      event.preventDefault();
      const targetId = event.target.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    },
    gotoTop() {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>

<style scoped>
header {
  font-family: "Rakkas", sans-serif;
  transition: height 0.3s, background-color 0.3s;
}
li {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
li:after{
  content:"";
  display:block;
  height: 4px;
  width:100%;
  background: #FF725E;
  transition: transform 0.3s ease;
  transform: scale(0);
  transform-origin: right;
}
li:hover::after{
  transform: scale(1);

}
.white {
  background: white;
  padding: 0;
  z-index: 10;
}
.small {
  height: 110px;
  padding: 0 10px 0 60px;
}
.small-img {
  transition: transform 0.3s;
  transform: scale(0.6);
}
.small-btn {
  transition: all 0.3s;
  padding: 10px 20px;
  width: 400px;
}

.menu-bar {
  cursor: pointer;
}
@media (max-width: 1300px) {
  .links {
    display: none;
  }
  .buttons {
    display: none;
  }
  .menu-bar {
    display: block;
  }
  .small {
    height: auto;
    padding: 0 10px 0 60px;
  }
  .mobile-menu {
    position: absolute;
    left: 50px;
  }
}
@media (min-width: 1279px) {


}
.mobile-menu {
  width: 80%;
}
</style>
