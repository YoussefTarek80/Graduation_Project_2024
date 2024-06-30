<template>
  <div>
    <button @click="getLocation">Get Location</button>
<!--    {{ lat }} , {{ lng }}-->
<!--    <div ref="mapContainer" style="width: 400px; height: 400px"></div>-->
  </div>
</template>

<script>
import L from "leaflet";

export default {
  data() {
    return {
      lat: 0,
      lng: 0,
      map: null
    };
  },
  mounted() {
    this.map = L.map(this.$refs.mapContainer).setView([51.505, -0.09], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.map.setView([this.lat, this.lng], 13);

          L.marker([this.lat, this.lng], { draggable: true })
              .addTo(this.map)
              .on("dragend", (event) => {
                console.log(event);
              });
        });
      }
    }
  }
};
</script>

<style scoped>
</style>
