<template>
  <div
    class="absolute left-1 z-50 bg-white p-5 shadow-lg rounded-lg w-96 h-60 text-black text-center flex flex-col overflow-auto"
    data-aos="fade-in">
    <div v-if="items.length === 0" class="m-auto">
      <span class="font-bold"> لا توجد إشعارات حتي الآن...</span>
    </div>
    <span v-else class="self-start text-2xl text-customDarkPurple font-bold">اشعار جديد</span>
    <div v-for="(item, index) in items" :key="index" @click="navigate(item)"
      class="flex flex-col gap-1 p-3 border-2 border-b-gray-100 items-center justify-between w-full">
      <span class="hover:bg-gray-100 transition-all cursor-pointer p-3 text-start">
        {{ item.data.message }}
      </span>
    </div>
  </div>

</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      isHover: false,
      notifies: [],
    }
  },
  computed: {
    ...mapGetters(['GetSCNotifications']),
    items() {
      this.notifies = this.GetSCNotifications;
      return this.notifies;
    },
  },
  async created() {
    await this.fetchData();
    console.log(this.items);
  },
  methods: {
    ...mapActions(['FetchScNotifications', 'mark_as_read']),
    async fetchData() {
      try {
        await this.FetchScNotifications();
      }
      catch (err) {
        console.log(err);
      }
    },
    async navigate(item) {
      await this.mark_as_read(item.id);
      this.$router.push(item.data.url);
    }
  }
}
</script>


<style scoped></style>