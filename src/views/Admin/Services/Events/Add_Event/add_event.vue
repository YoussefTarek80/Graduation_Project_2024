<template>
    <Navbar_Component></Navbar_Component>
    <section
        class="m-6 sm:m-16 z-50"
        data-aos="fade-up"
        data-aos-duration="1000"
    >
        <div class="flex flex-col items-center">
            <span class="text-3xl sm:text-4xl">اضافة مناسبة جديدة</span>
            <i
                class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"
            ></i>
        </div>
        <div
            class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto school"
        >
            <div class="my-5">
                <span class="text-2xl">بيانات المناسبة</span>
            </div>
            <div class="input_Div grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div class="flex flex-col">
                    <label for="in1"
                        >اسم المناسبة <span class="text-red-600">*</span></label
                    >
                    <input
                        @input="validInputs"
                        type="text"
                        v-model="name"
                        id="in1"
                        class="outline-customDarkPurple"
                    />
                </div>
                <div class="flex flex-col">
                    <label for="in1"
                        >وقت المناسبة <span class="text-red-600">*</span></label
                    >
                    <input
                        @input="validInputs"
                        type="date"
                        v-model="date"
                        id="in1"
                        class="outline-customDarkPurple"
                    />
                </div>
                <div class="flex flex-col">
                    <label for="in1"
                        >تاريخ المناسبة
                        <span class="text-red-600">*</span></label
                    >
                    <input
                        @input="validInputs"
                        type="time"
                        v-model="time"
                        id="in1"
                        class="outline-customDarkPurple"
                    />
                </div>
            </div>
            <div>
                <div class="flex flex-col mt-6">
                    <label for="in1"
                        >وصف المناسبة <span class="text-red-600">*</span></label
                    >
                    <textarea
                        name=""
                        id=""
                        cols="30"
                        v-model="textarea"
                        rows="10"
                        class="resize-none p-3 outline-none rounded-2xl mt-5"
                    ></textarea>
                </div>
            </div>
        </div>
        <div
            class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto selectSc"
        >
            <div class="flex flex-col">
                <label for="in2" class="my-5"
                    >اختيار المدارس<span class="text-red-600">*</span></label
                >
                <div class="grid grid-cols-2 gap-40">
                    <div class="relative">
                        <i
                            class="fa-sharp fa-solid fa-chevron-down m-3 absolute left-0 top-5"
                        ></i>
                        <input
                            type="text"
                            @click="show = !show"
                            placeholder="اختيار مدرسة"
                            class="w-full cursor-pointer"
                            readonly
                        />
                        <transition name="fade">
                            <div
                                v-if="show"
                                class="flex flex-wrap overflow-y-auto custom-scrollbar h-52 shadow-2xl rounded-2xl mt-6 absolute"
                            >
                                <div
                                    class="flex items-center justify-around w-full text-sm mt-5"
                                >
                                    <div>
                                        <span
                                            @click="selectAll()"
                                            class="cursor-pointer btn"
                                        >
                                            تحديد الكل
                                        </span>
                                    </div>
                                    <div>
                                        <span
                                            @click="clearAll()"
                                            class="cursor-pointer btn"
                                        >
                                            مسح الكل
                                        </span>
                                    </div>
                                </div>
                                <label
                                    v-for="school in schools"
                                    :key="school.id"
                                    class="container px-14 m-5 flex shadow-customPurple shadow-inner rounded-xl"
                                >
                                    <div
                                        class="flex gap-32 p-5 items-center justify-between"
                                    >
                                        <div>
                                            <input
                                                type="checkbox"
                                                :checked="isSelected(school)"
                                                @change="
                                                    toggleSelection(school)
                                                "
                                            />
                                            <div class="checkmark"></div>
                                        </div>

                                        <span class="">
                                            {{ school.name }}
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </transition>
                    </div>

                    <div class="relative h-80">
                        <span>المدارس المختارة</span>
                        <div class="flex flex-wrap mt-10 gap-5 overflow-y-auto">
                            <span
                                v-for="(
                                    selectedSchool, index
                                ) in selectedSchools"
                                :key="index"
                                class="shadow-lg p-5 bg-customPurple text-white rounded-full"
                                >{{ selectedSchool.name }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-5 mt-10 flex items-center justify-end sm:gap-5">
            <button
                class="w-60"
                @click="addEvent"
                :class="{ disabledBtn: close }"
                :disabled="close"
            >
                حفظ
            </button>
            <button class="w-48" @click="this.$router.replace('/Admin/Event')">
                الغاء
            </button>
        </div>
    </section>
    <Footer_Component></Footer_Component>
</template>
<script>

import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            name: "",
            textarea: "",
            time: "",
            date: "",
            SchoolIDs: [],
            selectedSchools: [],
            show: false,
        };
    },
    computed: {
        ...mapGetters(["schools", "fetchSchoolsStatus"]),
    },
    async mounted() {
        await this.fetchSchools();
    },
    methods: {
        ...mapActions(["fetchSchools","SetEvent"]),
        formatTime(time) {
            const [hours, minutes, seconds] = time.split(":");
            const formattedHours = ("0" + hours).slice(-2);
            const formattedMinutes = ("0" + minutes).slice(-2);
            return `${formattedHours}:${formattedMinutes} `;
        },
        validInputs() {
            console.log(this.formatTime(this.time));
            console.log(this.date);
            console.log(this.SchoolID);
        },
        async addEvent() {
            try {
                const data = {
                    name: this.name,
                    description: this.textarea,
                    date: this.date,
                    time: this.formatTime(this.time),
                    schools: this.SchoolIDs,
                };
                await this.SetEvent(data);
            } catch (err) {
                console.log(err);
            }
        },
        toggleSelection(school) {
            if (this.isSelected(school)) {
                this.selectedSchools = this.selectedSchools.filter(
                    (selectedId) => selectedId !== school.id
                );
            } else {
                this.selectedSchools.push(school);
                this.SchoolIDs.push(school.id);
            }
        },
        isSelected(school) {
            return this.selectedSchools.some(
                (selected) => selected.id === school.id
            );
        },
        selectAll() {
            this.selectedSchools = [];
            this.selectedSchools = [...this.schools];
            this.SchoolIDs = this.schools.map((school) => school.id);
        },
        clearAll() {
            this.selectedSchools = [];
            this.SchoolIDs = [];
        },
        
    },
};
</script>
<style scoped>
@import url("../../../../../UI/CustomsCss/CustomInput.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("./add_event.css");
</style>
