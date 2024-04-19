<template>
    <sc-navbar-comp></sc-navbar-Comp>
    <div class="Home grid sm:grid-cols-4 grid-cols-2 gap-4 items-center justify-center p-5" data-aos="fade-up"
        data-aos-duration="1000">
        <div class="sm:col-span-1 col-span-2 bg-customBGCards rounded-2xl shadow-2xl p-3">
            <div class="p-4 flex flex-row-reverse items-center justify-center space-x-6 rounded-2xl py-5">
                <div>
                    <img src="../../../../assets/Logo/personal-img-1.jpg"
                        class="sm:w-60 rounded-full border-2 border-customPurple p-1" alt="" />
                    <!-- <img :src="GetUser2.image" class="sm:w-60 rounded-full border-2 border-customPurple p-1" alt="" /> -->
                </div>
                <div class="flex flex-col">
                    <span class="text-2xl">مجدي خالد </span>
                    <!-- <span class="text-2xl">{{ GetUser2.name }} </span> -->
                    <span class="text-customDarkPurple">مدير المدرسة</span>
                </div>
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
    inject: ['students', 'requests'],
    data() {
        return {
            data: [
                {
                    title: "الطلاب",
                    img: "../src/assets/Logo/students.png",
                    numbers: null,
                },
                {
                    title: "المناسبات",
                    img: "../src/assets/Logo/events.png",
                    numbers: null,
                },
                {
                    title: "المسئولين",
                    img: "../src/assets/Logo/admins.png",
                    numbers: null,
                },
                {
                    title: "الطلبات",
                    img: "../src/assets/Logo/requests.png",
                    numbers: null,
                },
                {
                    title: "العمال",
                    img: "../src/assets/Logo/team.png",
                    numbers: null,
                },
            ],
        };
    },
    mounted() {
    },
    computed: {
        ...mapGetters(["GetUser2"]),
    },
    created() {
        this.DisplayDashboardNumbers();
    },
    methods: {
        ...mapActions(["FetchUser2"]),
        DisplayDashboardNumbers() {
            this.data.forEach((item) => {
                if (item.title === "الطلاب") {
                    this.data[0].numbers = this.students.length;
                }
                else if (item.title === "المناسبات") {
                    this.data[1].numbers = 0;
                }
                else if (item.title === "المسئولين") {
                    this.data[2].numbers = 0;
                }
                else if (item.title === "الطلبات") {
                    this.data[3].numbers = this.requests.length;
                }
                else if (item.title === "العمال") {
                    this.data[4].numbers = 0;
                }
            });
        },
    },
};
</script>

<style scoped>
@import url("./home.css");
</style>
