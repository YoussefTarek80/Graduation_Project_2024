<template>
    <div>
        <sc-navbar-comp></sc-navbar-Comp>
        <b> {{ template }} </b>
        <Footer_Component></Footer_Component>
    </div>
</template>
<script>
export default {
    data() {
        return {
            template: `This is a add new student page`,
        }
    }
}
</script>
<style scoped></style>