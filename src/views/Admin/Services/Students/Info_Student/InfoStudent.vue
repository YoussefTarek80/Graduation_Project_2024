<template>
    <Navbar_Component></Navbar_Component>
    <section
        class="m-10"
        data-aos="fade-up"
        data-aos-duration="1000"
    >
    <span>{{ this.$route.params.index }}</span>
    </section>
</template>
<script>
export default {
    data() {
        return {
            item: null,
        };
    },
    computed: {},
    created() {},
    methods: {},
};
</script>
<style scoped>

</style>
