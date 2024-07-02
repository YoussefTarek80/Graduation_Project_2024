<template>
  <section class="my-10 mx-10 relative">
    <div class="progressBar flex flex-wrap items-center justify-center sm:gap-20 pt-24 sm:pt-0">
      <div :class="{ 'active': currentStep === 1 || currentStep === 2 || currentStep === 3 }"
           class="step flex flex-col items-center">
        <span class="dot"></span>
        <span class="dot_label">بيانات الاب / الام</span>
      </div>
      <div :class="{ 'active': currentStep === 2 || currentStep === 3  }" class="step flex flex-col items-center">
        <span class="dot w-80 h-5"></span>
        <span class="dot_label"> المزيد من البيانات</span>
      </div>
    </div>
    <div v-if="currentStep === 1">
      <parentInfo :formData="formData"  @update-lat-lng="handleUpdateLatLng"></parentInfo>
    </div>
    <div v-if="currentStep === 2">
      <MoreParentInfo :formData="formData"></MoreParentInfo>
    </div>

    <div class="mx-20">
      <a @click="prevStep()" v-if="currentStep > 1"
         class="text-2xl flex items-center gap-2 mt-10 text-customLightPurple absolute sm:-top-7 top-4  right-0 animate-left cursor-pointer">
        <i class="fa-sharp fa-light fa-arrow-left fa-rotate-180"></i>
        <span>الخطوة السابقة</span>
      </a>
      <a @click="nextStep()" v-if="currentStep < totalSteps"
         class="text-2xl flex items-center gap-2 mt-10 text-customLightPurple absolute sm:-top-7 -top-8  left-0 animate-left cursor-pointer">
        <span>الخطوة التالية</span>
        <i class="fa-sharp fa-light fa-arrow-left"></i>
      </a>
      <div class="absolute -top-7 left-0 m-5">
        <button @click="Signup" v-if="currentStep === totalSteps" class="w-60 flex items-center justify-around"
                :class="{ disabledBtn: invalid }"
                :disabled="invalid">
          <span>ارسال البيانات </span>
          <i class="fa-sharp fa-light fa-arrow-left"></i>
        </button>
      </div>

    </div>
  </section>
</template>

<script>
import parentInfo from "./ProgressBar/ParentPage/parent.vue"
import ChildInfo from "../../../Services/Dashboard/Requests/Enroll/AddRequest/ChildPage/child.vue"
import SchoolsInfo from "../../../Services/Dashboard/Requests/Enroll/AddRequest/SchoolsPage/school.vue"
import MoreParentInfo from "./ProgressBar/MoreParentInfo/MparentInfo.vue"
import {mapActions} from "vuex";

export default {
  components: {
    parentInfo, ChildInfo, SchoolsInfo, MoreParentInfo
  },
  data() {
    return {
      currentStep: parseInt(localStorage.getItem('currentStep')) || 1,
      totalSteps: 2,
      invalid: true,
      formData: JSON.parse(localStorage.getItem('formData')) || {
        selectedIndex: null,
        selected: false,
        country: 'الدولة',
        name: '',
        gender: null,
        nationalId: '',
        nationalIdImg: null,
        address: '',
        phoneNumber: '',
        email: '',
        password: '',
        EducationalDegreeImg: null,
        birthdate: null,
        NaImage:null,
        religion:'',
        nationality:'',
        lat:0,
        lng:0,
        job:""
      }
    }
  },
  mounted() {

  },
  watch: {
    formData: {
      handler(newValue) {
        localStorage.setItem('formData', JSON.stringify(newValue));
        this.validData()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['ParentRegister']),
    handleUpdateLatLng(coords) {
      this.formData.lat = coords.lat;
      this.formData.lng = coords.lng;
      console.log(this.formData.lat,this.formData.lng)
    },
    validData() {
      if (
          this.formData.name === null ||
          this.formData.gender === null ||
          this.formData.nationalId === '' ||
          this.formData.nationalIdImg === null ||
          this.formData.address === '' ||
          this.formData.phoneNumber === '' ||
          this.formData.email === null ||
          this.formData.password === '' ||
          this.formData.EducationalDegreeImg === null ||
          this.formData.birthdate === 0||
          this.formData.lat === 0||
          this.formData.lng === 0||
          this.formData.job===""
      ) {
        this.invalid = true;
      } else {
        this.invalid = false;
      }
    },
    async Signup() {
      try {
        const formData = new FormData();
        formData.append('name', this.formData.name);
        formData.append('gender', this.formData.gender);
        formData.append('email', this.formData.email);
        formData.append('password', this.formData.password);
        formData.append('phone', this.formData.phoneNumber);
        formData.append('address', this.formData.address);
        formData.append('lat', this.formData.lat);
        formData.append('lng', this.formData.lng);
        formData.append('job', this.formData.job);
        formData.append('national_id', this.formData.nationalId);
        formData.append('national_id_image', this.formData.nationalIdImg);
        formData.append('birthdate', this.formData.birthdate);
        formData.append('religion', this.formData.religion);
        formData.append('nationality', this.formData.nationality);
        await this.ParentRegister(formData);

        localStorage.removeItem('currentStep');
        localStorage.removeItem('formData');
        this.$router.push('/Darb/Login');
      } catch (err) {
        console.log(err);
      }
    },
    nextStep() {
      this.currentStep++;
      localStorage.setItem('currentStep', this.currentStep.toString());
      this.validData()
      console.log(this.formData)
    },
    prevStep() {
      this.currentStep--;
      localStorage.setItem('currentStep', this.currentStep.toString());
      this.validData()
      console.log(this.formData)
    },

  }
}
</script>

<style scoped>
@import "../../../../../UI/CustomsCss/Custombutton.css";

.progressBar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.step {
  position: relative;
}

.dot {
  width: 200px;
  height: 10px;
  background-color: gray;
  border-radius: 9999px;
  margin: 10px;
}

.active .dot {
  background-color: #A342A5;
}

.active .dot_label {
  color: #A342A5;
  font-weight: bold;
}

@keyframes moveLeft {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10%);
  }
  100% {
    transform: translateX(0);
  }
}

.animate-left {
  animation: moveLeft 1s linear infinite;
}
</style>
