<template>
  <div id="messageManagement">
    <div class="messageManagement_inner">
    <transition mode="out-in" >
        <router-view></router-view>
    </transition>
    </div>
  </div>
</template>

<script>
    export default {
        name: "message-management"
    }
</script>

<style scoped>
  #messageManagement{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(240,240,240);
    padding: 20px 6%;
    box-sizing: border-box;
  }
  .messageManagement_inner{
    width: 100%;
    height: 100%;

    background-color: white;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    border-radius: 10px;
  }
</style>
