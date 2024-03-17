<template>
   <Navbar_Component></Navbar_Component>
    <section class="m-6 sm:m-16" data-aos="fade-up" data-aos-duration="1000">
        <div class="flex items-center justify-between">
            <div class="flex flex-col">
                <span class="sm:text-3xl text-2xl">قائمة الطلبات</span>
                <i
                    class="fa-regular fa-horizontal-rule fa-2xl text-customPink"
                ></i>
            </div>
        </div>
        <table_Component ></table_Component>
    </section>
    <Footer_Component></Footer_Component>
</template>
<script>
import table_Component from "../../../../UI/Tables/RequestTable/Table.vue";
export default{
    components:{
        table_Component
    }
}
</script>