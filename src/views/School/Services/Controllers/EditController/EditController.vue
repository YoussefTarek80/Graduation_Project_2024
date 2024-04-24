<template>
    <sc-navbar-comp></sc-navbar-Comp>
    <BaseTeleport :show="success">
        <div class="flex flex-col">
            <span class="text-green-700 text-4xl"> تم التعديل بنجاح </span>
            <i class="fa-sharp fa-solid fa-badge-check text-green-700 text-7xl m-3"></i>
        </div>
    </BaseTeleport>
    <section class="m-6 sm:m-16 z-50 " data-aos="fade-up" data-aos-duration="1000">
        <div class="flex flex-col items-center">
            <span class="text-3xl sm:text-4xl">تعديل بيانات مدير الكنترول </span>
            <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
        </div>
        <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto pt-12">
            <div class="input_Div grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div class="flex flex-col">
                    <label for="in1">اسم مدير الكنترول
                        <span class="text-red-600">*</span></label>
                    <input @input="validInputs" type="text" v-model="name" id="in1" class="outline-customDarkPurple" />
                </div>
                <div class="flex flex-col">
                    <label for="in1">العمر <span class="text-red-600">*</span></label>
                    <input @input="validInputs" type="text" v-model="age" id="in1" class="outline-customDarkPurple" />
                </div>
                <div class="flex flex-col">
                    <label for="in1">العنوان
                        <span class="text-red-600">*</span></label>
                    <input @input="validInputs" type="text" v-model="address" id="in1"
                        class="outline-customDarkPurple" />
                </div>
                <div class="flex flex-col">
                    <label for="in7">الدور الوظيفي <span class="text-red-600">*</span></label>
                    <div class="custom-select relative">
                        <select v-model="role" @change="validInputs"
                            class="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-customDarkPurple">
                            <option value="" selected>حدد الدور الوظيفي...</option>
                            <option value="كنترول إزالة ملف">كنترول إزالة ملف</option>
                            <option value="كنترول تصحيح">كنترول تصحيح </option>
                            <option value="كنترول تحويل الطلاب">كنترول تحويل الطلاب </option>
                            <option value="كنترول تسجيل الطلاب">كنترول تسجيل الطلاب </option>
                        </select>
                        <div class="arrow absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                            <i class="fa-regular fa-angle-down"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-5 mt-10 flex items-center justify-end sm:gap-5">
            <button class="w-60" @click="handleUpdateController" :class="{ disabledBtn: close }" :disabled="close">
                حفظ
            </button>
            <button class="w-48" @click="this.$router.replace('/School/Services/Controllers/')">
                الغاء
            </button>
        </div>
    </section>
    <Footer_Component></Footer_Component>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            name: "",
            time: "",
            date: "",
            status: "",
            textarea: "",
            Eventschools: [],
            EventSchoolsID: [],
            controller: {},
            success: false,
            show: false
        }
    },
    computed: {
        ...mapGetters(["GetControllers",]),
    },
    async mounted() {
        await this.fetchController();
    },
    methods: {
        ...mapActions(["FetchControllers", "UpdateController"]),
        formatTime(time) {
            const [hours, minutes, seconds] = time.split(":");
            const formattedHours = ("0" + hours).slice(-2);
            const formattedMinutes = ("0" + minutes).slice(-2);
            return `${formattedHours}:${formattedMinutes} `;
        },
        async fetchController() {
            try {
                await this.FetchControllers();
                const index = this.$route.params.id;
                this.controller = this.GetControllers.find(
                    (controller) => controller.id === parseInt(index)
                );
                this.intiData();
            } catch (err) {
                console.error(err);
            }
        },
        intiData() {
            this.name = this.controller.name;
            this.age = this.controller.age;
            this.role = this.controller.role;
            this.address = this.controller.address;
        },
        async handleUpdateController() {
            try {
                await this.UpdateController({
                    updateData: {
                        name: this.name,
                        role: this.role,
                        address: this.address,
                        age: this.age
                    },
                    id: this.controller.id
                });
                console.log("Controller Info Updated Successfully");
                this.success = true;
                setTimeout(() => {
                    this.success = false;
                }, 1000);
            } catch (err) {
                this.failed = true;
                setTimeout(() => {
                    this.failed = false;
                }, 1000);
            }
        },
    }
}
</script>


<style scoped>
@import url("../../../../../UI/CustomsCss/CustomInput.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
@import url("../../Events/Update_Event/updateEvent.css");
</style>