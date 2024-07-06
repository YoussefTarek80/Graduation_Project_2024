<template>
  <div  class="sm:w-10/12  h-screen  w-full mx-auto my-auto flex items-center justify-center ">
    <img  src="../../assets/LandingPage/darbbb.gif" class="">
  </div>
</template>

<script >
export default {
  name: 'ConvertPage',
  mounted() {
    setTimeout(() => {
      this.$router.push('/Darb/Dashboard');
    }, 3000);
  }
};
</script>

<style scoped>
@media (max-width: 1278px) {
  img{
    width:800px;

  }

}
</style>