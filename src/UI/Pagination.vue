<template>
    <div class="flex justify-center items-center mt-4" v-if="!show">
        <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="hover:text-customPink cursor-pointer transition-all w-10 h-10 flex items-center justify-center"
        >
            <i class="fa-duotone fa-forward sm:text-lg text-sm"></i>
        </button>
        <span class="mx-4 sm:text-xl"
            >{{ currentPage }} من {{ totalPages }}</span
        >
        <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="hover:text-customPink cursor-pointer transition-all w-10 h-10 flex items-center justify-center"
        >
            <i class="fa-duotone fa-backward sm:text-lg text-sm"></i>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            required: true,
        },
        totalPages: {
            type: Number,
            required: true,
        },
        nextPage: {
            type: Function,
            required: true,
        },
        prevPage: {
            type: Function,
            required: true,
        },
        show:{
          type:Boolean,
        }
    },
};
</script>

<style scoped>
@import url("../UI/CustomsCss/Custombutton.css");
</style>
