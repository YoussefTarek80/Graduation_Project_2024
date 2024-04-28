<template>
    <sc-navbar-comp></sc-navbar-Comp>
    <BaseTeleport :show="success">
        <div class="flex flex-col">
            <span class="text-green-700 text-4xl"> تم التعديل بنجاح </span>
            <i class="fa-sharp fa-solid fa-badge-check text-green-700 text-7xl m-3"></i>
        </div>
    </BaseTeleport>
    <BaseTeleport :show="failed">
        <div class="flex flex-col">
            <span class="text-red-700 text-4xl"> فشل التعديل</span>
            <i class="fa-sharp fa-solid fa-badge-check text-red-700 text-7xl m-3"></i>
        </div>
    </BaseTeleport>
    <section class="m-6 sm:m-16 z-50 " data-aos="fade-up" data-aos-duration="1000">
        <div class="flex flex-col items-center">
            <span class="text-3xl sm:text-4xl">تعديل بيانات مدير الكنترول </span>
            <i class="fa-regular fa-horizontal-rule fa-2xl text-customPink mt-2"></i>
        </div>
        <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full mx-auto pt-12">
            <div class="input_Div grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="flex flex-col">
                    <label for="">إسم مدير الكنترول<span class="text-red-600">*</span></label>
                    <input type="text" v-model="controller.name" placeholder="أكتب إسم المدير..."
                        class="outline-customDarkPurple" />
                    <span v-if="controller.name == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
                </div>
                <div class="flex flex-col">
                    <label for="">العمر<span class="text-red-600">*</span></label>
                    <input type="text" v-model="controller.age" placeholder="كم عمر المدير..."
                        class="outline-customDarkPurple" />
                    <span v-if="controller.age == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
                </div>
                <div class="flex flex-col">
                    <label for="">العنوان<span class="text-red-600">*</span></label>
                    <input type="text" v-model="controller.address" placeholder="أكتب العنوان..."
                        class="outline-customDarkPurple" />
                    <span v-if="controller.address == '' && empty" class="text-red-600">هذا الحقل مطلوب</span>
                </div>
                <div class="flex flex-col">
                    <label for="">الدور الوظيفي<span class="text-red-600">*</span></label>
                    <div class="custom-select relative">
                        <select v-model="controller.role"
                            class="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-customDarkPurple">
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
            id: this.$route.params.id,
            controller: {},
            success: false,
            failed: false,
            empty: false
        }
    },
    computed: {
        ...mapGetters(["GetControllers"]),
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
            this.controller = this.GetControllers[this.id];
        },
        async handleUpdateController() {
            try {
                if (this.controller.name != '' && this.controller.address != '' && this.controller.age != '') {
                    await this.UpdateController({
                        id: this.controller.id,
                        name: this.controller.name,
                        age: this.controller.age,
                        address: this.controller.address,
                        role: this.controller.role
                    });
                    this.success = true;
                    setTimeout(() => { this.success = false }, 1000);
                    console.log("Controller Info Updated Successfully");
                }
                else {
                    this.empty = true;
                    this.failed = true;
                    setTimeout(() => { this.failed = false; }, 1000);
                }
            } catch (err) {
                this.failed = true;
                setTimeout(() => { this.failed = false; }, 1000);
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