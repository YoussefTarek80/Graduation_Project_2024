<template>
  <Navbar_Component></Navbar_Component>
  <div v-if="event">
    <span>{{event.time}}</span>
  </div>
  <Footer_Component></Footer_Component>
</template>
<script>
import {mapGetters,mapActions} from "vuex";
export default {
  data(){
    return{
      event:null
    }
  },
  computed: {
    ...mapGetters(["events"]),
  },
  created() {
    this.fetchEvent();
  },
  methods: {
    ...mapActions(["FetchEvents"]),
    async fetchEvent() {
      try {
        await this.FetchEvents();
        const index = this.$route.params.index;
        this.event = this.events.find(
            (event) => event.id === parseInt(index)
        );
        console.log(this.event)
      } catch (err) {
        console.error(err);
      }
    },
  },
}
</script>