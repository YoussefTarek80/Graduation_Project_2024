<template>
    <div>
        <Navbar_Component></Navbar_Component>
        <section
            class="m-6 sm:m-16"
            data-aos="fade-up"
            data-aos-duration="1000"
        >
            <div class="flex flex-col">
                <span class="sm:text-3xl text-2xl">قائمة المدرسين</span>
                <i
                    class="fa-regular fa-horizontal-rule fa-2xl text-customPink"
                ></i>
            </div>
            <FilterComponent
                :filteredArray="filtered_Array"
                @filter="handleFilter"
                :MainArray="Students"
                :Schools="schools"
                :nationalIDS="true"
            ></FilterComponent>
            <div class="relative">
                <table_Component
                    :items="teachers"
                    :infoRoute="'/Admin/Students/InfoStudent'"
                ></table_Component>
            </div>
        </section>
        <Footer_Component></Footer_Component>
    </div>
</template>
<script>
import table_Component from "../../../../UI/Tables/TeacherTable/Table.vue";
import FilterComponent from "../../../../components/Admin/Filtration/Filter.vue";
export default {
    components: { table_Component,FilterComponent },
    data() {
        return {
            teachers: [
                {
                    id: 1,
                    schoolname: "السعيدية",
                    schoolAdminstration: "الجيزة",
                    Teachername: "احمد حسام",
                    TeachernationalID: "024144657498798354",
                },
                {
                    id: 2,
                    schoolname: "السعيدية",
                    schoolAdminstration: "الجيزة",
                    Teachername: "احمد حسام",
                    TeachernationalID: "024144657498798354",
                },
                {
                    id: 3,
                    schoolname: "السعيدية",
                    schoolAdminstration: "الجيزة",
                    Teachername: "احمد حسام",
                    TeachernationalID: "024144657498798354",
                },
                {
                    id: 4,
                    schoolname: "السعيدية",
                    schoolAdminstration: "الجيزة",
                    Teachername: "احمد حسام",
                    TeachernationalID: "024144657498798354",
                },
                {
                    id: 5,
                    schoolname: "السعيدية",
                    schoolAdminstration: "الجيزة",
                    Teachername: "احمد حسام",
                    TeachernationalID: "024144657498798354",
                },
                {
                    id: 6,
                    schoolname: "السعيدية",
                    schoolAdminstration: "الجيزة",
                    Teachername: "احمد حسام",
                    TeachernationalID: "024144657498798354",
                },
            ],
        };
    },
};
</script>
