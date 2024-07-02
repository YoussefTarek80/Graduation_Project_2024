<template>
  <NavBar_View></NavBar_View>
  <section class="p-10 " data-aos="fade-left" data-aos-duration="1000" bg-l>
    <BaseTeleport :show="success">
      <div class="flex flex-col items-center justify-center">
              <span class="text-green-600">
        تم التعديل بنجاح
      </span>
        <i class="fa-sharp fa-solid fa-badge-check text-green-600 text-6xl"></i>
      </div>

    </BaseTeleport>
    <div class="flex flex-col">
      <span class="text-5xl  text-customDarkPurple px-5 py-3 rounded-2xl flex items-center gap-2 m-10">  <i class="fa-duotone fa-sparkles"></i> الملف الشخصي </span>

    </div>
    <div class="shadow-2xl  rounded-2xl my-20 flex flex-col flex-row-reverse justify-between data ">
      <div class="flex items-center justify-center head rounded-2xl">
        <img src="../../../assets/Logo/Profile.png" class="w-72 animate-bounce ">
      </div>
      <div class="grid grid-cols-2 p-10">
        <div class="m-5 ">
          <div class="flex flex-col flex-wrap  ">
            <div class="flex flex-col  ">
              <div class="inputGroup2 sm:w-full w-96 ">
                <input type="text" required="" autocomplete="off" v-model="GetParent.name" readonly>
                <label for="">اسم الوالد</label>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="inputGroup2 sm:w-full w-96 ">
                <input type="text" required="" autocomplete="off" readonly v-model="GetParent.email">
                <label for="">البريد الاكتروني</label>
              </div>
            </div>
          </div>
        </div>
        <div class="m-5 ">
          <div class="flex flex-col flex-wrap ">
            <div class="flex flex-col ">
              <div class="inputGroup sm:w-full w-96 ">
                <input type="text" required="" autocomplete="off" v-model="GetParent.address" @input="validData">
                <label for="">العنوان</label>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="inputGroup sm:w-full w-96 ">
                <input type="date" required="" autocomplete="off" v-model="GetParent.birthdate" @input="validData">
                <label for="">تاريخ الميلاد</label>
              </div>
            </div>
          </div>
        </div>
        <div class="m-5 ">
          <div class="flex flex-col flex-wrap  ">
            <div class="inputGroup2 sm:w-full w-96 ">
              <input type="text" required="" autocomplete="off" readonly v-model="GetParent.national_id">
              <label for="">الرقم القومي</label>
            </div>
            <div class="flex flex-col flex-wrap  ">
              <div class="inputGroup sm:w-full w-96 ">
                <input type="text" required="" autocomplete="off" v-model="GetParent.phone" @input="validData">
                <label for="">رقم الهاتف</label>
              </div>
            </div>
          </div>
        </div>
        <div class="m-5 flex items-center justify-center drop-shadow-2xl relative   rounded-3xl">
          <div  :class="{blur: Unblur}"  >
            <img src="../../../assets/Parent/image%2043.png" class="w-96">
          </div>
          <div class="text-5xl absolute cursor-pointer" @click="this.show=true" v-if="Unblur">
              <i class="fa-sharp fa-solid fa-eye-low-vision"></i>
          </div>
          <base-teleport :show="show">
            <div class="generated_PIN">
              <div class="generated_PIN">
                الرقم التاكيدي :
                {{ pin }}
              </div>
            </div>
            <form @submit.prevent="showImage">
              <div class="3_boxes flex items-center justify-center m-10">
                <input class="border-2 border-gray-300 rounded-2xl w-full h-20 text-center mx-7" v-model="pinNumbers" placeholder="اكتب الرقم مرة اخري هنا">
              </div>
              <div class="m-10 ">
                <button class="w-72" >
                  اظهر
                </button>
                <button class="w-32 mx-7"  @click="show=false">
                  الغاء
                </button>
              </div>
            </form>
          </base-teleport>
        </div>
      </div>
      <div class="flex items-center justify-start  p-10">
        <button class="w-80 mx-10" @click="updateProfile" :class="{ disabledBtn: invalid }"
                :disabled="invalid">
          تعديل
        </button>
        <button class="w-52" @click="this.$router.push('/Darb/Dashboard')">
          الغاء
        </button>
      </div>
    </div>
    <div class="shadow-2xl px-20 py-10  ">
      <span class="text-3xl  text-customDarkPurple px-5 py-3 rounded-2xl flex items-center gap-2 ">  <i class="fa-duotone fa-sparkles"></i> اطفالي التي تم قبولهم في المدارس </span>
      <div class="student p-10 flex flex-wrap items-center justify-center">
        <div class="flex flex-col w-3/12 shadow-2xl p-5 m-5 rounded-2xl" v-for="student in getChildren">
          <div class="flex items-center  p-10">
            <img :src="student.image" class="rounded-full p-2 border-2 border-gray-300 w-96">
          </div>
          <span class=" text-center  text-xl" >
            <p>
              {{ student.name }}
            </p>
          </span>
          <span class="text-center  text-xl">
            <p class="">
              {{ student.national_id }}
            </p>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import NavBar_View from "../../../components/Parent/NavBar.vue"
import {mapActions, mapGetters} from "vuex";
import BaseTeleport from "../../../UI/BaseTeleport.vue";

export default {
  components: {
    BaseTeleport,
    NavBar_View
  },
  computed: {
    ...mapGetters(['GetParent','getChildren'])
  },
  data() {
    return {
      invalid: false,
      success: false,
      show:false,
      pin:"",
      Unblur:true,
      pinNumbers:""
    };
  },
  async created() {
    await this.FetchParent();
    await this.ShowChildren();
    console.log(this.getChildren)
  },
  mounted() {
    this. generatePIN();
  },
  methods: {
    ...mapActions(['FetchParent', 'UpdateProfile','ShowChildren']),
    validData() {
      if (this.GetParent.birthdate === '' || this.GetParent.phone === '' || this.GetParent.address === '') {
        this.invalid = true;
      } else {
        this.invalid = false;
      }
    },
    async updateProfile() {
      try {
        const formData = new FormData();
        formData.append('phone', this.GetParent.phone);
        formData.append('address', this.GetParent.address);
        formData.append('birthdate', this.GetParent.birthdate);
        await this.UpdateProfile(formData);
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 1000)
      } catch (err) {
        console.log(err)
      }
    },
    generatePIN() {
      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);
      const num3 = Math.floor(Math.random() * 10);
      this.pin = `${num1}${num2}${num3}`;
    },
    showImage(){
      this.show=false
      if (this.pinNumbers === this.pin) {
        console.log("Correct PIN");
        this.Unblur=false
      } else {
        console.log("Incorrect PIN");
        this.Unblur=true
      }
    }
  }
}
</script>
<style scoped>
@import "./profile.css";
@import "../../../UI/CustomsCss/CustomParentInput.css";
@import "../../../UI/CustomsCss/Custombutton.css";
</style>