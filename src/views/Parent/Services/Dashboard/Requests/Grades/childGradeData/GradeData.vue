<template>
  <section class="my-10 mx-auto max-w-lg " data-aos="fade-left" data-aos-duration="1000">
    <div class=" overflow-auto" style="height: 78vh">
      <div id="capture" class="p-8  shadow-2xl border border-black rounded-lg">
        <div class="flex items-center justify-between border-b-2 border-black py-6">
          <div class="flex items-center gap-4">
            <img :src="std.image" class="w-16 h-16 border-2 border-gray-400 rounded-full" alt="Profile Image">
            <div class="flex flex-col gap-2">
              <p class="text-lg text-customDarkPurple font-semibold">{{ std.name }}</p>
              <p class="text-customDarkPurple">{{ std.school.name }}</p>
              <p class="text-customDarkPurple flex flex-row-reverse gap-2" ><span class="font-bold">{{ std.national_id }}</span>  <span>الرقم القومي :</span> </p>
            </div>
          </div>
        </div>
        <div class="p-8 border-b-2 border-black"  >
          <div class="mb-8">
          <span class="text-lg text-customDarkPurple font-semibold">
            <i class="fa-duotone fa-sparkles mx-2"></i>
            نتيجة الطفل
          </span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-1 gap-4 items-center justify-center text-sm">
            <div class="border border-gray-200 rounded-lg flex p-4">
              <p class=" text-customDarkPurple font-semibold ">اللغة العربية :</p>
              <p class=" px-5">60</p>
            </div>
            <div class="border border-gray-200 rounded-lg flex p-4">
              <p class=" text-customDarkPurple font-semibold ">اللغة الانجليزيه :</p>
              <p class=" px-5">60</p>
            </div>
            <div class="border border-gray-200 rounded-lg flex p-4">
              <p class=" text-customDarkPurple font-semibold ">اللغة الفرنساوية :</p>
              <p class=" px-5">60</p>
            </div>
            <div class="border border-gray-200 rounded-lg flex  p-4">
              <p class=" text-customDarkPurple font-semibold "> الكيمياء :</p>
              <p class=" px-5">60</p>
            </div>
            <div class="border border-gray-200 rounded-lg flex p-4">
              <p class=" text-customDarkPurple font-semibold ">الفيزياء  :</p>
              <p class=" px-5">60</p>
            </div>
            <div class="border border-gray-200 rounded-lg flex p-4">
              <p class=" text-customDarkPurple font-semibold ">الفيزياء  :</p>
              <p class=" px-5">60</p>
            </div>
            <div class="border border-gray-200 rounded-lg flex p-4">
              <p class=" text-customDarkPurple font-semibold ">الفيزياء  :</p>
              <p class=" px-5">60</p>
            </div>
            <div class="border border-gray-200 rounded-lg flex p-4">
              <p class=" text-customDarkPurple font-semibold ">الفيزياء  :</p>
              <p class=" px-5">60</p>
            </div>
          </div>
        </div>
        <div class="mt-5 flex items-center justify-around gap-5 ">
          <span class="font-bold">النتيجة النهائية: 280</span>
          <span class="font-bold"> النسبة المئوية: 100%</span>
        </div>
      </div>
    </div>
    <button @click="makePdf" class="block mx-auto mt-8 px-6 py-3 bg-customDarkPurple text-white rounded-md hover:bg-opacity-80 focus:outline-none">طباعة</button>
  </section>
</template>

<script>
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      std: '',
      current: 0
    }
  },
  computed: {
    ...mapGetters(['getChildren']),
  },
  async created() {
    await this.GetStudent();
  },
  methods: {
    ...mapActions(['ShowChildren']),
    async GetStudent() {
      try {
        await this.ShowChildren();
        const index = this.$route.params.id;
        this.std = this.getChildren.find(
            (student) => student.id === parseInt(index)
        );

        console.log(this.std)
      } catch (err) {
        console.log(err)
      }
    },
    makePdf() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        html2canvas(document.querySelector("#capture")).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let position = 0;
          let pageHeight = 297;
          let leftHeight = imgHeight;
          let pageData = canvas.toDataURL('image/jpeg', 1.0);
          pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          while (leftHeight > 0) {
            position = leftHeight - imgHeight;
            pdf.addPage();
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
          }
          pdf.save('document.pdf');
        }).catch(error => {
          console.error("Error capturing HTML content:", error);
        });
      } else {
        alert("PDF generation is supported only on desktop devices.");
      }
    },
  }
}
</script>

<style scoped>

</style>