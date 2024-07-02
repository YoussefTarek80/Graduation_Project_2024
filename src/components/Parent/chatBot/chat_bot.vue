<template>
  <div class="chatPart fixed bottom-0 m-10 animate-bounce z-20 cursor-pointer" @click="navigateToAI" v-if="show">
      <img src="../../../assets/Parent/chatbot.png" class="w-20" v-if="AiShow" data-aos="fade-left">
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  data(){
    return{
      AiShow:false
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
      if (window.scrollY > 199.1999969482422) {
        this.AiShow=true
      }
      else{
        this.AiShow=false
      }
    },
    navigateToAI() {
      this.$router.push('/Darb/AI');
    }
  }
}
</script>

<style scoped>

</style>