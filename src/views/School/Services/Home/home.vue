<template>
    <sc-navbar-comp></sc-navbar-Comp>
    <div class="Home grid sm:grid-cols-4 grid-cols-2 gap-4 items-center justify-center p-5" data-aos="fade-up"
        data-aos-duration="1000">
        <div class="sm:col-span-1 col-span-2 bg-customBGCards rounded-2xl shadow-2xl p-3">
            <div class="p-4 flex flex-row-reverse items-center justify-center space-x-6 rounded-2xl py-5">
                <!-- <div>
                    <img :src="GetUser.image" class="sm:w-60 rounded-full border-2 border-customPurple p-1" alt="" />
                </div>
                <div class="flex flex-col">
                    <span class="text-2xl">{{ GetUser.name }} </span>
                    <span class="text-customDarkPurple">مسئول ادارة</span>
                </div> -->
            </div>
            <button @click="this.$router.push('/Manager/Profile')"
                class="border-2 border-dashed border-customDarkPurple p-6 my-5 rounded-full block m-auto hover:bg-customDarkPurple text-customDarkPurple hover:text-lime-50 transition-all hover:border-solid w-full">
                الملف الشخصي
            </button>
        </div>
        <div class="col-span-3 grid sm:grid-cols-2 gap-4">
            <div class="col-span-1" v-for="item in data" :key="item.title">
                <div
                    class="p-4 flex flex-row-reverse items-center justify-center space-x-6 rounded-2xl shadow-xl py-5 bg-customBGCards">
                    <div class="w-24">
                        <img :src="item.img" alt="error" />
                    </div>

                    <div class="flex flex-col items-center justify-center">
                        <span class="text-3xl">{{ item.title }}</span>

                        <span class="text-customDarkPurple text-3xl">{{ item.numbers }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="sm:w-full flex justify-between items-center mt-10 flex-wrap sm:space-y-0 space-y-12" data-aos="fade-up"
        data-aos-duration="2000">
        <div class="sm:w-5/12 w-full">
            <chart />
        </div>
        <div class="sm:w-5/12 w-full">
            <pie />
        </div>
    </div>
    <Footer_Component></Footer_Component>
</template>

<script>
import axios from "axios";
import chart from "../../../../Charts/LineChart.vue";
import Pie from "../../../../Charts/PieChart.vue";
import { mapGetters, mapActions } from "vuex";
export default {
    components: { chart, Pie },
    data() {
        return {
            data: [
                {
                    title: "الطلاب",
                    img: "../src/assets/Logo/students.png",
                    numbers: 20,
                },
                {
                    title: "المناسبات",
                    img: "../src/assets/Logo/events.png",
                    numbers: 20,
                },
                {
                    title: "المسئولين",
                    img: "../src/assets/Logo/admins.png",
                    numbers: 20,
                },
                {
                    title: "الطلبات",
                    img: "../src/assets/Logo/requests.png",
                    numbers: 20,
                },
                {
                    title: "العمال",
                    img: "../src/assets/Logo/team.png",
                    numbers: 20,
                },
            ],
        };
    },
    mounted() {
    },
    computed: {
    },
    created() {
    },
    methods: {
        // ...mapActions(["fetchSchools", "FetchUser"]),
        // async fetchData() {
        //     try {
        //         await this.fetchSchools();
        //         this.DisplayDashboardNumbers();
        //     } catch (err) {
        //         console.error(err);
        //     }
        // },
        // DisplayDashboardNumbers() {
        //     this.data.forEach((item) => {
        //         if (item.title === "المدارس") {
        //             item.numbers = this.schools.length;
        //         }
        //     });
        // },
    },
};
</script>

<style scoped>
@import url("./home.css");
</style>
