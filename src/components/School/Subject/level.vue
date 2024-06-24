<template>
    <td class="py-2 px-4">
        <slot v-if="grade === 1" :grade="grade">الصف الأول الإبتدائي</slot>
        <slot v-if="grade === 2" :grade="grade">الصف الثاني الإبتدائي</slot>
        <slot v-if="grade === 3" :grade="grade">الصف الثالث الإبتدائي</slot>
        <slot v-if="grade === 4" :grade="grade">الصف الرابع الإبتدائي</slot>
        <slot v-if="grade === 5" :grade="grade">الصف الخامس الإبتدائي</slot>
        <slot v-if="grade === 6" :grade="grade">الصف السادس الإبتدائي</slot>
        <slot v-if="grade === 7" :grade="grade">الصف الأول الإعدادي</slot>
        <slot v-if="grade === 8" :grade="grade">الصف الثاني الإعدادي</slot>
        <slot v-if="grade === 9" :grade="grade">الصف الثالث الإعدادي</slot>
        <slot v-if="grade === 10" :grade="grade">الصف الأول الثانوي</slot>
        <slot v-if="grade === 11" :grade="grade">الصف الثاني الثانوي</slot>
        <slot v-if="grade === 12" :grade="grade">الصف الثالث الثانوي</slot>
    </td>
</template>

<script>
export default {
    props: {
        grade: {
            type: String,
            required: true
        }
    }
};
</script>
<style scoped></style>