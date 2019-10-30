<template>
  <!--这是浪高-->
  <div class="waveHeight">
    <div class="box-top">
      <BrokenLineDiagram v-bind:toSonData="toSonData"></BrokenLineDiagram>
    </div>
    <div class="box-bottom">
      <AirTemperature v-bind:toSonData="toSonData"></AirTemperature>
    </div>
  </div>
</template>

<script>
  import BrokenLineDiagram from "../../../common/common_t/BrokenLineDiagram.vue"
  import AirTemperature from "../../../common/common_t/AirTemperature.vue"
  export default {
    name: 'waveHeight',
    components:{
      BrokenLineDiagram,
      AirTemperature
    },
    data (){
      return{
        toSonData:'waveheight',//给子组件的值
        // getList:[],//给子组件的数据
      }
    },
  }
</script>

<style scoped>
  .waveHeight{
    width: 100%;
    height: 100%;
    /*background-color: #449fdb;*/
    display: flex;
    justify-content: center;
    align-content:space-around;
    position: relative;
    /*margin-top: 40px;*/
  }
  .box-top{
    width: 100%;
    height: 49%;
    /*border: 1px solid red;*/
    /*background-color: red;*/
    position: absolute;
    left: 0;
    top: 0;
  }
  .box-bottom{
    width: 100%;
    height: 49%;
    position: absolute;
    left: 0;
    bottom: 0;
    /*border: 1px solid red;*/
  }
</style>
