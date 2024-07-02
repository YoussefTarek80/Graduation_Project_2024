<template>
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
      <SchoolsInfo :formData="formData"></SchoolsInfo>
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
        <button @click="UpdateChild(request.id)" v-if="currentStep === totalSteps" class="w-60 flex items-center justify-around"
                :class="{ disabledBtn: invalid }"
                :disabled="invalid"
        >
          <span>حفظ البيانات </span>
          <i class="fa-sharp fa-light fa-arrow-left"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import ChildInfo from "../AddRequest/ChildPage/child.vue"
import SchoolsInfo from "../AddRequest/SchoolsPage/school.vue"
import {mapActions, mapGetters} from "vuex";
import BaseTeleport from "../../../../../../../UI/BaseTeleport.vue";

export default {
  components: {
    BaseTeleport,
    ChildInfo,
    SchoolsInfo,
  },
  data() {
    return {
      currentStep: 1,
      totalSteps: 2,
      invalid: true,
      formData: {
        selectedIndex: null,
        selected: false,
        name: '',
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
        state: "المحافظات",
        ad_ID: "الادارات",
        checked: true,
        selectIndexSchools: [],
        std_nationalID: '',
        nationality:'',
        religion: null,
        best: true
      },
      timeExpire: false,
      request:''
    }
  },
  mounted() {

  },
  computed: {
    ...mapGetters(['getRequests'])
  },
  async created() {
     await this.fetchRequest();

  },
  methods: {
    ...mapActions(['UpdateRequests','FetchRequests']),
    validData() {
      if (
          this.formData.name === null ||
          this.formData.gender === null ||
          this.formData.age === 0 ||
          this.formData.ChImage === null ||
          this.formData.religion === '' ||
          this.formData.std_nationalID === ''
      ) {
        this.invalid = true;
      } else {
        this.invalid = false;
      }
    },
    initData(){
      this.formData.name=this.request.name;
      this.formData.age=this.request.birthdate;
      this.formData.gender=this.request.gender;
      this.formData.image=this.request.image;
      this.formData.ChImage=this.request.childbirth_certificate;
      // this.formData.childbirth_certificate=this.request.childbirth_certificate;
      this.formData.religion=this.request.religion;
      this.formData.std_nationalID=this.request.student_national_id;
      this.formData.nationality=this.request.nationality;
      this.formData.state = this.request.state;
      this.formData.ad_ID = this.request.adminstration.id;
      this.formData.selectIndexSchools = [];
      this.request.schools.forEach((school) => {
        this.formData.SchoolIDs.push(school.id);
        this.formData.selectIndexSchools.push(school.id);
      });
    },
    async fetchRequest() {
      try {
        await this.FetchRequests();
        const index = this.$route.params.id;
        this.request = this.getRequests.find(
            (req) => req.id === parseInt(index)
        );
        console.log(this.request)
        console.log(this.formData)
        this.initData();
      } catch (err) {
        console.error(err);
      }
    },
    async UpdateChild(id) {
      try {
        const form = new FormData();
        form.append('name', this.formData.name);
        form.append('gender', this.formData.gender);
        form.append('birthdate', this.formData.age);
        form.append('childbirth_certificate', this.formData.childbirth_certificate);
        form.append('image', this.formData.image);
        form.append('religion', this.formData.religion);
        form.append('nationality', this.formData.nationality);
        form.append('state', this.formData.state);
        form.append('country', this.formData.country);
        form.append('student_national_id', this.formData.std_nationalID);
        this.formData.SchoolIDs.forEach((schoolId) => {
          form.append('schools[]', schoolId);
        });
        await this.UpdateRequests({ id, formData: form });
        localStorage.removeItem('currentStep');
        localStorage.removeItem('formData');
        this.$router.push('/Darb/Dashboard/Children');
      } catch (err) {
        console.log(err);
      }
    },
    nextStep() {
      this.currentStep++;
      this.validData();
      console.log(this.formData);
    },
    prevStep() {
      this.currentStep--;
      this.validData();
      console.log(this.formData);
    }
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
