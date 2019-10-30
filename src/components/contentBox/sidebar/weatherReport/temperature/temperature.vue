<template>
  <div class="temperature">
    <!--这是气温-->
<!--<div class="right">-->
    <div class="box-top">
      <BrokenLineDiagram v-bind:toSonData="toSonData"></BrokenLineDiagram>
    </div>
    <div class="box-bottom">
      <AirTemperature v-bind:toSonData="toSonData"></AirTemperature>
    </div>
<!--</div>-->
  </div>
</template>

<script>
  import BrokenLineDiagram from "../../../common/common_t/BrokenLineDiagram.vue"
  import AirTemperature from "../../../common/common_t/AirTemperature.vue"
  export default {
    name: 'temperatrue',
    components:{
      BrokenLineDiagram,
      AirTemperature
    },
    data (){
      return{
        toSonData:'temperature',//给子组件的值
        // getList:[],//给子组件的数据
      }
    },
    created(){

    },
    mounted(){
      // console.log(this.getList);
    },

    methods:{

      }
  }
</script>

<style scoped>
  .temperature{
    width: 100%;
    height: 100%;
    /*background-color: #449fdb;*/
    display: flex;
    justify-content: center;
    align-content:space-around;
    position: relative;
    /*margin-top: 40px;*/
    /*border: 1px solid red;*/
  }
  .box-top{
    width: 100%;
    height: 49%;

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

  }
</style>
