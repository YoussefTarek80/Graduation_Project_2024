<template>
  <section v-if="ishover" class="absolute w-4/12 left-96 top-28 h-52 overflow-auto z-40 shadow-2xl bg-white rounded-2xl">
    <div class="flex items-center justify-center m-2 text-2xl text-gray-300 underline" v-if="!GetNotifications.length===0">
      <span>الاشعارات</span>
    </div>
    <div class="p-5 mx-5 flex flex-col notify rounded-2xl gap-2 cursor-pointer hover:bg-gray-100 transition-all" @click="readNotify(notify.id,notify.data.url)" v-for="notify in GetNotifications" :key="notify.id">
      <span class="font-bold">اشعار جديدة</span>
      <span>تم ارسال يوم {{ timeRequest(notify.created_at) }} الرد من {{ notify.data.school_name }} بخصوص {{ notify.data.data_title }}</span>
      <hr class="mt-5">
    </div>
    <div v-if="GetNotifications.length===0" class=" text-2xl flex items-center justify-center h-full">
      لا يوجد اشعارات جديدة
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  props: ['ishover'],
  data(){
    return{

    }
  },
  computed: {
    ...mapGetters(['GetNotifications']),
  },
  async created() {
    await this.FetchNotifications();
    this.$emit('update-notification-count', this.GetNotifications.length);
    console.log(this.GetNotifications)
  },
  watch: {
    GetNotifications(newVal) {
      this.$emit('update-notification-count', newVal.length);
    }
  },
  methods: {
    ...mapActions(['FetchNotifications','ReadNotificaton']),
    timeRequest(time) {
      const dateTime = new Date(time);
      const year = dateTime.getFullYear();
      const month = String(dateTime.getMonth() + 1).padStart(2, '0');
      const day = String(dateTime.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    },
    async readNotify(id,url){
      await this.ReadNotificaton(id);
      this.$router.push(`${url}`);
    }
  }
})
</script>

<style scoped>

</style>
