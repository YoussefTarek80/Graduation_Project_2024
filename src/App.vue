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
