<template>
    <div class="card rounded-2xl">
        <div class="grid grid-cols-1 gap-5 p-0 sm:p-10 rounded-xl bg-[#f2f2f2]">
            <div class="w-full p-5 pt-0 flex flex-col justify-center">
                <div class="flex flex-col">
                    <label>إسم الموظف </label>
                    <input type="text" disabled class="item-data" v-model="form.name" />
                </div>
                <div class="flex flex-col">
                    <label>العنوان</label>
                    <input type="text" disabled class="item-data" v-model="form.address" />
                </div>
                <div class="flex flex-col">
                    <label>الهاتف</label>
                    <input type="text" disabled class="item-data" v-model="form.phone" />
                </div>
                <div class="flex flex-col">
                    <label>المادة</label>
                    <input type="text" disabled class="item-data" v-model="form.subject" />
                </div>
                <div class="flex flex-col">
                    <label>البريد الإلكتروني </label>
                    <input type="text" disabled class="item-data" v-model="form.email" />
                </div>
                <div class="flex flex-col">
                    <label>السيرة الذاتية</label>
                    <a class="text-center p-2 mt-5 border-2 border-customPurple bg-customPurple 
                    text-white rounded-xl hover:border-customDarkPurple hover:bg-white hover:text-customDarkPurple duration-400"
                        :href="form.cv" download="form.cv">تحميل الملف</a>
                </div>
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