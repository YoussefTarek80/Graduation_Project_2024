<template>
    <div>
        {{item.schoolName}}
    </div>
</template>
<script>
export default{
    inject:["items"],
    data() {
        return {
            item: null
        };
    },
    created(){
        this.fetchdata();
    },
    methods:{
        fetchdata(){
            const index = this.$route.params.index;
            this.item = this.items[index];
        }
    }
}

</script>