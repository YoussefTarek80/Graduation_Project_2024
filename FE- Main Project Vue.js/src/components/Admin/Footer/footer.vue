<template>
    <footer class="text-center text-2xl p-6 mt-10">
        <span> جميع الحقوق محفوظة © ️{{currentDate}} </span>
    </footer>
</template>
<script>
export default {
    computed: {
        getDate() {
            return new Date().getFullYear();
        },
        currentDate() {
            return this.getDate;
        },
    },
};
</script>
<style scoped>
@import url("./footer.css");
</style>
