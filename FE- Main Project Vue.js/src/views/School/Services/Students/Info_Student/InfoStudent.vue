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

    <section class="mt-20 sm:mx-36" data-aos="fade-up" data-aos-duration="1000">
        <div class="bg-customBGCards rounded-xl shadow-xl p-6 sm:w-full">
            <div class="my-5">
                <span class="text-2xl">بيانات الطالب</span>
            </div>
            <form action="" @submit.prevent="update">
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-6">
                    <div class="flex flex-col">
                        <label for="in1">اسم الطالب</label>
                        <input v-model="this.getStudInfo.name" disabled id="email" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in1">المستوي الدراسي</label>
                        <input v-model="this.getStudInfo.level" disabled id="level" value="" type="text"
                            class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in2">مكان المنشأ/الاقامة</label>
                        <input disabled v-model=this.getStudInfo.address id="country" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in3">الرقم القومي</label>
                        <input v-model="this.getStudInfo.nationalId" disabled id="nId" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in4">العنوان</label>
                        <input v-model="this.getStudInfo.detailedAddress" id="address" type="text" class="item-data" />
                    </div>
                </div>
                <div class="m-5 flex items-center justify-end">
                    <button class="w-60">حفظ</button>
                </div>
            </form>
        </div>

        <div class="bg-customBGCards rounded-xl shadow-xl p-6 mt-10 sm:w-full">
            <div class="my-5">
                <span class="text-2xl">بيانات الأب </span>
            </div>
            <form action="" @submit.prevent>
                <div class="input_Div grid grid-cols-1 sm:grid-cols-4 gap-6">
                    <div class="flex flex-col">
                        <label for="in1">اسم الأب</label>
                        <input disabled v-model="this.getStudInfo.parentName" id="parentName" type="text"
                            class="item-data" />
                        <!-- <input disabled :value="GetUser.adminstration_name" id="email" placeholder=" العنوان "
                            type="text" class="item-data" /> -->
                    </div>
                    <div class="flex flex-col">
                        <label for="in2">الدولة</label>
                        <input disabled v-model="this.getStudInfo.country" id="country" type="text" class="item-data" />
                    </div>
                    <div class="flex flex-col">
                        <label for="in3">الجنسية</label>
                        <input disabled v-model="this.nationality" id="email" type="text" class="item-data" />
                        <!-- <input disabled :value="GetUser.adminstration_address" id="email" placeholder=" العنوان "
                            type="text" class="item-data" /> -->
                    </div>
                    <div class="flex flex-col" v-if="!this.isAppriate">
                        <label for="in4">المحافظة</label>
                        <input disabled v-model="this.getStudInfo.state" id="state" type="text" class="item-data" />
                        <!-- <input disabled :value="GetUser.adminstration_State" id="email" placeholder=" العنوان "
                            type="text" class="item-data" /> -->
                    </div>
                    <div class="flex flex-col">
                        <label for="in5">المهنة</label>
                        <!-- <input disabled :value="GetUser.adminstration_Phone" id="email" placeholder=" العنوان "
                            type="text" class="item-data" /> -->
                        <input disabled v-model="this.getStudInfo.parentPassion" id="parentJop" type="text"
                            class="item-data" />
                    </div>
                </div>
            </form>
        </div>
    </section>

    <Footer_Component></Footer_Component>
</template>
<script>
export default {
    inject: ['students'],
    data() {
        return {
            isAppriate: false,
            nationality: "",
            imageURL: null,
            profileArray: [],
            name: "",
            parentName: "",
            parentPassion: "",
            address: "",
            saved: false,
            success: false,
            failed: false,
        };
    },
    computed: {
        getStudInfo() {
            const object =
            {
                id: this.$route.params.id,
                name: this.students[this.$route.params.id].name,
                parentName: this.students[this.$route.params.id].parent,
                parentPassion: this.students[this.$route.params.id].parentPassion,
                nationalId: this.students[this.$route.params.id].nationalID,
                level: this.students[this.$route.params.id].level,
                nationality: this.students[this.$route.params.id].nationality,
                country: this.students[this.$route.params.id].country,
                address: this.students[this.$route.params.id].address,
                detailedAddress: this.students[this.$route.params.id].detailedAddress,
                state: this.students[this.$route.params.id].state,
            }
            return object;
        },
    },
    created() {
        this.isEgyptien(this.getStudInfo.nationality)
        console.log(this.nationality);
    },
    methods: {
        isEgyptien(nv) {
            if (nv === "مصري") {
                this.nationality = 'مصري';
                this.isAppriate = false;
            }
            else {
                this.isAppriate = true;
                this.nationality = this.getStudInfo.nationality + '- مغترب';
            }
        }
    },
};
</script>
<style scoped>
@import url("../../../Profile/profile.css");
@import url("../../../../../UI/CustomsCss/Custombutton.css");
</style>