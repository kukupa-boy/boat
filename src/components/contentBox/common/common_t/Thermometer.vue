<template>
  <div>
    <div class="thermometer gradient">
      <!--这是时间-->
      <div>
        <span>{{date}}</span>
        <span class="time">14:00实况</span>
      </div>
      <!--这是中间的部分-->
      <div class="middle">
        <div>
          <div id="main" ref="main"></div>
        </div>
      </div>
      <!--这是下边部分-->
      <div class="bottom">
        <ul class="bottom-left">
          <li>
            <span>相对湿度</span>
            <span class="green">{{humidity}}</span>
          </li>
          <li>
            <span>风向</span>
            <span class="yellow">{{winddir}}</span>
          </li>
        </ul>
        <ul class="bottom-right">
          <li>
            <span>压强</span>
            <span class="blue">{{pressure}}</span>
          </li>
          <li>
            <span>能见度</span>
            <span>{{visibility}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "thermometer",
    data(){
      return{
        date:'',//当前日期
        thermometer:28, //温度
        humidity:'70%', //湿度
        winddir:'180°', //风向
        pressure:'1100hpa', //压强
        visibility:'2km' //能见度
      }
    },
    created(){
      this.addDate();
      // this.axios.get('http://api.shipxy.com/apicall/GetWeatherTime?k=e38ef584670348ceae168fe5f3985fa4').then((res,req)=>{
      //   // console.log(res)
      //   let arr=res.data.data;
      //   console.log(arr[2])
      //   this.axios.get(`http://api.shipxy.com/apicall/GetWeatherByPoint?k=e38ef584670348ceae168fe5f3985fa4&type=11,12,17&time=${arr[2]}&lon=155.2134&lat=24.1234`).then((res)=>{
      //     // console.log(res)
      //     // console.log(res.data.data[0]);
      //     let arr2 =res.data.data[0]
      //     this.thermometer =arr2.temperature;
      //     this.humidity =arr2.humidity +'%';
      //     this.winddir =arr2.winddir +'°';
      //     this.visibility =arr2.visibility +'km';
      //     this.pressure =arr2.pressure +'hpa';
      //     // console.log(this.thermometer)
      //     this.draw(this.thermometer)
      //   })
      // })
    },
    mounted(){
      this.draw(this.thermometer)
    },
    methods:{
      addDate() {
        let nowDate = new Date();
        let date = {
          year: nowDate.getFullYear(),
          month: nowDate.getMonth() + 1,
          date: nowDate.getDate(),
        };
        if (date.month >= 1 && date.month <= 9) {
          date.month = "0" + date.month;
        }
        if (date.date >= 0 && date.date <= 9) {
          date.date = "0" + date.date;
        }
        this.date = date.year + '/'  + date.month + '/'  + date.date;
      },
      draw(a){
        var myChart = echarts.init(this.$refs.main);
        // console.log(typeof(this.thermometer))
        // console.log(this.thermometer)
        var TP_value = a;//用于存放接口数据
        var kd = [];
        var Gradient = [];
        var leftColor = '';
        var showValue = '';
        var boxPosition =[60,0];
        var TP_txt = ''
        // 刻度使用柱状图模拟，短设置1，长的设置3；构造一个数据
        for(var i = 0, len = 60; i <= len; i++) {
          if(i < 10 || i > 60) {
            kd.push('')
          } else {
            if((i - 10) % 10 === 0) {
              kd.push('-3');
            } else   if((i - 10) % 4 === 0) {
              kd.push('-1');
            } else {
              kd.push('');
            }
          }
        }
        //中间线的渐变色和文本内容
        if(TP_value > 30) {
          TP_txt = '温度偏高';
          Gradient.push({
            offset: 0,
            color: '#93FE94'
          }, {
            offset: 0.5,
            color: '#E4D225'
          }, {
            offset: 1,
            color: '#E01F28'
          })
        }
        else if(TP_value > 10) {
          TP_txt = '温度正常';
          Gradient.push({
              offset: 0,
              color: '#93FE94'
            },
            {
              offset: 1,
              color: '#E4D225'
            })
        }
        else {
          TP_txt = '温度偏低';
          Gradient.push({
            offset: 1,
            color: '#93FE94'
          })
        }
        leftColor = Gradient[Gradient.length - 1].color;
        // 因为柱状初始化为0，温度存在负值，所以加上负值60和空出距离10
        var option = {
          backgroundColor: '#fff',
          title: {
            text: '温度计',
            show: false
          },
          yAxis: [
            {
              show: false,
              data: [],
              min: 0,
              max: 50,
              axisLine: {
                show: false
              }
            },
            {
              show: false,
              min: 0,
              max: 50,
            },
          ],
          xAxis: [
            {
              show: false,
              min: -10,
              max: 50,
              data: []
            },
            {
              show: false,
              min: -10,
              max: 50,
              data: []
            },
            {
              show: false,
              min: -10,
              max: 50,
              data: []
            },
            {
              show: false,
              min: -5,
              max: 50,

            }],
          center:[],
          series: [
            {
              name: '条',
              type: 'bar',
              // 对应上面XAxis的第一个对)象配置
              xAxisIndex: 0,
              data: [
                {
                  value: (TP_value + 10),//这个改那个颜色刻度的
                  label: {
                    normal: {
                      show: true,
                      position: boxPosition,
                      /*backgroundColor: {
                          image: 'plugin/subway_beijing/images/power/bg5Valuebg.png',//文字框背景图
                      },*/
                      width: 40,
                      height: 160,
                      formatter: '{back| ' + TP_value + ' }{unit|°C}\n{downTxt|' + TP_txt + '}',
                      rich: {
                        back: {
                          align: 'center',
                          lineHeight: 50,
                          fontSize: 30,
                          fontFamily: 'digifacewide',
                          color: leftColor
                        },
                        unit: {
                          fontFamily: '微软雅黑',
                          fontSize: 14,
                          lineHeight: 50,
                          color: leftColor
                        },
                        downTxt: {
                          lineHeight: 50,
                          fontSize: 20,
                          align: 'center',
                          color: leftColor
                        }
                      }
                    }
                  }
                }
              ],
              barWidth: 18,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, Gradient)
                }
              },
              z: 2
            },
            {
              name: '白框',
              type: 'bar',
              xAxisIndex: 1,
              barGap: '-100%',
              data: [60],
              barWidth: 28,
              itemStyle: {
                normal: {
                  color: '#fff',
                  barBorderRadius: 50,
                }
              },
              z: 1
            },
            {
              name: '外框',
              type: 'bar',
              xAxisIndex: 2,
              barGap: '-100%',
              data: [60],
              barWidth: 30,
              itemStyle: {
                normal: {
                  color: '#fff',
                  barBorderRadius: 50,
                }
              },
              z: 0
            },
            {
              name: '圆',
              type: 'scatter',
              hoverAnimation: false,
              data: [0],
              xAxisIndex: 0,
              symbolSize: 24,
              itemStyle: {
                normal: {
                  color: 'rgb(44,100,228)',
                  opacity: 1,
                }
              },
              z: 2
            },
            {
              name: '白圆',
              type: 'scatter',
              hoverAnimation: false,
              data: [0],
              xAxisIndex: 1,
              symbolSize: 36,
              itemStyle: {
                normal: {
                  color: '#fff',
                  opacity: 1,
                }
              },
              z: 1
            },
            {
              name: '外圆',
              type: 'scatter',
              hoverAnimation: false,
              data: [0],
              xAxisIndex: 2,
              symbolSize: 40,
              itemStyle: {
                normal: {
                  color: 'black',
                  opacity: 1,
                }
              },
              z: 0
            },
            {
              name: '刻度',
              type: 'bar',
              yAxisIndex: 0,
              xAxisIndex: 3,
              label: {
                normal: {
                  show: true,
                  position: 'left',
                  distance: 10,
                  color: 'black',
                  fontSize: 14,
                  formatter: function(params) {
                    if(params.dataIndex > 60 || params.dataIndex < 10) {
                      return '';
                    } else {
                      if((params.dataIndex - 10) % 10 === 0) {
                        return params.dataIndex - 10;//这个改刻度的，当减70的时候刻度是从-60开始不是从零开始
                      } else {
                        return '';
                      }
                    }
                  }
                }
              },
              barGap: '-100%',
              data: kd,
              barWidth: 1,
              itemStyle: {
                normal: {
                  color: 'black',
                  barBorderRadius: 120,
                }
              },
              z: 0
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        // window.onresize = myChart.resize;
        window.addEventListener("resize",function(){
          myChart.resize();
        });
      }
    }
  }
