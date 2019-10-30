<template>
  <div id="app">

   <router-view>

   </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  method:{

  }
}
</script>

<style>
  #app {
    height: 100%;
    width: 100%;
  }
  .router-active-link{
    color: red;
  }
</style>
