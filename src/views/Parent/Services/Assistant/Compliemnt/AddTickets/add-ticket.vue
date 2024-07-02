<template>
  <Navbar-view></Navbar-view>
  <section data-aos="fade-left" data-aos-duration="1000" class="px-20 py-10">

  </section>
</template>
<script>
import {defineComponent} from "vue";
import NavbarView from "../../../../../../components/Parent/NavBar.vue";
import {mapGetters} from "vuex";

export default defineComponent({
  components: {NavbarView},
  inject: ['support'],
  data() {
    return {
      supportQuestionsID: 0,
      message: '',
      description: '',
      nationalId: ''
    }
  },
  computed: {
    ...mapGetters([''])
  },
  methods: {
    AddQuestion(message) {
      try {
        this.support[this.supportQuestionsID++] = {question: message, answer: "", desc: this.description};
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 2000)
      } catch (err) {
        console.log(err)
      }
      // console.log(this.support);
    },
  }
})
</script>
<style scoped>
@import url('../../../../../../UI/CustomsCss/CustomParentInput.css');
@import url('../../../../../../UI/CustomsCss/Custombutton.css');
</style>