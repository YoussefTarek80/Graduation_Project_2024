<template>
  <section class="flex items-center justify-around flex-wrap" data-aos="fade-left">
    <div class="sm:w-5/12 ">
      <div class="mt-10">
        <span>اختر صورة طفلك</span>
        <div class="w sm:w-full w-96">
<!--          <div v-for="(image, index) in images" :key="index"  class="item">-->
<!--            <img :src="image.img" class=" w-28 p-2 rounded-full" @click="selectImage(image.img,index)" :class="{ 'selected': formData.childselectedIndex === index }">-->
<!--          </div>-->
          <div class="input-upload mx-20 my-8">
            <input class="upload" name="file" type="file" @change="handleFileUpload(1, $event)">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" class="icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
          </div>
        </div>
      </div>
      <hr>
      <div class="form mt-10">
          <div class="">
            <span>هل طفلك ..</span>
            <div class="flex mt-2">
              <div class="mx-10">
                <input type="radio" class="mx-3 input green" name="gender" value="male" v-model="formData.gender">
                <label>ولد</label>
              </div>
              <div class="mx-10" >
                <input type="radio" class="mx-3 input red" name="gender" value="female" v-model="formData.gender">
                <label>بنت</label>
              </div>
            </div>
          </div>
        <hr>
          <div class="">
            <div class="inputGroup sm:w-full w-96 ">
              <input type="text" required="" autocomplete="off" v-model="formData.name">
              <label for="password">اسم الطفل</label>
            </div>
          </div>
        <hr>
        <div class="">
          <span>تاريخ ميلاده؟</span>
          <div class="inputGroup sm:w-full w-96 ">
            <input type="date" required="" autocomplete="off" v-model="formData.age">
          </div>
        </div>
        <hr>
        <div class="">
          <span>الرقم القومي للطفل</span>
          <div class="inputGroup sm:w-full w-96 ">
            <input type="text" required="" autocomplete="off" v-model="formData.std_nationalID">
          </div>
        </div>
        <hr>
        <div class="">
          <span>هل طفلك جنسيته ..</span>
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
      </div>
    </div>
    <div class="flex flex-col space-y-9 mt-20 relative shadow-2xl p-10 rounded-2xl">
      <div class="absolute -left-2 -top-2 cursor-pointer" @click="removeFile" v-if="formData.ChImage">
        <i class="fa-regular fa-circle-xmark text-red-700 text-4xl"></i>
      </div>
      <div class="flex gap-10">
        <img :src="this.formData.ChImage" class="w-52">
      </div>
      <div >
        <label for="birthCertificate" class="cursor-pointer">
          <i class="fa-regular fa-folder text-green-700 text-xl"></i> تحديد شهادة ميلاد الطفل
        </label>
        <input v-if="!formData.ChImage" type="file" id="birthCertificate" class="hidden" @change="handleFileUpload(2, $event)">
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
      // images:[
      //   {
      //     img:"../../../src/assets/Parent/9440461.jpg"
      //   },
      //   {
      //     img:"../../../src/assets/Parent/9440461.jpg"
      //   },
      //   {
      //     img:"../../../src/assets/Parent/9440461.jpg"
      //   },
      //   {
      //     img:"../../../src/assets/Parent/9440461.jpg"
      //   },
      //   {
      //     img:"../../../src/assets/Parent/9440461.jpg"
      //   },
      //   {
      //     img:"../../../src/assets/Parent/9440461.jpg"
      //   },
      //   {
      //     img:"../../../src/assets/Parent/9440461.jpg"
      //   },
      //   {
      //     img:"../../../src/assets/Parent/9440461.jpg"
      //   },
      //   {
      //     img:"../../../src/assets/Parent/9440461.jpg"
      //   },
      //
      // ],
    }
  },
  mounted() {
    console.log(this.formData.age)
  },
  methods:{
    // selectImage(imgSrc,index) {
    //   this.formData.childselectedIndex = index;
    //   this.formData.image = imgSrc;
    //   console.log( this.formData.image)
    // },
    increaseAge(){
      if(this.formData.age>18){
        this.formData.age=0;
      }
      else{
        this.formData.age++;
      }
    },
    decreaseAge(){
      if(this.formData.age<=0){
        this.formData.age=0;
      }
      else{
        this.formData.age--;
      }

    },
    handleFileUpload(imageIndex, event) {
      if (event.target.files.length > 0) {
        if(imageIndex===1){
          this.formData.image = event.target.files[0];
          this.formData.avatar = URL.createObjectURL(this.formData.image);
          console.log("this.formData.image",this.formData.image)
        }
        else if(imageIndex===2){
          this.formData.childbirth_certificate = event.target.files[0];
          this.formData.ChImage = URL.createObjectURL(this.formData.childbirth_certificate);
          console.log("childbirth_certificate",this.formData.childbirth_certificate)
        }
      }
    },
    removeFile() {
      this.formData.ChImage = null;
    },
  }
}
</script>



<style scoped>
@import url("../../../../../../../UI/CustomsCss/CustomParentInput.css");
@import url("child.css");

</style>