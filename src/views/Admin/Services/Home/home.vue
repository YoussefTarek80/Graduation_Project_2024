<template>
    <Navbar_Component></Navbar_Component>
    <div class="Home grid sm:grid-cols-4 grid-cols-2 gap-4 items-center justify-center p-5" data-aos="fade-up"
        data-aos-duration="1000">
        <div class="sm:col-span-1 col-span-2 bg-customBGCards rounded-2xl shadow-2xl p-3">
            <div class="p-4 flex flex-row-reverse items-center justify-center rounded-2xl py-5">
                <div>
                    <img :src="GetUser.image"
                        class="sm:w-40 sm:h-40 w-full h-full object-cover rounded-full border-2 border-customPurple p-1"
                        alt="" />
                </div>
                <div class="flex flex-col">
                    <span class="text-2xl">{{ GetUser.name }} </span>
                    <span class="text-customDarkPurple">{{ GETrole }}</span>
                </div>
            </div>
            <button @click="this.$router.push('/Admin/Profile')"
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
                        <span class="text-customDarkPurple text-3xl" v-if="item.numbers">{{ item.numbers }}
                        </span>
                        <i v-if="!item.numbers" class="fa-sharp fa-light fa-spinner-scale fa-spin"></i>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="sm:w-full flex justify-around items-center sm:mt-10 flex-wrap" data-aos="fade-up"
        data-aos-duration="1000">
        <div class="sm:w-5/12 w-full bg-customBGCards rounded-2xl shadow-2xl p-3">
            <chart />
        </div>
        <div class="sm:w-5/12 w-full bg-customBGCards rounded-2xl shadow-2xl p-3">
            <i v-if="!getLengths"
                class="fa-sharp fa-light fa-spinner-scale fa-spin text-6xl flex items-center justify-center"></i>
            <div v-if="getLengths">
                <pie :schools="this.schools.length" :students="this.GetAllstds.length" :events="this.events.length"
                    :requests="0" :workers="6" :admins="this.GetallAdmins.length" />
            </div>
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
                    title: "المدارس",
                    img: "../src/assets/Logo/schools.png",
                    numbers: 0,
                },
                {
                    title: "الطلاب",
                    img: "../src/assets/Logo/students.png",
                    numbers: 0,
                },
                {
                    title: "المناسبات",
                    img: "../src/assets/Logo/events.png",
                    numbers: 0,
                },
                {
                    title: "المسئولين",
                    img: "../src/assets/Logo/admins.png",
                    numbers: 0,
                },
                {
                    title: "الطلبات",
                    img: "../src/assets/Logo/requests.png",
                    numbers: 0,
                },
                {
                    title: "العمال",
                    img: "../src/assets/Logo/team.png",
                    numbers: 0,
                },
            ],
            countingInterval: null,
            countingSpeed: 2000,
        };
    },
    computed: {
        ...mapGetters(["schools", "fetchSchoolsStatus", "GetUser", "events", "GetAllstds", "GetallAdmins"]),
        getLengths() {
            if (this.schools.length && this.GetAllstds.length && this.events.length && this.GetallAdmins.length) return true

        },
        GETrole() {
            if (localStorage.getItem("role") === 'admin') {
                return 'مسئول ادارة'
            }

        }
    },
    async created() {
        await this.fetchData();
        console.log(this.events)
    },
    methods: {
        ...mapActions(["fetchSchools", "FetchUser", "FetchEvents", "FetchAllStudent", "FetchAdmins"]),
        async fetchData() {
            try {
                await this.fetchSchools();
                await this.FetchUser();
                await this.FetchEvents();
                await this.FetchAllStudent();
                await this.FetchAdmins();
                this.DisplayDashboardNumbers();
            } catch (err) {
                console.error(err);
            }
        },
        DisplayDashboardNumbers() {
            this.data.forEach((item) => {
                if (item.title === "المدارس") {
                    this.updateNumber(this.schools.length, item);
                } else if (item.title === "المناسبات") {
                    this.updateNumber(this.events.length, item);
                }
                else if (item.title === "العمال") {
                    this.updateNumber(25, item);
                }
                else if (item.title === "الطلاب") {
                    this.updateNumber(this.GetAllstds.length, item);
                }
                else if (item.title === "المسئولين") {
                    this.updateNumber(this.GetallAdmins.length, item);
                }
                else if (item.title === "الطلبات") {
                    this.updateNumber(0, item);
                }
                console.log(item.numbers);
            });
        },
        updateNumber(size, item) {
            if (size === 0) {
                item.numbers = size;
            } else {
                for (let i = 0; i <= size; i++) {
                    setTimeout(() => {
                        item.numbers = i;
                    }, 90 * i);
                }
            }
        }
    },
};
</script>
<style scoped>
@import url("./home.css");
</style>
