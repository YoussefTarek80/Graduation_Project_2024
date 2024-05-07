<template>
    <div>
        <sc-navbar-comp></sc-navbar-Comp>
        <section class="flex flex-col items-center w-full mt-6" data-aos="fade-up" data-aos-duration="1000">
            <div class="flex flex-col">
                <span class="sm:text-3xl text-2xl font-bold">بيانات الطلب </span>
                <span class="w-11/12 h-1 bg-black m-1 rounded-2xl"></span>
            </div>
            <div class="p-2 sm:p-5">
                <stud_form :form="request">
                </stud_form>
                <div class="flex flex-row flex-wrap justify-center" v-if="!accepted">
                    <div class="m-5">
                        <button @click="accept()" class="w-25 sm:w-40 md:w-60">موافقة</button>
                    </div>
                    <div class="m-5">
                        <button @click="reject()" class="w-25 sm:w-40 md:w-60">رفض</button>
                    </div>
                </div>
            </div>
        </section>
        <Footer_Component></Footer_Component>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import stud_form from '../../../../../components/School/stud-data.vue';

export default {
    data() {
        return {
            id: this.$route.params.id,
            request: {},
            accepted: false,
        }
    },
    computed: {
        ...mapGetters(['GetUser2', 'Get_SCRequests']),
    },
    created() {
        this.fetchData();
    },
    methods: {
        ...mapActions(['FetchSCRequests', 'AcceptEnrollStudent']),
        initData() {
            this.request = this.Get_SCRequests[this.$route.params.id];
        },
        async fetchData() {
            try {
                await this.FetchSCRequests();
                this.initData();
                console.log(this.request.request_status);
                if (this.request.request_status == 1 ||
                    this.request.request_status == 0) {
                    this.accepted = true;
                }
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
            }
            catch (err) {
                console.log(err);
            }
        },
        async reject() {
            try {
                const form = new FormData();
                form.append('status', 0);
                await this.AcceptEnrollStudent({ id: this.request.id, status: form });
            }
            catch (err) {
                console.log(err);
            }
        },
    },
    components: {
        stud_form,
    }
}
</script>
<style scoped>
@import url('./request.css');
</style>