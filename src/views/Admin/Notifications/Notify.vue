<template>
  <Navbar_Component></Navbar_Component>
  <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
    <div class="flex flex-col">
      <span class="sm:text-3xl text-2xl"> قائمة الاشعارات (1)</span>
      <i
          class="fa-regular fa-horizontal-rule fa-2xl text-customPink"
      ></i>
    </div>
    <div class="flex flex-col">
      <div class="flex flex-col border-2 border-black w-80 mt-20 p-5 rounded-2xl shadow-2xl">
        <span>من : manager@gmail.com</span>
        <span>الي : youssef@gmail.com</span>
        <div class="mt-10">
          <span>الموضوع :</span>
          <p class="mt-4">First Notify In this section</p>
        </div>
      </div>
    </div>
  </section>
  <Footer_Component></Footer_Component>
</template>
<script >

</script>
<style scoped>
@import url("../../../UI/CustomsCss/Custombutton.css");
</style>