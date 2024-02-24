<template>
    <Navbar_Component></Navbar_Component>
    <section class="m-5" data-aos="fade-up" data-aos-duration="2000">
        <div class="flex items-center justify-between">
            <div class="flex flex-col">
                <span class="sm:text-3xl text-2xl">قائمة المدارس</span>
                <i
                    class="fa-regular fa-horizontal-rule fa-2xl text-customPink"
                ></i>
            </div>
            <button
                class="sm:w-80 flex justify-around items-center"
                @click="this.$router.push('/Admin/Schools/addSchool')"
            >
                <span class="sm:text-xl text-lg">اضافة مدرسة جديدة</span>
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        <div
            class="bg-customSearch flex items-center justify-around p-5 mt-6 rounded-xl flex-wrap sm:space-y-0 space-y-6"
        >
            <div class="relative sm:w-3/12 w-10/12">
                <input
                    type="text"
                    placeholder="بحث"
                    class="p-3 w-full rounded-2xl"
                />
                <i
                    class="fa-thin fa-magnifying-glass absolute left-5 top-4"
                ></i>
            </div>
            <div class="relative sm:w-3/12 w-10/12">
                <select name="" id="" class="p-3 w-full rounded-2xl">
                    <option value="" disabled selected>ترتيب</option>
                    <option value="">1</option>
                    <option value="">1</option>
                    <option value="">1</option>
                </select>
            </div>
        </div>
        <div>
            <table_Component
                :items="items"
                :editRoute="'/Admin/Schools/updateSchool'"
                :infoRoute="'/Admin/Schools/InfoSchool'"
            ></table_Component>
        </div>
    </section>
    <Footer_Component></Footer_Component>
</template>
<script>
import table_Component from "../../../../UI/Table.vue";
export default {
    components: { table_Component },
    inject: ["items"],
    data() {
        return {
            showInfo: false,
        };
    },
};
</script>

<style scoped>
@import url("./schools.css");
@import url("../../../../UI/Custombutton.css");
</style>
