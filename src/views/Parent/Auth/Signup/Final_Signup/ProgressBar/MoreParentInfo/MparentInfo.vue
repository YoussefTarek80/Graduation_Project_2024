<template>
  <section class="flex items-center justify-around flex-wrap" data-aos="fade-left">
    <div class="sm:w-5/12 sm:m-0 mt-20">
      <div>
        <div class="mt-10">
          <span>اختر صورتك الشخصية </span>
          <div class="wrapper sm:w-full w-96">
            <img src="../../../../../../../assets/Parent/Group%2083.png" class="w-40 m-10">
          </div>
        </div>
        <div class="inputGroup sm:w-full w-80">
          <input type="text" required="" autocomplete="off" v-model="formData.email">
          <label for="email"> البريد الالكتروني</label>
        </div>
        <div class="inputGroup sm:w-full w-80">
          <input type="text" required="" autocomplete="off" v-model="formData.password">
          <label for="password">  كلمة المرور</label>
        </div>
        <div class="inputGroup sm:w-full  w-80">
          <input type="date" required="" autocomplete="off" v-model="formData.birthdate">
        </div>
        <div class="inputGroup sm:w-full  w-80">
          <input type="text" required="" autocomplete="off" v-model="formData.job">
          <label for="job"> الوظيفة</label>
        </div>
        <div class="my-10">
          <span>هل طفلك ديانته ..</span>
          <div class="flex mt-2">
            <div class="mx-10">
              <input type="radio" class="mx-3 input green" name="religion" value="مسلم" v-model="formData.religion">
              <label>مسلم</label>
            </div>
            <div class="mx-10" >
              <input type="radio" class="mx-3 input red" name="religion" value="مسيحي" v-model="formData.religion">
              <label>مسيحي</label>
            </div>
          </div>
        </div>
        <div class="">
          <span>هل طفلك جنسيته ..</span>
          <div class="flex mt-2">
            <div class="mx-10">
              <input type="radio" class="mx-3 input green" name="nationality" value="مصري" v-model="formData.nationality">
              <label>مصري</label>
            </div>
            <div class="mx-10" >
              <input type="radio" class="mx-3 input red" name="nationality" value="بلد اخري" v-model="formData.nationality">
              <label>بلد اخري</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col space-y-9 mt-20 relative shadow-2xl p-10 rounded-2xl">
      <div class="absolute -left-2 -top-2 cursor-pointer" @click="removeFile" v-if="formData.EducationalDegreeImg">
        <i class="fa-regular fa-circle-xmark text-red-700 text-4xl"></i>
      </div>
      <div class="flex gap-10">
        <img :src="formData.EducationalDegreeImg" class="w-52">
      </div>
      <div >
        <label for="birthCertificate" class="cursor-pointer">
          <i class="fa-regular fa-folder text-green-700 text-xl"></i> تحديد الشهادة التعليمية
        </label>
        <input v-if="!formData.EducationalDegreeImg" type="file" id="birthCertificate" class="hidden" @change="handleFileUpload">
        <input v-else type="file" id="birthCertificate" class="hidden" disabled>
      </div>
    </div>
  </section>
</template>
<script >
export default {
  props:['formData'],
  data(){
    return{
    }
  },methods:{
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.formData.EducationalDegreeImg = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    removeFile() {
      this.formData.EducationalDegreeImg = null;
    },
  }
}
</script>

<style scoped>
@import url("../../../../../../../UI/CustomsCss/CustomParentInput.css");
.input {
  -webkit-appearance: none;
  /* remove default */
  margin: 6px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  cursor: pointer;
  vertical-align: middle;
  box-shadow: hsla(0, 0%, 100%, 0.15) 0 0px 1px,
  inset hsla(0, 0%, 0%, 0.5) 0 0 0 1px;
  background-color: white;
  background-repeat: no-repeat;
  -webkit-transition: background-position 0.15s cubic-bezier(0.8, 0, 1, 1),
  -webkit-transform 0.25s cubic-bezier(0.8, 0, 1, 1);
  outline: none;
}

.input.green {
  background-image: -webkit-radial-gradient(
      hsla(118, 100%, 90%, 1) 0%,
      hsla(118, 100%, 70%, 1) 15%,
      hsla(118, 100%, 60%, 0.3) 28%,
      hsla(118, 100%, 30%, 0) 100%
  );
}

.input.yellow {
  background-image: -webkit-radial-gradient(
      hsla(50, 100%, 90%, 1) 0%,
      hsla(50, 100%, 70%, 1) 15%,
      hsla(50, 100%, 60%, 0.3) 28%,
      hsla(50, 100%, 30%, 0) 70%
  );
}

.input.red {
  background-image: -webkit-radial-gradient(
      hsla(0, 100%, 90%, 1) 0%,
      hsla(0, 100%, 70%, 1) 15%,
      hsla(0, 100%, 60%, 0.3) 28%,
      hsla(0, 100%, 30%, 0) 70%
  );
}

.input:checked {
  -webkit-transition: background-position 0.2s 0.15s cubic-bezier(0, 0, 0.2, 1),
  -webkit-transform 0.25s cubic-bezier(0, 0, 0.2, 1);
}

.input:active {
  -webkit-transform: scale(1.5);
  -webkit-transition: -webkit-transform 0.1s cubic-bezier(0, 0, 0.2, 1);
}

/* The up/down direction logic */

.input,
.input:active {
  background-position: 24px 0;
}

.input:checked {
  background-position: 0 0;
}

.input:checked ~ .input,
.input:checked ~ .input:active {
  background-position: -24px 0;
}
</style>