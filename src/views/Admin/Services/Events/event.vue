<template>
    <Navbar_Component></Navbar_Component>
    <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
        <div class="flex items-center justify-between">
            <div class="flex flex-col">
                <span class="sm:text-3xl text-2xl">قائمة المناسبات</span>
                <i
                    class="fa-regular fa-horizontal-rule fa-2xl text-customPink"
                ></i>
            </div>
            <button
                class="sm:w-80 flex justify-around items-center"
                @click="this.$router.push('')"
            >
                <span class="sm:text-xl text-lg">اضافة مناسبة جديدة</span>
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        <table_Component
        
        >


        </table_Component>
    </section>
    <Footer_Component></Footer_Component>
</template>
<script>
import table_Component from '../../../../UI/Tables/EventTable/Table.vue';
export default{
    components:{
        table_Component
    }
}
</script>
<style scoped>
@import url('../../../../UI/CustomsCss/Custombutton.css')
</style>
