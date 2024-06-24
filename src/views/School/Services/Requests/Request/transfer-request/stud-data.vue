<template>
    <div class="card rounded-2xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 p-0 sm:p-10 m-5 rounded-xl bg-[#f2f2f2]">
            <div class="p-5 pt-0">
                <div class="inputGroup2 sm:w-full">
                    <input id="email" type="text" autocomplete="off" readonly v-model="form.parent_name" />
                    <label for="email" class="mx-3.5 font-bold">إسم المُرسِل </label>
                </div>
                <div class="inputGroup2 sm:w-full">
                    <!-- <input id="type" type="text" autocomplete="off" readonly v-model="form.type" /> -->
                    <input id="type" type="text" autocomplete="off" readonly value="تحويل" />
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
                    <input type="text" required="" autocomplete="off" readonly v-model="form.nationality">
                    <label for="" class="mx-3.5 font-bold">الجنسية</label>
                </div>
                <div class="inputGroup2 sm:w-full">
                    <input type="text" required="" autocomplete="off" readonly v-model="form.gender">
                    <label for="" class="mx-3.5 font-bold">النوع</label>
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
                <div class="inputGroup2 sm:w-full">
                    <input type="text" required="" autocomplete="off" readonly v-model="form.birthdate">
                    <label for="" class="mx-3.5 font-bold">عيد الميلاد</label>
                </div>
            </div>
            <div class="p-5 pt-0">
                <img :src="form.image" class="w-80 mx-auto m-5 p-5 border-2 border-gray-500">
                <img :src="form.childbirth_certificate" class="w-80 mx-auto m-5 p-5 border-2 border-gray-500">
            </div>
        </div>

        <!-- <div class="w-full p-5 pt-0">
            <h2>الوصف :</h2>
            <span class="bg-black w-40 md:w-10 block h-0.5 m-2"></span>
            <p>إلى : <span>{{ "مصطفي كامل" }}</span></p>
            <p>العنوان : <span>{{ form.name }}</span></p>
            <p>الموضوع : طلب تحويل طالب من مدرسة إلى مدرسة</p><br>
            <span class="bg-black w-40 md:w-80 block h-0.5 m-2"></span>
            <p class="font-bold">السيد/السيدة مدير/ة ,<span>{{ form.name }}</span></p>
            <p>أتقدم إلى مقامكم الموقر بطلب تحويل ابني/ابنتي <span class="font-bold">{{ form.studname }}</span>
                ، الذي يدرس حاليًا في الصف <span>{{ form.level }}</span>
                بمدرسة <span>{{ form.currSchool }}</span>
                ، إلى مدرستكم الموقرة ابتداءً من العام الدراسي القادم <span>{{ form.schoolYear }}</span>.</p>
            <p>
                نظرًا لظروف <span class="font-bold">{{ form.reason }}</span>،
                نجد أنه من
                الضروري أن يستمر <span>{{ form.name }}</span>
                في تعليمه بمدرسة أقرب إلى مكان إقامتنا الجديد/أن توفر له البيئة
                التعليمية
                المناسبة التي تتماشى مع احتياجاته الخاصة.</p>
            <p>أرجو منكم النظر في طلبي هذا والموافقة عليه. نحن مستعدون لتقديم جميع الوثائق اللازمة لإتمام عملية
                التحويل
                ومتابعة أي إجراءات مطلوبة من جانبنا. <br>
                نشكركم مقدمًا على تعاونكم وتفهمكم لموقفنا، ونتطلع إلى تقديم تجربة تعليمية مثمرة لابننا/ابنتنا في
                مدرستكم.
            </p>
            <p>مع خالص الشكر والتقدير، <br> <span class="bg-black w-40 md:w-80 block h-0.5 m-2"></span>
            </p>
            <p>إسم ولي الأمر : <span class="">{{ form.parent_id }}</span></p>
            <p>التوقيع : <span class="font-mono font-bold ">{{ form.parent_id }}</span></p>
            <p>تفاصيل الاتصال بولي الأمر : <span>{{ form.parent_id + ' - (' + form.parent_id + ')' }}</span>
            </p>
        </div> -->

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