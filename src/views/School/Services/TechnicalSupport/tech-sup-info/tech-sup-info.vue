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

    <section class="mb-24 mt-20 flex justify-center items-center w-full" data-aos="fade-up" data-aos-duration="1000">
        <div class="p-2 sm:p-5 w-10/12 md:w-8/12 sm:p-10 rounded-xl bg-[#f2f2f2]">
            <div class="flex flex-col items-center justify-start">
                <div class="w-full flex m-2 md:m-5 pr-5">
                    <h3 class="text-customPurple font-bold text-sm md:text-xl"> الإستفسار:</h3>
                    <p class="pr-4 text-customPurple text-sm md:text-xl">{{ query.description }}</p>
                </div>
                <div class="w-full pr-4 flex items-center ">
                    <p class="font-bold text-customPurple text-sm md:text-xl">ضع ردك هنا </p>
                    <i class="border-2 border-customPurple rounded-3xl p-1 mr-2 fa-duotone fa-arrow-down"></i>
                </div>
                <div class="w-full">
                    <textarea type="text" :disabeld="state" autofocus placeholder="أكتب ردك هنا..."
                        v-model="query.answer"
                        class="resize-none w-full h-32 mt-4 p-4 border-2 border-customPurple text-sm md:text-1/2xl rounded-xl focus:border-2 focus:border-customPurple"></textarea>
                </div>
            </div>
            <div class="text-left" v-if="this.state === false">
                <button @click="confirm = true"
                    class="flex items-center border-2 border-customPurple m-5 p-2 md:p-3 rounded-3xl bg-customPurple 
                            text-white font-bold hover:bg-white hover:text-customPurple transition-colors duration-200">
                    إرسال الرد
                    <i class="pr-3 fa-duotone fa-arrow-left"></i>
                </button>
                <BaseTeleport :show="confirm">
                    <div class="flex flex-col">
                        <span class="text-red-700 text-4xl">
                            تاكيد الإرسال ؟
                        </span>
                        <div class="flex items-center justify-around mt-10">
                            <button class="w-96" @click="handleAnswer">
                                تاكيد
                            </button>
                            <button class="w-52" @click="confirm = false">
                                الغاء
                            </button>
                        </div>
                    </div>
                </BaseTeleport>
            </div>
        </div>
    </section>

    <Footer_Component></Footer_Component>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            id: this.$route.params.id,
            query: {},
            state: false,
            confirm: false,
            success: false,
            failed: false,
        };
    },
    computed: {
        ...mapGetters(["GetQueries"]),
    },
    created() {
        this.fetchData();
        console.log(this.query);
        this.state = (this.query.answer ? true : false);
        console.log(this.state);
    },
    methods: {
        ...mapActions(["FetchChatQueries", "AnswerQuery"]),
        initData() {
            this.query = this.GetQueries[this.id];
        },
        async fetchData() {
            try {
                await this.FetchChatQueries();
                this.initData();
            } catch (error) {
                console.error("Error fetching student info:", error);
            }
        },
        async handleAnswer() {
            try {
                console.log(this.query.answer);
                await this.AnswerQuery({ id: this.query.id, answer: this.query.answer });
                this.confirm = false;
                this.state = true;
            }
            catch (err) {
                console.log(err);
            }
        }
    },
}
</script>
<style scoped>
textarea[disabled] {
    background-color: #fff;
}

/* @import url('../../../../../UI/CustomsCss/Custombutton.css');*/
</style>