</script>

<style scoped>
  .thermometer{
    width:100%;
    height: 100%;
    border-radius: 10px;
    padding: 30px;
    position: relative;
    box-sizing: border-box;
  }
  .gradient{
    background-color: #fff;
  }
  .time{
    margin-left: 20px;
  }

  /*这是中间*/
  .middle{
    /*width: 300px;*/
    width:100%;
    height: 60%;
    /*border: 1px solid red;*/
    /*position: absolute;*/
    /*left: 60px;*/
    /*top: 100px;*/
    /*border: 1px solid red;*/
  }
  .middle >div{
    width: 100%;
    height: 100%;
  }
  .middle > div:nth-child(1){
    width: 100%;
    height: 80%;
    /*border: 1px solid black;*/
    position: absolute;
  }
  /*.centigrade-num{*/
  /*position: absolute;*/
  /*top: 48px;*/
  /*left: 0px;*/
  /*text-align: right;*/
  /*}*/
  .centigrade-num >ul >li{
    margin-bottom: 25px;
  }
  /*.middle-img{*/
  /*position: absolute;*/
  /*left: 28px;*/
  /*top: 0;*/
  /*}*/
  .centigrade{
    position: absolute;
    top: 12%;
    left: 18%;
  }
  /*.centigrade1{*/
  /*position: absolute;*/
  /*top: 0;*/
  /*right: 0;*/
  /*height: 320px;*/
  /*color: red;*/
  /*line-height: 320px;*/
  /*margin-left: 100px;*/
  /*font-size: 50px;*/
  /*}*/

  /*这是底部*/
  .bottom{
    width:85%;
    height: 20%;
    position: absolute;
    bottom: 10px;
    left: 20px;
  }
  .bottom > ul > li >:nth-child(1){
    margin-right: 20px;
  }
  .bottom > ul > li{
    margin-bottom: 20px;
  }
  ul li{
    list-style: none;
  }
  .bottom-left{
    position: absolute;
    left: 0px;
    top: 0px;
  }
  .bottom-right{
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .green{
    color: #5db446;
  }
  .blue{
    color: #40a6e7;
  }
  .yellow{
    color: #e88b2f;
  }
  #main{
    /*background-color: #55a532;*/
    width: 85%;
    height: 75%;
  }
</style>
