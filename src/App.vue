<template>
    <router-view></router-view>
</template>
<script>
export default {
    data() {
        return {
            support: [

            ],
        };
    },
    provide() {
        return {
            items: this.items,
            support: this.support,
        };
    },
};
</script>
<style>
::-webkit-scrollbar {
  width: 7px;
  height: 100px;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #5c2c7e;
  height: 100px;
}
::-webkit-scrollbar-track{
  background-color: white;

}
section{
  user-select: none;
}
@media (max-width: 1000px) {
  ::-webkit-scrollbar {
    width: 15px;
    height: 10px;

  }
}
</style>
