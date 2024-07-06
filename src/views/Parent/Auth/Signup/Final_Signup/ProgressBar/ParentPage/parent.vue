<template>
  <section class="flex items-center justify-around flex-wrap" data-aos="fade-left">
    <div class="sm:w-5/12 sm:m-0 mt-20">
      <span>هل انت ؟</span>
      <div class="flex items-center cursor-pointer ">
        <img src="../../../../../../../assets/Parent/Parents-amico%201.png" class="w-32 p-1 m-2" @click="selectGender('male',1)"
             :class="{ 'selected': formData.selectedIndex === 1 }">
        <span class="text-2xl`">ام</span>
        <img src="../../../../../../../assets/Parent/Parents-amico%202.png" class="w-32 p-1 m-2" @click="selectGender('female',2)"
             :class="{ 'selected': formData.selectedIndex === 2 }">
      </div>
      <hr>
      <div class="form ">
        <div class="inputGroup">
          <input type="text" required="" v-model="formData.name">
          <label for="" >اسم الاب او الام</label>
        </div>
        <div class="inputGroup">
          <select  class="py-3 px-4 pe-9 block w-full bg-gray-100 border-black rounded-2xl p-3 text-sm focus:border-black
                focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border-black text-gray-700
                dark:bg-white dark:border-2  dark:border-gray-300  dark:text-gray-700 dark:focus:ring-gray-300 dark:text-gray-300"
                  v-model="this.formData.country"
                  @change="selectVariable"
                  >
            <option selected disabled>الدولة</option>
            <option>مصر</option>
            <option>بلد اخري</option>
          </select>
        </div>
        <div class="flex items-center justify-center">
          <img src="../../../../../../../assets/Parent/image%2052.png" class="w-20" v-if="formData.selected">
        </div>
        <div class="inputGroup" v-if="egyptData" >
          <input type="text" required="" v-model="formData.nationalId">
          <label for="" >الرقم القومي</label>
        </div>
        <div class="inputGroup" v-if="foreignData">
          <input type="text" required="" v-model="formData.nationalId">
          <label for="" >رقم الباسبورد</label>
        </div>
        <div class="inputGroup">
          <input type="text" required="" v-model="formData.address">
          <label for="">العنوان</label>
        </div>
        <div class="inputGroup">
          <input type="text" required="" v-model="formData.phoneNumber">
          <label for="">رقم الهاتف</label>
        </div>
        <div>
          <div>
            <div class="flex items-center justify-between pt-5">
              <button @click="getLocation" class=" bg-customLightPurple text-white p-3 rounded-2xl">يمكنك تحديد موقعك الان</button>
              <span class="border-gray-400 border-2 w-5/12 rounded-2xl p-2 text-center">{{  this.formData.lat }} , {{ this.formData.lng }}</span>
            </div>
            <div class=" my-10 shadow-2xl mx-auto " >
              <div ref="mapContainer"  style="width: 600px; height: 400px" class="rounded-2xl"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="flex flex-col space-y-9 mt-20 relative shadow-2xl p-10 rounded-2xl">
      <div class="absolute -left-2 -top-2 cursor-pointer" @click="removeFile" v-if="formData.NaImage">
        <i class="fa-regular fa-circle-xmark text-red-700 text-4xl"></i>
      </div>
      <div class="flex gap-10">
        <img :src="this.formData.NaImage" class="w-52">
      </div>
      <div >
        <label for="birthCertificate" class="cursor-pointer">
          <i class="fa-regular fa-folder text-green-700 text-xl"></i> تحديد شهادة البطاقة القومية
        </label>
        <input v-if="!formData.NaImage" type="file" id="birthCertificate" class="hidden" @change="handleFileUpload">
        <input v-else type="file" id="birthCertificate" class="hidden" disabled>
      </div>

    </div>

  </section>
</template>


<script>
import Map from '../../../MapLocation/map_location.vue'
import L from "leaflet";
export default {
  components:{
    Map
  },
  props:['formData'],
  data() {
    return {
      lat:0,
      lng:0,
      map: null,
      marker: null,
      show:false
    }
  },
  mounted() {
    this.map = L.map(this.$refs.mapContainer).setView([51.505, -0.09], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,

    }).addTo(this.map);
  },
  computed:{
    egyptData(){
      if(this.formData.selected && this.formData.country==='مصر'){
        return true
      }
    },
    foreignData(){
      if(this.formData.selected && this.formData.country!=='مصر'){
        return true
      }
    },

  },
  created() {
  },
  methods: {
    selectVariable(){
      this.formData.selected=true
      console.log(this.formData.country)
    },
    selectGender(gender,index) {
      this.formData.gender = gender;
      this.formData.selectedIndex=index;
    },
    handleFileUpload(event) {
      this.formData.nationalIdImg = event.target.files[0];
      this.formData.NaImage = URL.createObjectURL(this.formData.nationalIdImg);
      console.log("nationalIdImg",this.formData.nationalIdImg)
    },
    removeFile() {
      this.formData.NaImage = null;
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.map.setView([this.lat, this.lng], 13);
          if (this.marker) {
            this.map.removeLayer(this.marker);
          }
          this.marker = L.marker([this.lat, this.lng], { draggable: true })
              .addTo(this.map)
              .on("dragend", (event) => {
                const marker = event.target;
                const position = marker.getLatLng();
                this.lat = position.lat;
                this.lng = position.lng;
                this.marker.bindPopup(`<b>Latitude:</b> ${this.lat}<br><b>Longitude:</b> ${this.lng}`).openPopup();
                this.$emit('update-lat-lng', { lat: this.lat, lng: this.lng });
              });
          this.$emit('update-lat-lng', { lat: this.lat, lng: this.lng });
        });
      }
    },
  },
}
</script>
<style scoped>
@import url("./parent.css");
@import url("../../../../../../../UI/CustomsCss/CustomParentInput.css");
</style>