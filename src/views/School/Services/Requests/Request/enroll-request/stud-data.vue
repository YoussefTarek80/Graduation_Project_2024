<template>
    <div class="card rounded-2xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 p-0 sm:p-10 rounded-xl bg-[#f2f2f2]">
            <div class="p-5 pt-0">
                <div class="inputGroup2 sm:w-full">
                    <input id="email" type="text" autocomplete="off" readonly v-model="form.parent_name" />
                    <label for="email" class="mx-3.5 font-bold">إسم المُرسِل </label>
                </div>
                <div class="inputGroup2 sm:w-full">
                    <input id="type" type="text" autocomplete="off" readonly v-model="form.type" />
                    <label for="type" class="mx-3.5 font-bold">نوع الطلب </label>
                </div>
                <div class="inputGroup2 sm:w-full">
                    <input type="text" required="" autocomplete="off" readonly v-model="form.name">
                    <label for="" class="mx-3.5 font-bold">اسم الطالب</label>
                </div>
                <div class="inputGroup2 sm:w-full">
                    <input type="text" required="" autocomplete="off" readonly v-model="form.student_national_id">
                    <label for="" class="mx-3.5 font-bold">رقم القومي الطالب</label>
                </div>
                <div class="inputGroup2 sm:w-full">
                    <input type="text" required="" autocomplete="off" readonly v-model="form.parent_nationality">
                    <label for="" class="mx-3.5 font-bold">الجنسية</label>
                </div>
            </div>
            <div class="p-5 pt-0">
                <div class="inputGroup2 sm:w-full">
                    <input type="text" required="" autocomplete="off" readonly v-model="form.parent_email">
                    <label for="" class="mx-3.5 font-bold">البريد الإلكتروني للأب</label>
                </div>
                <div class="inputGroup2 sm:w-full">
                    <input type="text" required="" autocomplete="off" readonly v-model="form.parent_address">
                    <label for="" class="mx-3.5 font-bold">العنوان</label>
                </div>
                <div class="inputGroup2 sm:w-full">
                    <input type="text" required="" autocomplete="off" readonly v-model="form.parent_phone">
                    <label for="" class="mx-3.5 font-bold">الهاتف</label>
                </div>
                <div class="inputGroup2 sm:w-full">
                    <input type="date" required="" autocomplete="off" readonly v-model="form.birthdate">
                    <label for="" class="mx-3.5 font-bold">تاريخ الميلاد</label>
                </div>
                <div class="inputGroup2 sm:w-full">
                    <input type="text" required="" autocomplete="off" readonly v-model="form.parent_job">
                    <label for="" class="mx-3.5 font-bold">مهنة الأب</label>
                </div>
            </div>
            <div class="p-5 pt-0">
                <div class="inputGroup2 sm:w-full">
                    <input type="text" required="" autocomplete="off" readonly v-model="form.gender">
                    <label for="" class="mx-3.5 font-bold">النوع</label>
                </div>
                <div class="inputGroup2 sm:w-full">
                    <input type="text" required="" autocomplete="off" readonly v-model="form.birthdate">
                    <label for="" class="mx-3.5 font-bold">عيد الميلاد</label>
                </div>
                <img :src="form.image" class="w-80 mx-auto rounded-full p-5 border-2 border-gray-500">
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
.inputGroup {
    margin: 2.5em 0 1em 0;
    position: relative;
}

.inputGroup input,
textarea {
    font-size: 100%;
    padding: 0.8em;
    outline: none;
    border: 2px solid rgb(200, 200, 200);
    background-color: transparent;
    border-radius: 20px;
    width: 100%;
}

.inputGroup label {
    font-size: 100%;
    position: absolute;
    right: 0;
    padding: 0.8em;
    margin-right: 0.5em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: rgb(100, 100, 100);
    background: transparent;
    white-space: nowrap;
}

.inputGroup :is(textarea:focus, input:focus, input:valid, textarea:valid)~label {
    transform: translateY(-70%) scale(0.9);
    margin: 0;
    margin-right: 0.5em;
    padding: 1.5em;
    background-color: transparent;
}

.inputGroup :is(textarea:focus, input:focus, input:valid, textarea:valid) {
    border-color: rgb(150, 150, 200);
}

.inputGroup2 {
    margin: 2.5em 0 1em 0;
    position: relative;
}

.inputGroup2 input {
    font-size: 100%;
    padding: 0.8em;
    outline: none;
    border: 2px solid rgb(200, 200, 200);
    background-color: transparent;
    border-radius: 20px;
    width: 100%;
}

.inputGroup2 label {
    font-size: 90%;
    position: absolute;
    right: 0;
    top: -40px;
    padding: 0.8em;
    margin-right: 0.5em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: rgb(100, 100, 100);
    background: transparent;
    white-space: nowrap;
}

.inputGroup2:read-only {
    background: linear-gradient(to right, rgba(232, 230, 230, 0.62), #fdfdfd);
    border-radius: 20px;
    outline: none;
}

@media (max-width:756px) {
    .inputGroup2 input {
        width: 100%;
    }
}
</style>