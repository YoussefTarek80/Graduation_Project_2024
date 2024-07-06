<template>
  <NavBar_View></NavBar_View>
  <section class="px-10" data-aos="fade-left" data-aos-duration="1000">
    <div class="p-10">
      <div class="RequestsList mt-10" >
        <div class="flex flex-col">
          <span class="sm:text-5xl text-2xl text-customDarkPurple">قائمة الطلبات </span>
          <i
              class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-4"
          ></i>
        </div>
        <div class=" flex flex-wrap items-center justify-center text-2xl ">
          <div
              class="flex  card shadow-xl flex-col items-center justify-evenly card w-80 h-60 bg-gray-200 m-10 rounded-bl-2xl rounded-tr-2xl rounded-tl-xl"
              v-for="card in cards" :key="card.id">
            <div class="flex flex-row-reverse justify-evenly w-full">
              <div>
                <img :src="card.img" class="w-24">
              </div>
              <div class="flex flex-col items-center ">
                <span class="text-customDarkPurple text-center text-3xl">{{ card.name }}</span>
                <span class="text-4xl my-5" v-if="card.number">{{ card.number }}</span>
                <i v-if="!card.number" class="fa-sharp fa-light fa-spinner-scale fa-spin text-4xl my-5"></i>
              </div>

            </div>
            <router-link :to="card.to"
                         class="rounded-bl-2xl rounded-tr-2xl rounded-tl-2xl p-2 w-10/12 text-center text-white ">
              {{ card.buttonText }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
  <chatBot :show="true"></chatBot>
</template>
<script>
import NavBar_View from "../../../../../components/Parent/NavBar.vue";

import {mapActions, mapGetters} from "vuex";
import chatBot from "../../../../../components/Parent/chatBot/chat_bot.vue";
import Darb_video from "../../Dashboard/DarbDeatils/Darb_deatils.vue";

export default {
  components: {
    chatBot,
    NavBar_View,
    Darb_video
  },
  data() {
    return {
      cards: [
        {
          name: "تقديم طالب",
          number: 0,
          to: '/Darb/Dashboard/Children',
          img: "../../src/assets/Parent/kids_7457051.png",
          buttonText: 'عرض'
        },
        {
          name: "تحويل طالب",
          number: 0,
          to: '/Darb/Dashboard/Transfer',
          img: "../src/assets/Parent/transfer-data_9156266.png",
          buttonText: 'عرض'
        },
        {
          name: "سحب ملف طالب",
          number:0,
          to: '/Darb/Dashboard/Withdraw',
          img:"../src/assets/Parent/folder_5520048.png",
          buttonText: 'عرض'
        },
        {
          name: " المناسبات",
          number:0,
          to: '/Darb/ShowGrade/Events',
          img:"../src/assets/Parent/calendar_1968790.png",
          buttonText: 'عرض'
        },
        {
          name: " نتائج الطالب",
          number: 0,
          to: '/Darb/ShowGrade',
          img:"../src/assets/Parent/certificate_287688.png",
          buttonText: 'عرض'
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getRequests','getChildren']),
  },
  async created() {
    await this.FetchRequests();
    await this.ShowChildren();
    this.getLens();
  },
  methods: {
    ...mapActions(['FetchRequests','ShowChildren']),
    getLens() {
      this.cards.forEach((card, index) => {
        let targetNumber;
        if (index === 0) {
          targetNumber = this.getRequests.length;
        } else if (index === 1 || index === 2 || index === 4) {
          targetNumber = this.getChildren.length;
        }

        if (targetNumber !== undefined) {
          this.incrementCardNumber(card, targetNumber);
        }
      });
    },
    incrementCardNumber(card, targetNumber) {
      let incrementInterval = setInterval(() => {
        if (card.number < targetNumber) {
          card.number++;
        } else {
          clearInterval(incrementInterval);
        }
      }, 100);
    }
  }
}
</script>
<style scoped>
@import url('../../../../../UI/CustomsCss/Custombutton.css');
@import url('./Requests.css');
</style>