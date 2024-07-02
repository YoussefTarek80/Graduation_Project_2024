<template>
  <div class="sm:p-10 flex sm:flex-nowrap flex-wrap justify-around  ">
    <div class="flex flex-col items-center justify-center sm:text-xl text-2xl sm:w-auto w-full">
      <div>
        <span class="font-bold text-3xl">فيديو توضيحي عن منظمتنا التعليمية</span>
        <span class="w-10 bg-customOrange h-1 block"></span>
      </div>
      <ol style="list-style-type: disc;" class="mr-10 text-xl">
        <li class="p-5">ما هو درب؟</li>
        <li class="p-5">لماذا النظام التعليمي درب؟</li>
        <li class="p-5">لماذا ينصح بهذا النظام التعليمي ؟</li>
      </ol>
      <img src="../../../../../assets/Parent/left-arrow_11390312.png" class="w-64 CustomAnimate sm:block hidden">
    </div>
      <video class="rounded-2xl border-dashed border-2 p-5 border-customOrange" width="750"  type="video/mp4" controls src="../../../../../assets/Parent/invideo-ai-1080%20مسار%20تعليمي%20مميز_%20تعليم%20بلا%20حدود!%202024-05-11.mp4">
      </video>
  </div>
</template>
<script>
</script>
<style scoped>
.CustomAnimate{
  animation: bounce 3s infinite;
}
@keyframes bounce {
  0%, 100% {
    transform: translateX(-10%);

  }
  50% {
    transform: translateX(0);

  }
}
</style>