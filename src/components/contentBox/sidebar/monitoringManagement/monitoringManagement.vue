<template>
  <div class="monitoringManagement">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'videoMonitor'
  }
</script>

<style scoped>
    .monitoringManagement{
      height: 100%;
      width: 100%;
      padding: 20px 6%;
      box-sizing: border-box;
      background-color: rgb(240,240,240);
    }
    .monitoringManagement > div{
    }
</style>
