<template>
    <router-view></router-view>
</template>
<script>
export default {
    data() {
        return {
            Students: [
                {
                    id: 1,
                    schoolname: "السعيدية",
                    schoolAdminstration: "الجيزة",
                    name: "احمد حسام",
                    level: "الصف الثاني الاعدادي",
                    parent: "حسام حسني",
                    parentPassion: "مهندس",
                    nationality: "مصري",
                    country: "مصر",
                    nationalID: "3020102272656",
                    address: "مصر - القاهرة",
                    state: 'القاهرة',
                    detailedAddress: 'القاهرة - مصر القديمة - النزهة',
                },
                {
                    id: 2,
                    schoolname: "الهرم",
                    schoolAdminstration: "الجيزة",
                    name: " كريم طارق",
                    level: "الصف الثالث الاعدادي",
                    parent: "طارق صلاح محمد",
                    parentPassion: "دكتور",
                    nationality: "سعودي",
                    country: "السعودية",
                    nationalID: "3020102272651",
                    address: "مصر - الجيزة",
                    state: null,
                    detailedAddress: 'الجيزة -الهرم - سهل حمزة',
                },
            ],
        };
    },
    provide() {
        return {
            items: this.items,
            students: this.Students,
        };
    },
};
</script>
<style scoped></style>
