<template>
    <router-view></router-view>
</template>
<script>
export default {
    data() {
        return {
            array: [
                {
                    email: "admin@admin.com",
                    password: "000",
                },
                {
                    email: "school@admin.com",
                    password: "000",
                },
            ],
            items: [
                {
                    schoolName: "ابن حزم",
                    management: "الجيزة",
                    status: "مفعل",
                },
                {
                    schoolName: "المستقبل ",
                    management: "الجيزة",
                    status: "مفعل",
                },
                {
                    schoolName: "كرم الله ",
                    management: "الجيزة",
                    status: "مفعل",
                },
            ],
        };
    },
    provide() {
        return {
            items: this.items,
            array: this.array,
        };
    },
};
</script>
<style scoped></style>
