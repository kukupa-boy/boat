<template>
  <!--这是雷电模块-->
  <div class="thunder">
    <div>
      <BrokenLineDiagram></BrokenLineDiagram>
    </div>
    <div>
      <AirTemperature></AirTemperature>
    </div>
  </div>
</template>

<script>
  import BrokenLineDiagram from "../../../common/common_t/BrokenLineDiagram.vue"
  import AirTemperature from "../../../common/common_t/AirTemperature.vue"
  export default {
    name: 'thunder',
    components:{
      BrokenLineDiagram,
      AirTemperature
    }
  }
</script>

<style scoped>
  .thunder{
    width: 100%;
    height: 100%;
    /*background-color: #449fdb;*/
    display: flex;
    justify-content: center;
    align-content:space-around;
    position: relative;
    margin-top: 40px;
  }
</style>
