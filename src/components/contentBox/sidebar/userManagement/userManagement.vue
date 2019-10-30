<template>
    <div class="userManagement">
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
</template>

<script>
    export default {
        name: "user-management"
    }
</script>

<style scoped>
    .userManagement{
      height: 100%;
      width: 100%;
      padding: 20px 6%;
      box-sizing: border-box;
      background-color: rgb(240,240,240)!important;
    }
  .userManagement > div{
     background-color: white;
  }
</style>
