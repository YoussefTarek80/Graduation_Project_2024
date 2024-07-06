<template>
    <div class="card rounded-2xl w-full">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 p-0 sm:p-10 m-5 rounded-xl bg-[#f2f2f2]">
            <div class="p-5 pt-0">
                <div class="flex flex-col">
                    <label>إسم المُرسِل </label>
                    <input disabled type="text" class="item-data" v-model="form.parent_name" />
                </div>
                <div class="flex flex-col">
                    <!-- <input id="type" type="text" autocomplete="off" readonly v-model="form.type" /> -->
                    <label>نوع الطلب </label>
                    <input disabled type="text" class="item-data" value="تحويل" />
                </div>
                <div class="flex flex-col">
                    <label>اسم الطالب</label>
                    <input disabled type="text" class="item-data" v-model="form.name">
                </div>
                <div class="flex flex-col">
                    <label>رقم القومي الطالب</label>
                    <input disabled type="text" class="item-data" v-model="form.student_national_id">
                </div>
                <div class="flex flex-col">
                    <label>الجنسية</label>
                    <input disabled type="text" class="item-data" v-model="form.nationality">
                </div>
                <div class="flex flex-col">
                    <label>النوع</label>
                    <input disabled type="text" class="item-data" v-model="form.gender">
                </div>
            </div>
            <div class="p-5 pt-0">
                <div class="flex flex-col">
                    <label>البريد الإلكتروني للأب</label>
                    <input disabled type="text" class="item-data" v-model="form.parent_email">
                </div>
                <div class="flex flex-col">
                    <label>العنوان</label>
                    <input disabled type="text" class="item-data" v-model="form.parent_address">
                </div>
                <div class="flex flex-col">
                    <label>الهاتف</label>
                    <input disabled type="text" class="item-data" v-model="form.parent_phone">
                </div>
                <div class="flex flex-col">
                    <label>تاريخ الميلاد</label>
                    <input disabled type="text" class="item-data" v-model="form.birthdate">
                </div>
                <div class="flex flex-col">
                    <label>مهنة الأب</label>
                    <input disabled type="text" class="item-data" v-model="form.parent_job">
                </div>
                <div class="flex flex-col">
                    <label>عيد الميلاد</label>
                    <input disabled type="text" class="item-data" v-model="form.birthdate">
                </div>
            </div>

            <div class="mt-10 flex flex-col">
                <img :src="form.image" alt="الصورة الشخصية للطالب"
                    class="w-56 rounded-xl border-2 border-customPurple mx-auto">
                <img :src="form.childbirth_certificate" alt="شهادة ميلاد الطالب" :class="{ enlarged: isEnlarged }"
                    class="mt-10 w-80 border-2 border-customPurple
                    rounded-xl mt-5 mx-auto">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['form'],
}
</script>
<style scoped>
div label {
    margin-top: 16px;
    margin-bottom: -10px;
}
</style>