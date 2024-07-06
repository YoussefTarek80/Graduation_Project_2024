<template>
  <div>
    <div class="flex items-center justify-between pt-5">
      <button @click="getLocation" class=" bg-customLightPurple text-white p-3 rounded-2xl">يمكنك تحديد موقعك الان</button>
      <span class="border-gray-400 border-2 w-5/12 rounded-2xl p-2 text-center">{{ this.lat }} , {{ this.lng }}</span>
    </div>
    <div class=" my-10 shadow-2xl mx-auto " >
      <div ref="mapContainer"  style="width: 600px; height: 400px" class="rounded-2xl"></div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
export default {
  props: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },

  },
  data() {
    return {
      map: null,
      marker: null,
      show:false
    };
  },
  mounted() {
    this.map = L.map(this.$refs.mapContainer).setView([51.505, -0.09], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,

    }).addTo(this.map);
  },

  methods: {
    showMap(){
      this.show=!this.show;
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.map.setView([this.lat, this.lng],13);
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

              });
        });
      }
    },

  }
};
</script>

<style scoped>

</style>
