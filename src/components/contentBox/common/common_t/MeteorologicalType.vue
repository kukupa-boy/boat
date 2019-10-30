<template>
  <div>
    <!--控制下拉的按钮-->
    <div class="button" @click="shrink()">
      <span class="icon-icon_" id="iconStyle1"></span>
    </div>
    <!--这个是用户的气温页面的下拉页面-->
    <ul ref="h" id="h" class="meteorological">
      <!--<li class="icon-icon_" id="iconStyle1" ></li>-->
      <li v-for="(item,path,i) in list">
        <div>
          <router-link class="router-link-active" :to="{ path: item.path }"><span  :class=[item.iconPath] id="iconStyle"></span>{{item.name}}</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "meteorological-type",
        data(){
          return{
            list:[
              {iconPath:"icon-16",url:require("../../../../assets/weather_system/image/image_t/temperature.png"), name:'气温',path:'/contentBox/weatherReport/temperature'},
              {iconPath:"icon-40",url:require("../../../../assets/weather_system/image/image_t/humidity.png"), name:'湿度',path:'/contentBox/weatherReport/humidity'},
              {iconPath:"icon-4",url:require("../../../../assets/weather_system/image/image_t/precipitation.png"), name:'降水量',path:'/contentBox/weatherReport/precipitation'},
              {iconPath:"icon-25",url:require("../../../../assets/weather_system/image/image_t/wind_direction.png"), name:'风向',path:'/contentBox/weatherReport/windDirection'},
              {iconPath:"icon-10",url:require("../../../../assets/weather_system/image/image_t/visibility.png"), name:'能见度',path:'/contentBox/weatherReport/visibility'},
              // {iconPath:"icon-45",url:require("../../../../assets/weather_system/image/image_t/thunder.png"), name:'雷电',path:'/contentBox/weatherReport/thunder'},
              {iconPath:"icon-37",url:require("../../../../assets/weather_system/image/image_t/air_pressure.png"), name:'气压',path:'/contentBox/weatherReport/airPressure'},
              {iconPath:"icon-24",url:require("../../../../assets/weather_system/image/image_t/haze.png"), name:'雾霾',path:'/contentBox/weatherReport/haze'},
              {iconPath:"icon-13",url:require("../../../../assets/weather_system/image/image_t/wave_height.png"), name:'浪高',path:'/contentBox/weatherReport/waveHeight'}
              ],
            //  这个下拉框，用于控制右边导航栏的下拉
            upAndDown:[require("../../../../assets/weather_system/image/image_t/pullUp.png"),
              require("../../../../assets/weather_system/image/image_t/pullDown.png")],
            //用于判断上拉和下拉的时候，图片的样式
            // flag:true,
            show:true,
          }
        },
      methods:{
        shrink(){
          //这是控制气象二级导航的伸缩
          // this.show=!this.show;
          // if(this.show){
          //   this.$refs.h.style.display ='block';
          // }else {
          //   this.$refs.h.style.display ='none';
          // }

          //这是让路由跳转，返回第一级
          this.$router.push('/contentBox/weatherReport/defaultComponents')
        }
      }
    }
</script>

<style scoped>
  /*引入图标文件style*/
  @import "../../../../assets/public/icomoon/style.css";
  ul li{
    list-style: none;
    /*margin-top: 20px;*/
  }
  .button{
    width: 100%;
    height: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: white;
  }
  .router-link-active {
    text-decoration: none;
    color: black;
  }
  .meteorological{
    width: 100%;
    height: 88%;
    background-color: rgb(255,255,255);
    text-align: center;
    padding-left: 0;
    padding-bottom: 20px;
    border-radius: 5px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    /*border: 1px solid red;*/
  }
  .meteorological > li{
    display: flex;
    height: 12.5%;
    /*border: 1px solid red;*/
    width: 100%;
    margin: auto;
    justify-content: center;
    align-items: center;
  }
  .meteorological>li:hover{
    color:rgb(136,163,232);
  }
  .meteorological span{
    display: block
  }
  /*.retract{*/
    /*width: 64px;*/
    /*height: 30px;*/
    /*text-align: center;*/
    /*line-height: 30px;*/
    /*background-color: rgb(222,222,222);*/
    /*border-radius: 11px;*/
    /*margin-top: 6px;*/
  /*}*/
  .router-link-exact-active{
    color: cornflowerblue;
  }
  @font-face {
    font-family: 'icomoon';
    src: url('../../../../assets/public/icomoon/fonts/icomoon.eot');
    src: url('../../../../assets/public/icomoon/fonts/icomoon.eot?#iefix') format('embedded-opentype'),
    url('../../../../assets/public/icomoon/fonts/icomoon.woff') format('woff'),
    url('../../../../assets/public/icomoon/fonts/icomoon.ttf') format('truetype');
  }
  #iconStyle:before{
    font-size: 30px;
  }
  #iconStyle1:before{
    font-size: 30px;
  }
  .iconfont{
    font-family: "icomoon" !important;
    font-size: 36px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  /*.retract img{*/
    /*width: 26px;*/
    /*height: 18px;*/
  /*}*/
</style>
