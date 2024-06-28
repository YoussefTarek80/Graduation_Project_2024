<template>
    <sc-navbar-comp></sc-navbar-comp>
    <section class="m-10" data-aos="fade-up" data-aos-duration="1000">
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
    </section>
    <section class="mt-20 sm:mx-24 mx-6" data-aos="fade-up" data-aos-duration="1000">
        <div class="flex flex-col">
            <span class="sm:text-3xl text-2xl font-bold">درجات طلاب المادة </span>
            <span class="w-2/12 h-1 bg-black m-1 rounded-2xl"></span>
        </div>
        <FilterComponent :items="GetStudents" :Subject="true"></FilterComponent>
        <GradeTable :items="students">
        </GradeTable>
    </section>
    <Footer_Component></Footer_Component>
</template>

<script>
import FilterComponent from '../../../../../components/School/Filtration/Filter-school.vue'
import GradeTable from '../../../../../UI/Tables/GradesTable/Table.vue'
import { mapGetters, mapActions } from 'vuex';
import { reactive } from 'vue';
export default {
    components: { GradeTable, FilterComponent },
    props: {
        levelID: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            id: this.$route.params.id,
            students: [],
            success: false,
            failed: false,
        };
    },
    computed: {
        ...mapGetters(["GetStudSubject"]),
        totalPages() {
            return Math.ceil(this.items.length / this.pageSize);
        },
        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.items.slice(startIndex, endIndex);
        },
    },
    created() {
        console.log(this.id);
        this.fetchData();
    },
    methods: {
        ...mapActions(["fetchStudSubject"]),
        initData() {
            this.students = this.GetStudSubject;
        },
        async fetchData() {
            try {
                await this.fetchStudSubject(this.id);
                this.initData();
            } catch (error) {
                console.error(error);
            }
        },
        infoRoute(index) {
            return `${this.infoRoute}/${index}`;
        },
        editRoute(index) {
            return `${this.editRoute}/${index}`;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        toggleShowInfo(index) {
            if (this.showInfo === index) {
                this.showInfo = null;
            } else {
                this.showInfo = index;
            }
        },
        handleDeleteEvent(id) {
            this.$emit("delete-event", id);
            this.showInfo = null;
            this.confirm = false;
        },
        closeActionWindow(event) {
            if (!this.$refs.tableBody.contains(event.target)) {
                this.showInfo = null;
            }
        },
    },
}
</script>
<style scoped>
@import url('../../../../../UI/CustomsCss/Custombutton.css');
</style>