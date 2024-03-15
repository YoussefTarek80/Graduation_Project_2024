<template>
    <div>
        <span class="loader" v-if="show"></span>
    </div>
</template>
<script>
export default {
    props: {
        show: false,
    },
};
</script>
<style scoped>
.loader {
    width: 48px;
    height: 48px;
    background: white;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}
.loader::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 6px;
    top: 10px;
    width: 12px;
    height: 12px;
    color: #e546e8;
    background: currentColor;
    border-radius: 50%;
    box-shadow: 25px 2px, 10px 22px;
}
@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
