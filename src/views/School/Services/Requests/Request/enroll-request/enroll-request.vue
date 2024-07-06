<template>
    <div>
        <sc-navbar-comp></sc-navbar-Comp>

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

        <section class="flex flex-col items-center w-full mt-6" data-aos="fade-up" data-aos-duration="1000">
            <div class="flex flex-col">
                <span class="sm:text-3xl text-2xl font-bold">بيانات الطلب </span>
                <span class="w-11/12 h-1 bg-black m-1 rounded-2xl"></span>
            </div>
            <div class="p-2 sm:p-5">
                <stud_form :form="request">
                </stud_form>
                <div class="flex flex-row flex-wrap justify-center" v-if="request.request_status == -1">
                    <div class="m-5">
                        <button @click="accept()" class="w-25 sm:w-40 md:w-60">موافقة علي الطلب</button>
                    </div>
                    <div class="m-5">
                        <button @click="reject()" class="w-25 sm:w-40 md:w-60">رفض الطلب</button>
                    </div>
                </div>
            </div>
        </section>
        <Footer_Component></Footer_Component>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import stud_form from './stud-data.vue';

export default {
    data() {
        return {
            id: this.$route.params.id,
            request: {},
            success: false,
            failed: false,
        }
    },
    computed: {
        ...mapGetters(['GetUser2', 'Get_SCRequests']),
    },
    async created() {
        await this.fetchData();
        console.log(this.request);
    },
    methods: {
        ...mapActions(['FetchSCRequests', 'AcceptEnrollStudent']),
        initData() {
            this.request = this.Get_SCRequests.find((request) => request.id == parseInt(this.id));
            // this.request = this.Get_SCRequests[this.id];
        },
        async fetchData() {
            try {
                await this.FetchSCRequests();
                this.initData();
            }
            catch (error) {
                throw `Something went wrong! ${error}`;
            }
        },
        async accept() {
            try {
                const form = new FormData();
                form.append('status', 1);
                await this.AcceptEnrollStudent({ id: this.request.id, status: form });
                this.fetchData();
                this.success = true;
                setTimeout(() => { this.success = false; }, 1000);
            }
            catch (err) {
                console.log(err);
                this.failed = true;
                setTimeout(() => {
                    this.failed = false;
                }, 1000);
            }
        },
        async reject() {
            try {
                const form = new FormData();
                form.append('status', 0);
                await this.AcceptEnrollStudent({ id: this.request.id, status: form });
                this.fetchData();
                this.success = true;
                setTimeout(() => { this.success = false; }, 1000);
            }
            catch (err) {
                console.log(err);
                this.failed = true;
                setTimeout(() => {
                    this.failed = false;
                }, 1000);
            }
        },
    },
    components: {
        stud_form,
    }
}
</script>
<style scoped>
@import url('../../../../../../UI/CustomsCss/Custombutton.css');
</style>