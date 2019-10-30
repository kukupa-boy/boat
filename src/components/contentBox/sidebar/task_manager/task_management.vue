<template>
    <div class="task_management">
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "task_management"
    }
</script>

<style scoped>
  .task_management{
    width: 100%;
    height: 100%;
    padding: 20px 6%;
    box-sizing: border-box;
    background-color: rgb(240,240,240);
  }
  .task_management > div{
    /*background-color: rgb(240,240,240);*/
  }
</style>
