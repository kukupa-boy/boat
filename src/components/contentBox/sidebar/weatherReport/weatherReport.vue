<template>
  <div id="wetherReporter">
    <!--侧边导航栏-->
    <div class="weatherBox">
        <div class="functionControl">
<!--              公用组件MeteorologicalType-->
              <MeteorologicalType></MeteorologicalType>
        </div>
      <div class="commonWeatherComponents">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import MeteorologicalType from "../../common/common_t/MeteorologicalType.vue"
  export default {
    name: 'wetherReport',
    components:{
      MeteorologicalType
    },
    data(){
      return {
        //这个是默认的路由的地址,当进行点击的时候，用户，就可以进行切换路由
       routerData:"/weatherReport/defaultComponents"
      }
    }
  }
</script>

<style scoped>
  #wetherReporter{
    width: 100%;
    height:100%;
    background-color: rgb(240,240,240);

  }
  .weatherBox{
    height: 100%;
    width: 100%;
    /*display: flex;*/
    /*justify-content: space-around;*/
    /*align-items: center;*/
    /*margin-top: 20px;*/
    position: relative;
    padding: 20px 10%;
    box-sizing: border-box;
  }
  #wetherReporter .functionControl{
    height: 87.57%;
    width:3.3%;
    /*background-color: pink;*/
    position:absolute;
    z-index: 999;
    left: 10%;
    top: 20px;
    border-radius: 10px;
    /*border: 1px solid red;*/
  }
  #wetherReporter .functionControl >div{
    width: 100%;
    height: 100%;
  }
   .commonWeatherComponents{
     height: 97.3%;
     width: 73%;
     border-radius: 10px;
     position: absolute;
     right: 10%;
     top: 20px;
     /*background-color: pink;*/
  }
  .commonWeatherComponents >div{
    height: 90%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

</style>
