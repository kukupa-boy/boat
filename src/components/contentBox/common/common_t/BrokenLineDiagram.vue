<template>
  <!--这是图表-->
  <div class="box" ref="echartsWrapper">
    <div ref="echarts" :class="type == 'Chart'?'Chart':'Chart1'">

    </div>
  </div>
</template>

<script>
    import bus from '../../../../assets/weather_system/eventBus.js'
    export default {
      name: 'broken-line-diagram',
      props:{
        type:{
          type:String,
        },
        toSonData: {
          type: String,
          default: function () {
            return ""
          }
        }
      },
      data(){
        return{
          timeList:[],//存放时间
          humidity:[],//用于存放湿度humidity
          pressure:[],//用于存放压强pressure
          // myChart:'',//监听宽度
          temperature:[],//用于存放气温temperature
          visibility:[],//用于存放能见度visibility
          waveheight:[],//用于存放浪高waveheight
          winddir:[],//用于存放风向winddir
          character:'',//存放对应度量单位
          name:'',//存放对应名字
          num:'',//存放从兄弟组件那里传来的值
          time:['2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00','20:00','0:00'],
          list:{
            day1:{
              temperature:[20,25,26,30,27,25,26,35,27,25,26,28],
              humidity:[70,79,78,79,78,79,78,79,78,79,78,79],
              winddir:[88,108,108,109,108,109,108,109,108,109,108,109],
              visibility:[10,11,12,10,13,12,10,11,12,10,11,12],
              pressure:[1101,802,1101,1102,1101,600,1101,1102,800,1102,900,1102],
              waveheight:[1.2,1.3,1.2,1.3,1.2,1.3,1.2,1.3,1.2,1.3,1.2,1.3],
              precipitation:[0.5,0.4,0.3,0.2,0.5,0.3,0.5,0.4,0.3,0.2,0.5,0.3],//降水量
              thunder:[10],//雷电
              smog:[2.1,2.1,2.2,2.3,2.4,2.5,2.6,2.1,2.1,2.2,2.3,2.4],//雾霾
            },
            day2:{
              temperature:[27,25,26,30,27,20,26,28,31,25,26,28],
              humidity:[78,79,78,79,78,79,78,79,78,79,78,79],
              winddir:[108,10,20,109,108,109,50,109,108,109,108,109],
              visibility:[10,11,12,10,11,12,10,11,12,10,11,12],
              pressure:[1000,1102,1101,1102,1101,1102,1101,1102,600,1102,1101,1102],
              waveheight:[1.2,1.5,1.2,1.3,1.6,1.3,1.2,1.8,1.2,1.3,1.2,1.3],
              precipitation:[0.5,0.4,0.3,0.2,0.5,0.3,0.5,0.4,0.3,0.2,0.5,0.3],//降水量
              thunder:[10],//雷电
              smog:[2.1,2.1,2.2,2.5,2.4,2.5,2.6,2.1,2.4,2.2,2.3,2.4],//雾霾
            },
            day3:{
              temperature:[27,25,26,28,27,21,26,28,27,25,22,28],
              humidity:[78,60,78,79,78,79,78,80,78,79,78,79],
              winddir:[108,10,108,109,108,109,108,109,108,109,108,109],
              visibility:[10,11,15,10,11,12,10,16,12,10,11,12],
              pressure:[600,1102,1101,800,1101,1102,1101,900,1101,1102,1000,1102],
              waveheight:[1.2,1.5,1.2,1.3,1.7,1.3,1.2,1.8,1.2,1.3,1.2,1.3],
              precipitation:[0.5,0.4,0.3,0.2,0.5,0.3,0.5,0.4,0.3,0.2,0.5,0.3],//降水量
              thunder:[10],//雷电
              smog:[2.1,2.1,2.2,2.3,2.5,2.5,2.2,2.1,2.3,2.2,2.3,2.4],//雾霾
            },
            day4:{
              temperature:[27,25,26,28,27,30,26,28,27,25,31,28],
              humidity:[78,60,78,79,50,79,78,66,78,79,70,79],
              winddir:[108,19,108,109,40,109,108,109,60,109,108,109],
              visibility:[10,11,11,10,11,12,10,12,12,10,11,12],
              pressure:[1000,1102,1101,1102,600,1102,1101,1102,1101,500,1101,1102],
              waveheight:[1.2,1.3,1.5,1.3,1.2,1.3,1.4,1.3,1.6,1.3,1.2,1.3],
              precipitation:[0.5,0.4,0.3,0.2,0.5,0.3,0.5,0.4,0.3,0.2,0.5,0.3],//降水量
              thunder:[10],//雷电
              smog:[2.1,2.1,2.2,2.3,2.4,2.5,2.6,2.1,2.1,2.2,2.3,2.4],//雾霾
            },
            day5:{
              temperature:[27,25,28,28,26,25,26,28,27,30,26,28],
              humidity:[78,79,78,79,78,79,78,79,78,79,78,79],
              winddir:[108,109,55,109,108,60,108,109,108,109,108,109],
              visibility:[10,11,12,10,11,13,10,11,12,14,11,12],
              pressure:[1101,600,1101,1102,1101,1102,700,1102,1101,600,1101,1102],
              waveheight:[1.2,1.3,1.2,1.5,1.2,1.3,1.2,1.3,1.2,1.3,1.2,1.3],
              precipitation:[0.5,0.4,0.3,0.2,0.5,0.3,0.5,0.4,0.3,0.2,0.5,0.3],//降水量
              thunder:[10],//雷电
              smog:[2.1,2.1,2.2,2.5,2.4,2.5,2.6,2.1,2.4,2.2,2.3,2.1],//雾霾
            },
            day6:{
              temperature:[27,25,26,31,27,25,26,28,30,25,26,28],
              humidity:[50,79,78,79,40,79,78,79,60,79,78,88],
              winddir:[108,60,108,109,100,109,108,109,108,109,108,109],
              visibility:[10,13,12,10,11,16,10,11,12,10,11,12],
              pressure:[1101,800,1101,1102,1101,1102,1101,600,1101,1102,1101,1102],
              waveheight:[1.2,1.4,1.2,1.3,1.2,1.6,1.2,2.3,1.2,1.3,1.2,1.3],
              precipitation:[0.5,0.4,0.3,0.2,0.5,0.3,0.5,0.4,0.3,0.2,0.5,0.3],//降水量
              thunder:[10],//雷电
              smog:[2.1,2.1,2.2,2.3,2.4,2.1,2.6,3.1,2.1,2.2,2.3,2.4],//雾霾
            },
            day7:{
              temperature:[27,25,35,28,27,25,33,28,27,25,26,28],
              humidity:[78,79,78,79,78,79,78,79,78,79,78,79],
              winddir:[80,60,50,40,10,90,180,220,70,109,108,109],
              visibility:[10,11,12,10,11,12,10,11,12,10,11,12],
              pressure:[1101,1102,1101,1102,1101,1102,1101,1102,1101,1102,1101,1102],
              waveheight:[1.2,1.3,1.5,1.3,1.6,1.3,1.2,1.8,1.2,1.3,1.2,1.3],
              precipitation:[0.5,0.4,0.3,0.5,0.5,0.3,0.5,0.6,0.3,0.8,0.5,0.3],//降水量
              thunder:[10],//雷电
              smog:[2.1,1.1,2.2,2.3,2.5,2.5,2.6,2.1,3.1,2.2,2.3,2.4],//雾霾
            }
          }//存放假数据
        }
      },
      created(){
        switch(this.toSonData){
          case 'temperature': this.character ='℃';this.name='最高气温';break;
          case 'humidity': this.character ='%';this.name='最高湿度';break;
          case 'winddir': this.character ='°';this.name='风向';break;
          case 'visibility': this.character ='km';this.name='最远能见度';break;
          case 'pressure': this.character ='hpa';this.name='最高压强';break;
          case 'waveheight': this.character ='m';this.name='最高浪高';break;
          case 'precipitation': this.character ='mm';this.name='最多降水';break;
          case 'smog': this.character ='pm';this.name='最高雾霾';break;
        }
      },
      mounted () {
        var that=this;
        bus.$on('Event',function (msg) {
          that.num=msg;
        })
        // setInterval(this.get, 1000)
       that.draw();
        console.log(this.$refs.echarts.clientWidth);
        // this.getData()
      },
      methods: {
        //绘制页面
        draw(){
          switch(this.toSonData){
            case 'temperature':this.drawLine(this.time,this.list.day1.temperature);break;
            case 'humidity': this.drawLine(this.time,this.list.day1.humidity);break;
            case 'winddir': this.drawLine(this.time,this.list.day1.winddir);break;
            case 'visibility': this.drawLine(this.time,this.list.day1.visibility);break;
            case 'pressure': this.drawLine(this.time,this.list.day1.pressure);break;
            case 'waveheight': this.drawLine(this.time,this.list.day1.waveheight);break;
            case 'precipitation': this.drawLine(this.time,this.list.day1.pressure);break;
            case 'smog': this.drawLine(this.time,this.list.day1.smog);break;
          }
        },
        drawLine (x,y) {
          let b;//控制显示区域大小
          let a='8%';//压强是控制显示区域大小
          let color = '#fff';//颜色
          let status =false;
          // console.log(11111111111111111)
          // console.log(x,y);
          let arr=[];
          let breakPoint ='circle';//控制风向折点形状
          // let lineSegmentColor;//控制线段颜色
          //这是控制显示多少条
          // for(let i=0;i<4;i++){
          //   arr.push(x[i]);
          // };
          // console.log(11111111111111111)
          // console.log(this.toSonData);
          // console.log(y)
          // console.log(x)
          if(this.type == 'Chart1'){
            b = '3%';
          }else {
            b = '2%';
            // console.log(b);
          }
          if(this.toSonData == 'winddir'){
            breakPoint = 'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTY5NDg2MzI1MzYwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM2NTEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNjIxLjIwNjU4OCAxMDAxLjcxMjk0MWwtMTg3LjkzNDExNy00MzIuMTI4TDEuMjA0NzA2IDM4MS43NzEyOTQgOTkzLjAzOTA1OSA5Ljk5OTA1OXoiIGZpbGw9IiM2ZDk0ZTIiIHAtaWQ9IjM2NTIiPjwvcGF0aD48cGF0aCBkPSJNNjIxLjIwNjU4OCAxMDAxLjcxMjk0MWwtMTg3LjkzNDExNy00MzIuMTI4TDEuMjA0NzA2IDM4MS43NzEyOTRsNTQ4LjE0MTE3NiA3MS45ODExNzd6IiBmaWxsPSIjNmQ5NGUyIiBwLWlkPSIzNjUzIj48L3BhdGg+PC9zdmc+'
          }
          if(this.toSonData === 'pressure'){
            a = '8%';
          }
          if(this.toSonData === 'waveheight'){
            color='#567cb4';
            status =true;
          }
          let symbolRotateNum = y;// 旋转的度数
          let valueNum = y;// 数值
          let data = echarts.util.map(symbolRotateNum, function (item, index) {
            return {
              value: valueNum[index],
              symbolRotate:180-symbolRotateNum[index]+45,
            };
          });
          // console.log(data)
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(this.$refs.echarts);
          //option
         let option = {
            title: {
              text: '',
              subtext: ''
            },
            grid: {
             left: a,
             right: b,//chart  1  chart1   3
             containlabel: true
           },
            tooltip: {
              trigger: 'axis'
            },
            toolbox: {
              //图表上面的转换----删除了
              show: true,
              // feature: {
              //   dataZoom: {
              //     yAxisIndex: 'none'
              //   },
              //   dataView: {readOnly: false},
              //   magicType: {type: ['line', 'bar']},
              //   restore: {},
              //   saveAsImage: {}
              // }
            },
            xAxis: {
              type: 'category',
              boundaryGap: true,
              data: x,//显示的数据arr
              axisTick: {//坐标轴刻度相关设置。
                show: false
              },
              axisLine: { //坐标轴轴线相关设置。
                show: true,
                lineStyle: {//设置粗细和颜色
                  color:' rgb(154, 154, 154)',
                  width:2,//这里是为了突出显示加上的
                }
              },
              axisLabel:{ //调整x轴的lable
                textStyle:{
                  fontSize:16,// 让字体变大
                },
                // rotate:30,
                // interval:0
              },
              splitLine: { //坐标轴在 grid 区域中的分隔线
                show: false
              },
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value} '+this.character,
                fontSize:16
              },
              axisTick: {//坐标轴刻度相关设置。
                show: false
              },
              axisLine: { //坐标轴轴线相关设置。
                show: true,
                lineStyle: {//设置轴线颜色和粗细
                  color:' rgb(154, 154, 154)',
                  width:2,//这里是为了突出显示加上的
                }
              },
              splitLine: { //坐标轴在 grid 区域中的分隔线
                show: false
              },
            },
           //设置拐点的一系列数据
            series: [
              {
                name: this.name,
                type: 'line',
                smooth:status,//设置折线图平滑
                // require("@/assets/weather_system/image/image_t/temperature.png")
                symbol: breakPoint,     //设定为实心点
                symbolSize: 15,
                itemStyle : {
                  normal : {
                    label : {
                      show: true,
                      // position: 'bottom', //设置折点处文字显示位置
                      formatter: '{c}'+this.character,
                    },
                      color: '#fff',//填充色
                      borderColor: 'rgb(109,148,226)',//拐点边框颜色
                      lineStyle: {
                        // color:'red',
                        width: 4//线段宽度
                      },

                  }
                },
                areaStyle: {
                  normal: {
                    color: color //改变区域颜色
                  }
                },
                data: data  //这里存放的是获取到的数据
              }
            ],
           backgroundColor: 'rgb(255,255,255)',
           // borderRadius:10,
           visualMap: {
             show: false,
             dimension: 1,
             pieces: [{
               lte: -25,
               color: 'rgb(44, 100, 228)'
               // color:'linear-gradient(to right, rgb(44, 100, 228) , rgb(45, 105, 132));'
             }, {
               gt: -25,
               lte: 0,
               color: 'rgb(45, 105, 132)'
               // color:'linear-gradient(to right, rgb(45, 105, 132) , rgb(228, 124, 31));'
             }, {
               gt: 0,
               lte: 10,
               color: 'rgba(44, 100, 228,0.5)'
               // color:'linear-gradient(to right, rgb(228, 124, 31) , rgb(240, 51, 47));'
             }, {
               gt: 10,
               lte: 50,
               color: 'rgb(240, 51, 40)'
               // color:'linear-gradient(to right, rgb(240, 51, 47) , red);'
             }, {
               gt: 50,
               color: 'red'
             }],  //pieces的值由动态数据决定
             outOfRange: {
               color: 'yellow'
             }
           }
          };
          // option.visualMap.pieces[0] = {gte: 27, lte: 28, color: 'red'};

          // 绘制图表
          myChart.setOption(option);
          // window.onresize = myChart.resize;
          window.addEventListener("resize",function(){

            myChart.resize();

          });
        },
        getData(){
          var time=[];
          var dataNeed = '';
          var arr=[];//humidity湿度
          var arr1=[];//pressure压强
          var arr2=[];//temperature温度
          var arr3=[];//visibility能见度
          var arr4=[];//waveheight浪高
          var arr5=[];//winddir风向
          var that =this;
          that.axios.get("http://api.shipxy.com/apicall/GetWeatherTime?k=e38ef584670348ceae168fe5f3985fa4").then((res) => {
            //将接口中的数据time和各个浪高对应的数据进行组合
            //处理时间
            // for(let i in response.data){
            //   time=response.data[i];
            // }
            time = res.data.data;
            getGoodsList(0,time.length);
            function getGoodsList(j,length) {
              that.axios.get(`http://api.shipxy.com/apicall/GetWeatherByPoint?k=e38ef584670348ceae168fe5f3985fa4&type=11,12,17&time=${time[j]}&lon=155.2134&lat=24.1234`)
                .then((response)=> {
                  dataNeed = response.data;
                  // console.log(dataNeed)
                  // console.log(time[j])
                  if(dataNeed.data[0].temperature ===-32767 ||dataNeed.data[0].humidity ===-32767 ||dataNeed.data[0].pressure ===-32767 ||
                    dataNeed.data[0].visibility ===-32767 ||dataNeed.data[0].waveheight ===-32767 ||dataNeed.data[0].winddir ===-32767){
                    dataNeed.data[0].temperature =-1;
                    dataNeed.data[0].humidity = -1;
                    dataNeed.data[0].pressure =-1;
                    dataNeed.data[0].visibility =-1;
                    dataNeed.data[0].waveheight =-1;
                    dataNeed.data[0].winddir =-1;
                  }
                  // 判断风向显示为东南风等
                  // console.log(dataNeed.data[0].winddir)
                  arr.push(dataNeed.data[0].humidity);
                  arr1.push(dataNeed.data[0].pressure);
                  arr2.push(dataNeed.data[0].temperature);
                  // console.log(arr2)
                  arr3.push(dataNeed.data[0].visibility);
                  arr4.push(dataNeed.data[0].waveheight);
                  arr5.push(dataNeed.data[0].winddir);
                  if(++j < length) {
                    getGoodsList(j, length);
                  }else {
                    switch(that.toSonData){
                      case 'temperature': that.drawLine(time,arr2);break;
                      case 'humidity': that.drawLine(time,arr);break;
                      case 'winddir': that.drawLine(time,arr5);break;
                      case 'visibility': that.drawLine(time,arr3);break;
                      case 'pressure': that.drawLine(time,arr1);break;
                      case 'waveheight': that.drawLine(time,arr4);break;
                    }
                  }
                });
            }
            // for(var i=0;i<time.length;i++) {
            //   this.axios.get(`http://api.shipxy.com/apicall/GetWeatherByPoint?k=e38ef584670348ceae168fe5f3985fa4&type=11,12,17&time=${time[i]}&lon=155.2134&lat=24.1234`).then((response) => {
            //     dataNeed = response.data;
            //     // console.log(dataNeed);
            //     Need = dataNeed.time;
            //     arr6.push(Need)
            //     // console.log(dataNeed.data.humidity);
            //     arr.push(dataNeed);
            //   })
            // }
          })
          // that.drawLine(time,arr)
          // console.log(arr);
          // this.compareKey(arr,'time')
        },
      },
      watch:{
        num(val){
          val=this.num;
          var arr=[];//存放一整天的数据
          var arr2=[];//存放一天某一个数据
          // console.log(val)
          // this.drawLine(time,this.list.day1.temperature)
          switch (val){
            case 0: arr=this.list.day1; break;
            case 1: arr=this.list.day2;break;
            case 2: arr=this.list.day3;break;
            case 3: arr=this.list.day4;break;
            case 4: arr=this.list.day5;break;
            case 5: arr=this.list.day6;break;
            case 6: arr=this.list.day7;break;
          }
          switch (this.toSonData){
            case 'temperature':arr2 =arr.temperature ;break;
            case 'humidity':arr2 =arr.humidity ; break;
            case 'winddir': arr2 =arr.winddir ;break;
            case 'visibility': arr2 =arr.visibility ;break;
            case 'pressure':arr2 =arr.pressure ; break;
            case 'waveheight': arr2 =arr.waveheight ;break;
          }
          this.drawLine(this.time,arr2)
        },
        // isCollapse(newValue, oldValue){
        //   // this.myChart.resize();
        //   this.myChart.resize();
        // }
      },
      // computed:{
      //   isCollapse(){
      //     return this.$store.state.isCollapse;
      //   }
      // },

    }
</script>

<style scoped>
  .box{
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 10px;
    overflow: hidden;
    flex-direction: row;
    flex-wrap:nowrap;
  }
  .box >div{
    height: 100%;
    width: 100%;
    list-style:none;
    display: flex;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
  }
.Chart{
  margin: 0 auto;
  /*border-radius: 10px;*/
}
.Chart1{
  margin: 0 auto;
  /*border-radius: 10px;*/
}
</style>
