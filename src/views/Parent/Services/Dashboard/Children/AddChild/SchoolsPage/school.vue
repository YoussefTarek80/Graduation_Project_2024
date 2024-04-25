<template>
  <section class="" data-aos="fade-left">
    <div class="grid sm:grid-cols-2  grid-cols-1 mt-20 bg-customBGCards sm:rounded-full">
      <div class="m-10 ">
        <select @change="checked=false" class="py-3 px-4 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500
                focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 text-gray-700
                 dark:bg-white dark:border-2 dark:border-black dark:border-transparent dark:text-neutral-400 dark:focus:ring-neutral-600 dark:text-neutral-400">
          <option selected disabled>المحافظات</option>
          <option>محافظة 1</option>
        </select>
      </div>
      <div class="m-10">
        <select :disabled="checked" class="py-3 px-4 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500
                focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 text-gray-700
                 dark:bg-white dark:border-2 dark:border-black dark:border-transparent dark:text-neutral-400 dark:focus:ring-neutral-600 dark:text-neutral-400">
          <option selected disabled>الادارات</option>
          <option>ادارة 1</option>
          <option> ادارة 2 </option>
          <option>ادارة 3</option>
        </select>
      </div>
    </div>
    <div class="m-10">
      <span class="text-3xl">المدارس</span>
      <div class="cards grid sm:grid-cols-3 grid-cols-1">
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg  dark:border-gray-700 sm:m-10 mt-10"
        v-for="card in cards"  :key="card.id">
          <a href="#">
            <img class="p-8 rounded-t-lg" src="" alt="product image" />
          </a>
          <div class="px-5 pb-5">
            <a href="#">
              <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{{card.name}}</h5>
            </a>
            <div class="mt-10">
               <span class="text-black ">
                  {{card.description}}
               </span>
            </div>

            <div class="flex items-center mt-2.5 mb-5">
              <div class="flex items-center space-x-1 rtl:space-x-reverse">
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
              </div>
              <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
            </div>
            <div class="flex items-center justify-between cursor-pointer">
              <a  class=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">عرض التفاصيل</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return{
      cards:[
        {
          name:'ابن حزم الخاصة',
          description:'هذة المدرسة مخصصه لذوي الاحتياجات الخاصة'
        },
        {
          name:'الفاروق الخاصة',
          description:'هذة المدرسة مخصصه لذوي الاحتياجات الخاصة'
        },
        {
          name:'الفاروق الخاصة',
          description:'هذة المدرسة مخصصه لذوي الاحتياجات الخاصة'
        },
        {
          name:'الفاروق الخاصة',
          description:'هذة المدرسة مخصصه لذوي الاحتياجات الخاصة'
        },
        {
          name:'الفاروق الخاصة',
          description:'هذة المدرسة مخصصه لذوي الاحتياجات الخاصة'
        },
        {
          name:'الفاروق الخاصة',
          description:'هذة المدرسة مخصصه لذوي الاحتياجات الخاصة'
        },

      ],checked:true
    }
  }
}
</script>

<style scoped>
@import "../../../../../../../UI/CustomsCss/Custombutton.css";
</style>