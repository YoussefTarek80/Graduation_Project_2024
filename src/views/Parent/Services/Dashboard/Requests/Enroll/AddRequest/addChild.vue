<template>
  <base-teleport :show="timeExpire" class="flex">
      <span>انتهاء الصلاحية</span>
    <div>
      <button @click="refresh">تحديث الصفحة</button>
    </div>
  </base-teleport>
  <section class="my-10 mx-10 relative">
    <div class="progressBar flex flex-wrap items-center justify-center sm:gap-20 pt-24 sm:pt-0">
      <div :class="{ 'active': currentStep === 1 || currentStep === 2  }"
           class="step flex flex-col items-center">
        <span class="dot"></span>
        <span class="dot_label">بيانات الطفل</span>
      </div>
      <div :class="{ 'active': currentStep === 2  }" class="step flex flex-col items-center">
        <span class="dot w-80 h-5"></span>
        <span class="dot_label"> المزيد من البيانات</span>
      </div>
    </div>
    <div v-if="currentStep === 1">
      <ChildInfo :formData="formData"></ChildInfo>
    </div>
    <div v-if="currentStep === 2">
      <SchoolsInfo :formData="formData" @validchild="validData"> </SchoolsInfo>
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
import ChildInfo from "./ChildPage/child.vue"
import SchoolsInfo from "./SchoolsPage/school.vue"
import {mapActions} from "vuex";
import BaseTeleport from "../../../../../../../UI/BaseTeleport.vue";

export default {
  components: {
    BaseTeleport,
    ChildInfo,
    SchoolsInfo,
  },
  data() {
    return {
      currentStep: parseInt(localStorage.getItem('currentStep')) || 1,
      totalSteps: 2,
      invalid: true,
      formData: JSON.parse(localStorage.getItem('formData')) || {
        selectedIndex: null,
        selected: false,
        name: '',
        nationality:'',
        country:'',
        stateRegion:'',
        type:'',
        religion:'',
        state: "",
        ad_ID: "",
        gender: null,
        childbirth_certificate: null,
        birthdate: null,
        image: null,
        age: 0,
        ChImage: null,
        avatar: null,
        requestTime: null,
        requestDate: null,
        SchoolIDs: [],
        checked: true,
        selectIndexSchools: [],
        std_nationalID:'',
        best: true,
      },
      timeExpire:false,
    }
  },
  mounted() {
    this.startTimer();
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
  computed: {},
  methods: {
    ...mapActions(['AddRequest']),
    validData() {
      if (
          this.formData.name === "" ||
          this.formData.gender === null ||
          this.formData.age === 0 ||
          this.formData.childbirth_certificate === null ||
          this.formData.ChImage === null ||
          this.formData.avatar=== null ||
          this.formData.religion === '' ||
          this.formData.std_nationalID===''||
          this.formData.nationality===''||
          !this.formData.SchoolIDs.length>0
      ) {
        this.invalid = true;
      } else {
        this.invalid = false;
      }
    },
    async Signup() {
      try {
        const form = new FormData();
        form.append('name', this.formData.name);
        form.append('gender', this.formData.gender);
        form.append('birthdate', this.formData.age);
        form.append('childbirth_certificate', this.formData.childbirth_certificate);
        form.append('image', this.formData.image);
        form.append('religion', this.formData.religion);
        form.append('student_national_id', parseInt(this.formData.std_nationalID));
        form.append('nationality', this.formData.nationality);
        form.append('country', this.formData.country);
        form.append('state', this.formData.stateRegion);
        form.append('type', this.formData.type);

        this.formData.SchoolIDs.forEach((schoolId) => {
          form.append('schools[]', schoolId);
        });
        await this.AddRequest(form);
        localStorage.removeItem('currentStep');
        localStorage.removeItem('formData');
        this.$router.push('/Darb/Dashboard/Children');
      } catch (err) {
        console.log(err);
      }
    },
    nextStep() {
      this.currentStep++;
      localStorage.setItem('currentStep', this.currentStep.toString());
      this.validData();
      console.log(this.formData);
    },
    prevStep() {
      this.currentStep--;
      localStorage.setItem('currentStep', this.currentStep.toString());
      this.validData();
      console.log(this.formData);
    },
    startTimer() {
      setTimeout(() => {
        console.log('Session Expire');
        localStorage.removeItem('formData');
        localStorage.removeItem('currentStep');
        this.timeExpire = true;
      }, 160000);
    },
    refresh(){
      this.timeExpire=false;
      location.reload();

    },
    convertImageToBase64(imageFile) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(imageFile);
      });
    },
  },
}
</script>

<style scoped>
@import "../../../../../../../UI/CustomsCss/Custombutton.css";

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
