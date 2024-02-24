<template>
    <Navbar_Component></Navbar_Component>
    <div
        class="Home grid sm:grid-cols-4 grid-cols-2 gap-4 items-center justify-center p-5"
        data-aos="fade-up"
        data-aos-duration="2000"
    >
        <div
            class="sm:col-span-1 col-span-2 bg-customBGCards rounded-2xl shadow-2xl"
        >
            <div
                class="p-4 flex flex-row-reverse items-center justify-center space-x-6 rounded-2xl py-5"
            >
                <div>
                    <img src="../../../../assets/Logo/Profile.png" alt="" />
                </div>
                <div class="flex flex-col">
                    <span class="text-3xl">{{ getUser.name }} </span>
                    <span class="text-customDarkPurple">مسئول ادارة</span>
                </div>
            </div>
            <button
                class="border-2 border-dashed border-customDarkPurple p-6 my-5 rounded-full block m-auto hover:bg-customDarkPurple text-customDarkPurple hover:text-lime-50 transition-all hover:border-solid"
            >
                الملف الشخصي
            </button>
        </div>
        <div class="col-span-3 grid sm:grid-cols-3 grid-cols-2 gap-4">
            <div class="col-span-1" v-for="item in data" :key="item.title">
                <div
                    class="p-4 flex flex-row-reverse items-center justify-center space-x-6 rounded-2xl shadow-xl py-5 bg-customBGCards"
                >
                    <div class="w-24">
                        <img :src="item.img" alt="error" />
                    </div>

                    <div class="flex flex-col items-center justify-center">
                        <span class="text-3xl">{{ item.title }}</span>
                        <span class="text-customDarkPurple text-3xl"
                            >{{ item.numbers }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="sm:w-full flex justify-between items-center mt-10 flex-wrap sm:space-y-0 space-y-12" data-aos="fade-up" data-aos-duration="2000">
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
import chart from "../../../../Charts/LineChart.vue";
import Pie from "../../../../Charts/PieChart.vue";
import {mapGetters } from 'vuex';
export default {
    components: {chart,Pie },
    data() {
        return {
            data: [
                {
                    title: "المدارس",
                    img: "../src/assets/Logo/schools.png",
                    numbers: 20,
                },
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
    computed: {
        ...mapGetters(["getUser"]),
    },
};
</script>
<style scoped>
@import url("./home.css");
</style>
