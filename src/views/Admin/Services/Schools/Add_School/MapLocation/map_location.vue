<template>
  <div>
    <div class="flex items-center justify-around pt-5">
      <button @click="getLocationByAddress" class=" bg-customLightPurple text-white p-3 rounded-2xl">اضغط ليتم تحديد الاحداثيات</button>
      <span class="border-gray-400 border-2 w-3/12 rounded-2xl p-2 text-center">{{ lat }} , {{ lng }}</span>
    </div>
    <div v class="my-10  mx-auto flex items-center rounded-2xl">
      <div ref="mapContainer" style="width: 1000px; height: 400px" class="rounded-2xl shadow-2xl mx-auto" ></div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

export default {
  props:["address"],
  data() {
    return {
      lat: 0,
      lng: 0,
      map: null,
      marker: null,
      show: false
    };
  },
  mounted() {
    // Initialize map on component mount
    this.map = L.map(this.$refs.mapContainer).setView([26.8206, 30.8025], 6); // Centered on Egypt
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(this.map);
  },
  methods: {
    async getLocationByAddress() {
      try {
        const response = await axios.get("https://nominatim.openstreetmap.org/search", {
          params: {
            q: this.address,
            format: "json",
            countrycodes: "eg"
          },
        });

        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          this.lat = parseFloat(lat);
          this.lng = parseFloat(lon);

          this.show = true;
          this.map.setView([this.lat, this.lng], 13);

          // Clear previous marker if exists
          if (this.marker) {
            this.map.removeLayer(this.marker);
          }

          // Add new marker to the map
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
        } else {
          console.error("No results found for the address.");
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    },

    // Method to get current geolocation
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
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
              });
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
