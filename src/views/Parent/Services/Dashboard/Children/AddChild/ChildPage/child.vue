<template>
  <section class="flex items-center justify-around flex-wrap" data-aos="fade-left">
    <div class="sm:w-5/12 ">
      <div class="mt-10">
        <span>اختر صورة طفلك</span>
        <div class="wrapper sm:w-full w-96">
          <div v-for="(image, index) in images" :key="index"  class="item">
            <img :src="image.img" class=" w-28 p-2 rounded-full" @click="selectImage(image.img,index)" :class="{ 'selected': formData.childselectedIndex === index }">
          </div>
        </div>
      </div>
      <hr>
      <div class="form mt-10">
          <div class="">
            <span>هل طفلك ..</span>
            <div class="flex mt-2">
              <div class="mx-10">
                <input type="radio" class="mx-3 input green" name="gender" value="boy" v-model="formData.childGender">
                <label>ولد</label>
              </div>
              <div class="mx-10" >
                <input type="radio" class="mx-3 input red" name="gender" value="girl" v-model="formData.childGender">
                <label>بنت</label>
              </div>
            </div>
          </div>
        <hr>
          <div class="">
            <div class="inputGroup sm:w-full w-96 ">
              <input type="text" required="" autocomplete="off" v-model="formData.childName">
              <label for="password">اسم الطفل</label>
            </div>
          </div>
        <hr>
          <div class="">
          <span>كم عمره؟</span>
          <div class="flex items-center  mt-5">
            <div @click="increaseAge" class="cursor-pointer">
              <i class="fa-solid fa-plus"></i>
            </div>
            <div class="px-10 py-5 bg-customDarkPurple rounded-3xl text-white mx-10 text-2xl">
              {{ formData.childAge }}
            </div>
            <div @click="decreaseAge" class="cursor-pointer">
              <i class="fa-solid fa-minus"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col space-y-9 mt-20 relative shadow-2xl p-10 rounded-2xl">
      <div class="absolute -left-2 -top-2 cursor-pointer" @click="removeFile" v-if="formData.childBirthDay">
        <i class="fa-regular fa-circle-xmark text-red-700 text-4xl"></i>
      </div>
      <div class="flex gap-10">
        <img :src="this.formData.childBirthDay" class="w-52">
      </div>
      <div >
        <label for="birthCertificate" class="cursor-pointer">
          <i class="fa-regular fa-folder text-green-700 text-xl"></i> تحديد شهادة ميلاد الطفل
        </label>
        <input v-if="!formData.childBirthDay" type="file" id="birthCertificate" class="hidden" @change="handleFileUpload">
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
      images:[
        {
          img:"../src/assets/Parent/Group%2083.png"
        },
        {
          img:"../src/assets/Parent/9440461.jpg"
        },
        {
          img:"../src/assets/Parent/9434619.jpg"
        },
        {
          img:"../src/assets/Parent/9439678.jpg"
        },
        {
          img:"../src/assets/Parent/Group%2083.png"
        },
        {
          img:"../src/assets/Parent/Group%2083.png"
        },
        {
          img:"../src/assets/Parent/Group%2083.png"
        },
        {
          img:"../src/assets/Parent/Group%2083.png"
        },
        {
          img:"../src/assets/Parent/Group%2083.png"
        },       {
          img:"../src/assets/Parent/Group%2083.png"
        },       {
          img:"../src/assets/Parent/Group%2083.png"
        },       {
          img:"../src/assets/Parent/Group%2083.png"
        },
      ],
    }
  },
  mounted() {
  },
  methods:{
    selectImage(imgSrc,index) {
      this.formData.childselectedIndex = index;
      this.formData.childImg=imgSrc;
    },
    increaseAge(){
      if(this.formData.childAge>18){
        this.formData.childAge=0;
      }
      else{
        this.formData.childAge++;
      }
    },
    decreaseAge(){
      if(this.formData.childAge<=0){
        this.formData.childAge=0;
      }
      else{
        this.formData.childAge--;
      }

    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.formData.childBirthDay = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    removeFile() {
      this.formData.childBirthDay = null;
    },
  }
}
</script>



<style scoped>
@import url("../../../../../../../UI/CustomsCss/CustomParentInput.css");
@import url("./child.css");

</style>