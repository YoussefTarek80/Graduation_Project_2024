
<template>
  <div
      class="absolute left-1 z-50 bg-white shadow-lg rounded-lg w-96  h-52 text-black text-center flex flex-col overflow-auto"
      data-aos="fade-in"
  >
    <div class="notify flex flex-col items-start justify-start p-5 gap-1 border-b-gray-100 border-2">
      <div class="flex items-center justify-between w-full">
        <span class="self-start text-2xl text-customDarkPurple font-bold">اشعار جديد</span>
        <i class="fa-thin fa-circle-xmark"></i>
      </div>
      <span class="hover:bg-gray-100 transition-all cursor-pointer p-3 text-start">تم ارسال اشعار جديد من قبل مدرسة ابن حزم الخاصه</span>
    </div>
    <div class="notify flex flex-col items-start justify-start p-5 gap-1">
      <div class="flex items-center justify-between w-full">
        <span class="self-start text-2xl text-customDarkPurple font-bold">اشعار جديد</span>
        <i class="fa-thin fa-circle-xmark"></i>
      </div>
      <span class="hover:bg-gray-100 transition-all cursor-pointer p-3 text-start">تم ارسال اشعار جديد من قبل مدرسة ابن حزم الخاصه</span>
    </div>
  </div>
</template>
<script >
export default {
  data(){
    return{
      isHover:false
    }
  }
}
</script>


<style scoped>

</style>