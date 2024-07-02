<template>
  <Navbar-view></Navbar-view>
  <section data-aos="fade-left" data-aos-duration="1000" class="px-20 py-10">
    <div class="flex flex-col ">
      <span class="sm:text-4xl text-2xl text-customDarkPurple">اضافة تذكرة</span>
      <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink"></i>
    </div>
    <div class="grid sm:grid-cols-2 grid-cols-1 items-center ">
      <div class="flex flex-col my-10">
        <div class="inputGroup sm:w-full w-96 ">
          <input class="" type="text" required="" autocomplete="off" v-model="nationalId">
          <label for="">ادخال الرقم القومي لطفلك</label>
        </div>
        <div class=" flex flex-col ">
          <div class=" sm:w-full w-96 my-10">
            <label for="" >ادخل الموضوع :</label>
            <input type="text" v-model="description" required="" autocomplete="off" class="mx-5 border-2 border-gray-300 rounded-2xl p-3">
          </div>
          <div class=" sm:w-full w-96">
            <label for="">ادخل رسالتك بالتفصيل :</label>
            <textarea class="h-96 resize-none mt-5" type="text" v-model="message" required="" autocomplete="off"></textarea>

          </div>
        </div>
        <div class="flex items-center justify-center mt-3">
          <button class="w-96" @click="AddQuestion(message)">
            ارسال التذكرة
          </button>
        </div>
      </div>
      <div class="animate-pulse">
        <img src="../../../../../../assets/Parent/support.png">
      </div>
    </div>
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