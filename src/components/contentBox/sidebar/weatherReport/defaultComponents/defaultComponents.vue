<template>
  <div>
    <div class="tem_sun_moon_pre">
      <div class="tem_sun_moon">
        <!--温度ji-->
        <div class="temperature">
          <Thermometer></Thermometer>
        </div>
        <!--太阳-->
        <div class="sun">
          <div class="innerBox">
              <div><span>2019/09/23</span> <span>白天</span></div>
              <div><img class="img" src="../../../../../assets/weather_system/image/image_t/sun.png"></div>
              <h1>晴</h1>
              <p>50℃</p>
              <p>日出<span>6:</span><span>15</span> </p>
              <p>最高气温<span>50℃</span></p>
          </div>
        </div>
        <!-- 夜晚-->
        <div class="moon">
          <div class="innerBox">
            <div><span>2019/09/23</span> <span>白天</span></div>
            <div><img class="img" src="../../../../../assets/weather_system/image/image_t/night_mode.png"></div>
            <h1>阴</h1>
            <p>50℃</p>
            <p>日出<span>6:</span><span>15</span> </p>
            <p>最高气温<span>50℃</span></p>
          </div>
        </div>
      </div>
      <!-- 降水量-->
      <div class="precipitation">
        <BrokenLineDiagram type="Chart1" v-bind:toSonData="toSonData" ></BrokenLineDiagram>
      </div>
    </div>
  </div>
</template>

<script>
  import Thermometer from "../../../common/common_t/Thermometer.vue"
  import BrokenLineDiagram from "../../../common/common_t/BrokenLineDiagram.vue"
  // import OperationPersonnel from "../../../common/common_t/OperationPersonnel.vue"
  export default {
    name: 'defualtComponnets',
    components:{
      Thermometer,
      BrokenLineDiagram,
      // OperationPersonnel
    },
    data(){
      return{
        toSonData:'temperature',
      }
    },
    created(){

    },
    methods:{

    }
  }
</script>

<style scoped>
  /*温度，sun，moon总体的布局*/
  .tem_sun_moon_pre{
    width: 100%;
    height: 100%;
    /*padding: 20px 0;*/
    box-sizing: border-box;
    position: relative;
    /*margin-top: 40px;*/
    background-color: rgb(240,240,240);
  }
  .tem_sun_moon{
    height:55%;
    /*border: 2px solid red;*/
    overflow: hidden;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
  }
  .temperature,.sun,.moon{
    width: 33.333333333%;
    height: 100%;
    border-radius:10px;
    /*margin-left: 5px;*/
    margin: 1px;
  }
  .temperature >div{
    width: 100%;
    height: 100%;
  }
  .moon{
    margin-right: 5px;
  }

  /* 降水量的排版*/
  .precipitation{
    height:44%;
    width: 100%;
    margin-top: 1%;
    background-color: rgb(240,240,240);
    border-radius: 10px;
    position: relative;
  }
  /*SUNhemoon模块的颜色的渐变和里面的整体的布局*/
  .sun{
    height: 100%;
    background-color: white;
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
  }
  .sun>.innerBox,.moon>.innerBox{
    height: 88%;
    padding: 7%;
    display: flex;
    flex-direction:column;
  }
  .moon{
    height: 100%;
    background-color: white;
  }
  .sun>.innerBox>div:nth-of-type(1),.moon>.innerBox>div:nth-of-type(1){
    flex: 1;
    /*border: 1px solid red;*/
    text-align: center;
    display: flex;
    align-items: center;
    padding-left: 3%;
    box-sizing: border-box;
  }
  .sun>.innerBox>div:nth-of-type(2), .moon>.innerBox>div:nth-of-type(2){
    flex: 5;
    text-align: center;
    /*border: 1px solid red;*/
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sun>.innerBox>h1,.moon>.innerBox>h1{
    flex: 1;
    text-align: center;
    /*border: 1px solid red;*/
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sun>.innerBox>p, .moon>.innerBox>p{
    flex: 1;
    text-align: center;
    /*border: 1px solid red;*/
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sun>.innerBox>p:nth-of-type(2) span,.sun>.innerBox>p:nth-of-type(3) span,.moon>.innerBox>p:nth-of-type(2) span,.moon>.innerBox>p:nth-of-type(3) span{
    padding-left: 10%;
  }
  img{
    width: 30%;
    height: 50%;
  }
</style>
