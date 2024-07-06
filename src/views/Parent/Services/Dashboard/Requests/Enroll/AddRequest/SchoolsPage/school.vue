<template>
  <section class="" data-aos="fade-left">
    <div class="grid sm:grid-cols-2  grid-cols-1 mt-20 bg-customBGCards sm:rounded-full">
      <div class="m-10">
        <select @change="HandleSelectInput(1)"
                v-model="formData.state"
                class="py-3 px-4 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500
                focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 text-gray-700
                 dark:bg-white dark:border-2 dark:border-black dark:border-transparent dark:text-neutral-400 dark:focus:ring-neutral-600 dark:text-neutral-400">
          <option value="" selected disabled>المحافظات</option>
          <option value="الجيزة">الجيزة</option>
        </select>
      </div>
      <div class="m-10">
        <select
            v-model="formData.ad_ID"
            @change="HandleSelectInput(2)"
              :disabled="formData.checked"
            class="py-3 px-4 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500
                focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 text-gray-700
                 dark:bg-white dark:border-2 dark:border-black dark:border-transparent dark:text-neutral-400 dark:focus:ring-neutral-600 dark:text-neutral-400">
          <option value="" selected disabled>الادارات</option>
          <option v-for="ad in getAllAdminstrations" :key="ad.id" :value="ad.id">
            {{ ad.name }}
          </option>

        </select>
      </div>
    </div>
    <div class="m-10">
      <div class="flex items-center justify-between">
        <div>
          <span class="text-3xl">المدارس</span>
        </div>
        <div class=" rounded-2xl text-customDarkPurple text-xl font-bold cursor-pointer" v-if="formData.showToggle">
          <div v-if="!best" @click="GetRecommendedSchools">
            <a  @click="best=!best" v-if="GetAllSchools">عرض افضل مدارس</a>
          </div>
          <div v-if="best" @click="GetAllSchools">
            <a @click="best=!best">عرض كل مدارس</a>
          </div>
        </div>
      </div>
      <div class="cards grid sm:grid-cols-3 grid-cols-1" v-if="best">
        <div
            class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg  dark:border-gray-700 sm:m-10 mt-10"
            v-for="(card,index) in getBestSchools" :key="card.id">
          <div class=" m-5 flex items-center justify-end gap-4">
            <div class="flex items-center gap-2 CustomAnimate">
              <span> اختر من هنا</span>
              <i class="fa-duotone fa-arrow-left"></i>
            </div>
            <div class="checkbox-wrapper">
              <input type="checkbox" @change="GetSchoolID(card.id, $event.target.checked,index)"
                     :checked="formData.SchoolIDs.includes(card.id)">
              <svg viewBox="0 0 35.6 35.6">
                <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
              </svg>
            </div>
          </div>
          <div class="px-5 pb-5">
            <a href="#">
              <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{{ card.name }}</h5>
            </a>
            <div class="mt-10">
               <span class="text-black ">
                  {{ card.description }}
               </span>
            </div>
            <div class="flex items-center mt-2.5 mb-5">
              <div class="flex items-center space-x-1 rtl:space-x-reverse">

              </div>
              <span
                  class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{{ card.rank }}</span>
            </div>
            <div class="flex items-center justify-between cursor-pointer">
              <a class=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">عرض
                التفاصيل</a>
            </div>
          </div>
        </div>
      </div>

      <div class="cards grid sm:grid-cols-3 grid-cols-1" v-if="!best">
        <div
            class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg  dark:border-gray-700 sm:m-10 mt-10"
            v-for="(card,index) in getAllSchools" :key="card.id">
          <div class=" m-5 flex items-center justify-end gap-4">
            <div class="flex items-center gap-2 CustomAnimate">
              <span> اختر من هنا</span>
              <i class="fa-duotone fa-arrow-left"></i>
            </div>
            <div class="checkbox-wrapper">
              <input type="checkbox" @change="GetSchoolID(card.id, $event.target.checked,index)"
                     :checked="formData.SchoolIDs.includes(card.id)">
              <svg viewBox="0 0 35.6 35.6">
                <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
              </svg>
            </div>
          </div>
          <div class="px-5 pb-5">
            <a href="#">
              <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{{ card.name }}</h5>
            </a>
            <div class="mt-10">
               <span class="text-black ">
                  {{ card.description }}
               </span>
            </div>
            <div class="flex items-center mt-2.5 mb-5">
              <div class="flex items-center space-x-1 rtl:space-x-reverse">
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor" viewBox="0 0 22 20">
                  <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor" viewBox="0 0 22 20">
                  <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor" viewBox="0 0 22 20">
                  <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor" viewBox="0 0 22 20">
                  <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
              </div>
              <span
                  class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
            </div>
            <div class="flex items-center justify-between cursor-pointer">
              <a class=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">عرض
                التفاصيل</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import axios from "axios";

export default {
  props: ['formData'],
  data() {
    return {
      best:false,
      showToggle:false
    }
  },
  watch: {
    formData: {
      handler(newValue) {
        this.$emit('validate');
      },
      deep: true
    }
  },
  async created() {
    await this.FetchAdminstrations(this.formData.state)
    await this.FetchSchools(this.formData.ad_ID);
  },
  mounted() {

  },
  computed: {
    ...mapGetters(['getAllAdminstrations', 'getAllSchools','getBestSchools']),
  },
  methods: {
    ...mapActions(['FetchAdminstrations', 'FetchSchools',"FetchBestSchools"]),
    async HandleSelectInput(num) {
      this.formData.SchoolIDs = [];
      this.formData.selectIndexSchools = [];
      if (num === 1) {
        this.formData.checked = false;
        await this.FetchAdminstrations(this.formData.state)
        console.log(this.getAllAdminstrations)
      } else if (num === 2) {
        await this.FetchSchools(this.formData.ad_ID)
        this.formData.showToggle=true
        console.log(this.getAllSchools)
      }
    },
    GetSchoolID(schoolID, Checked, index) {
      if (Checked) {
        if (!this.formData.SchoolIDs.includes(schoolID)) {
          this.formData.SchoolIDs.push(schoolID);
          this.formData.selectIndexSchools.push(index);
        }
      } else {
        const indexToRemove = this.formData.SchoolIDs.indexOf(schoolID);
        if (indexToRemove !== -1) {
          this.formData.SchoolIDs.splice(indexToRemove, 1);
          const selectIndexToRemove = this.formData.selectIndexSchools.indexOf(index);
          if (selectIndexToRemove !== -1) {
            this.formData.selectIndexSchools.splice(selectIndexToRemove, 1);
          }
        }
      }
      console.log(this.formData.SchoolIDs);
    },
    async GetRecommendedSchools(){
      try{
        await this.FetchBestSchools(this.formData.ad_ID);
      }catch (err){
      }
    },
    async GetAllSchools(){
      try{
        await this.FetchSchools(this.formData.ad_ID);
      }catch (err){
      }
    }
  }
}
</script>

<style scoped>
@import "../../../../../../../../UI/CustomsCss/Custombutton.css";
@import url("schools.css");
</style>