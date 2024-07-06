<template>
    <div class="card rounded-2xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 p-0 sm:p-10 rounded-xl bg-[#f2f2f2]">
            <div class="p-5 ">
                <div class="flex flex-col">
                    <label>إسم المُرسِل </label>
                    <input type="text" disabled class="item-data" v-model="form.parent_name" />
                </div>
                <div class="flex flex-col">
                    <label>نوع الطلب </label>
                    <input type="text" disabled class="item-data" v-model="form.type" />
                </div>
                <div class="flex flex-col">
                    <label>اسم الطالب</label>
                    <input type="text" disabled class="item-data" v-model="form.name">
                </div>
                <div class="flex flex-col">
                    <label>رقم القومي الطالب</label>
                    <input type="text" disabled class="item-data" v-model="form.student_national_id">
                </div>
                <div class="flex flex-col">
                    <label>الجنسية</label>
                    <input type="text" disabled class="item-data" v-model="form.parent_nationality">
                </div>
                <div class="flex flex-col">
                    <label for="">عيد الميلاد</label>
                    <input type="text" disabled class="item-data" v-model="form.birthdate">
                </div>
            </div>
            <div class="p-5 ">
                <div class="flex flex-col">
                    <label>البريد الإلكتروني للأب</label>
                    <input type="text" disabled class="item-data" v-model="form.parent_email">
                </div>
                <div class="flex flex-col">
                    <label>العنوان</label>
                    <input type="text" disabled class="item-data" v-model="form.parent_address">
                </div>
                <div class="flex flex-col">
                    <label>الهاتف</label>
                    <input type="text" disabled class="item-data" v-model="form.parent_phone">
                </div>
                <div class="flex flex-col">
                    <label>تاريخ الميلاد</label>
                    <input type="text" disabled class="item-data" v-model="form.birthdate">
                </div>
                <div class="flex flex-col">
                    <label>مهنة الأب</label>
                    <input type="text" disabled class="item-data" v-model="form.parent_job">
                </div>
                <div class="flex flex-col">
                    <label for="">النوع</label>
                    <input type="text" disabled class="item-data" v-model="form.gender">
                </div>
            </div>
            <div class="mt-10 container flex flex-col">
                <img :src="form.image" alt="الصورة الشخصية للطالب"
                    class="mt-10 w-80 mx-auto rounded-xl border-2 border-customPurple">
                <img :src="form.image" alt="شهادة ميلاد الطالب"
                    class="mt-10 w-80 mx-auto rounded-xl border-2 border-customPurple">
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