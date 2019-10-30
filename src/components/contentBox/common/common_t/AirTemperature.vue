<template>
  <!--这是气温-->
    <div class="AirTemperature">
      <!--{{getList}}-->
      <!--<div class="left iconfont" @click="upper">&#xe647;</div>-->
      <div class="timer-slot">
        <ul class="box-ul">
          <li @click="showDay(i)" ref="li" v-for="(item,i) in list" :key="i" >
            <div>
              <!--item.time.split(' ')[0].split('-').join('/')-->
              <span>{{item.time.split(' ')[0].split('-').join('/')}}</span>
              <i class="el-icon-refresh" @click="Transformation()"></i>
            </div>
            <!--item.data[0].url-->
            <!--<div><img class="img" :src="item.url" alt=""></div>-->
            <div class="img"><span :class=[item.font]></span></div>
            <div v-if="formal === 'temperature'">
              <p class="list-3">晴</p>
              <!--item.data[0].temperature-->
              {{item.temperature}}
              <span>{{character}}</span>
            </div>
            <div v-else-if="formal === 'visibility'">
              {{item.visibility}}
              <span>{{character}}</span>
              <p class="list-4">能见度良好</p>
            </div>
            <div v-else-if="formal === 'winddir'">
              <p class="list-3">{{item.windspeed}}</p>
              {{item.winddir}}
              <span>{{character}}</span>
            </div>
            <div v-else-if="formal === 'waveheight'">
              {{item.waveheight}}
              <span>{{character}}</span>
            </div>
            <div v-else-if="formal === 'humidity'">
              {{item.humidity}}
              <span>{{character}}</span>
            </div>
            <div v-else-if="formal === 'pressure'">
              {{item.pressure}}
              <span>{{character}}</span>
            </div>
            <div v-else-if="formal === 'precipitation'">
              {{item.precipitation}}
              <span>{{character}}</span>
            </div>
            <div v-else-if="formal === 'smog'">
              {{item.smog}}
              <span>{{character}}</span>
            </div>
<!--            <div class="zz"></div>-->
          </li>
        </ul>
      </div>
      <!--<div class="right iconfont" @click="lower">&#xe666;</div>-->
    </div>
</template>

<script>
    import bus from '../../../../assets/weather_system/eventBus.js'
    export default {
      name: "air-temperature",
      props:{
        toSonData: {
          type: String,
          default: function () {
            return ""
          }
        }
      },
      data(){
        return {
          list:[
            {
              time:'10/15',
              humidity: 80,
              pressure: 1013,
              temperature: '27~30',
              font:'icon-5',
              visibility: 10,
              waveheight: 1.8,
              winddir: 130,
              windspeed: 3.8,
              precipitation:0.5,//降水量
              thunder:10,//雷电
              smog:2.1,//雾霾
            },
            {
              time:'10/16',
              humidity: 80,
              pressure: 1013,
              temperature: '27~29',
              font:'icon-5',
              visibility: 10,
              waveheight: 1.8,
              winddir: 80,
              windspeed: 2.8,
              precipitation:0.5,//降水量
              thunder:10,//雷电
              smog:2.1,//雾霾
            },
            {
              time:'10/17',
              humidity: 80,
              pressure: 1013,
              temperature: '29~34',
              font:'icon-5',
              visibility: 10,
              waveheight: 1.8,
              winddir: 230,
              windspeed: 4.8,
              precipitation:0.5,//降水量
              thunder:10,//雷电
              smog:2.1,//雾霾
            },
            {
              time:'10/18',
              humidity: 80,
              pressure: 1013,
              temperature: '25~31',
              font:'icon-5',
              visibility: 10,
              waveheight: 1.8,
              winddir: 180,
              windspeed: 1.8,
              precipitation:0.5,//降水量
              thunder:10,//雷电
              smog:2.1,//雾霾
            },
            {
              time:'10/19',
              humidity: 80,
              pressure: 1013,
              temperature: '27~33',
              font:'icon-5',
              visibility: 10,
              waveheight: 5.8,
              winddir: 90,
              windspeed: 3.8,
              precipitation:0.5,//降水量
              thunder:10,//雷电
              smog:2.1,//雾霾
            },
            {
              time:'10/20',
              humidity: 80,
              pressure: 1013,
              temperature: '26~30',
              font:'icon-5',
              visibility: 10,
              waveheight: 1.8,
              winddir: 128,
              windspeed: 6.8,
              precipitation:0.5,//降水量
              thunder:10,//雷电
              smog:2.1,//雾霾
            },
            {
              time:'10/21',
              humidity: 80,
              pressure: 1013,
              temperature: '22~30',
              font:'icon-5',
              visibility: 10,
              waveheight: 1.8,
              winddir: 208,
              windspeed: 3.8,
              precipitation:0.5,//降水量
              thunder:10,//雷电
              smog:2.1,//雾霾
            }
          ],
          getList:[],//默认显示的数据
          character:'',//存放每个子组件的单位；
          formal:''//存放的是父组件的数据
        }
      },
      computed: {
          // li默认显示哪个时间段
      },
      created(){
        // console.log(this.toSonData)
        this.formal =this.toSonData;
        switch(this.toSonData){
          case 'temperature': this.character ='℃';break;
          case 'humidity': this.character ='%';break;
          case 'winddir': this.character ='°';break;
          case 'visibility': this.character ='km';break;
          case 'pressure': this.character ='hpa';break;
          case 'waveheight': this.character ='m';break;
          case 'precipitation': this.character ='mm';break;
          case 'smog': this.character ='pm';break;
        }
        for(let i=0;i<this.list.length;i++){
          //判断风向
          if(this.list[i].winddir<90){
            this.list[i].winddir ='东北风'
          }else if(this.list[i].winddir>=90&&this.list[i].winddir<180){
            this.list[i].winddir ='东南风'
          }else if(this.list[i].winddir>=180&&this.list[i].winddir<270){
            this.list[i].winddir ='西南风'
          }else if(this.list[i].winddir<=360){
            this.list[i].winddir.winddir ='西北风'
          }
          //判断风速
          if(this.list[i].windspeed<2){
            this.list[i].windspeed ='微风 <2'
          }else if(this.list[i].windspeed>=3){
            this.list[i].windspeed ='微风 <3'
          }else if(this.list[i].windspeed>=4){
            this.list[i].windspeed ='微风 <4'
          }else if(this.list[i].windspeed<=5){
            this.list[i].windspeed ='微风 <5'
          }else if(this.list[i].windspeed<=6){
            this.list[i].windspeed ='微风 <6'
          }else if(this.list[i].windspeed<=7){
            this.list[i].windspeed ='微风 <7'
          }
          switch(this.toSonData){
            case 'temperature': this.list[i].font ='icon-5';break;
            case 'humidity': this.list[i].font ='icon-40';break;
            case 'winddir': this.list[i].font ='icon-25';break;
            case 'visibility': this.list[i].font ='icon-10';break;
            case 'pressure': this.list[i].font ='icon-37';break;
            case 'waveheight': this.list[i].font ='icon-13';break;
            case 'precipitation': this.list[i].font ='icon-4';break;
            case 'smog': this.list[i].font ='icon-24';break;
          }
        }
        // this.getData()
        // console.log(this.timeList)
      },
      mounted(){
        // this.list =this.getList
        // 这是默认显示每天6点开始的
        // console.log(this.getList)
      },
      methods:{
        // 左右滑动
        // lower(){
        //   for(let i=0;i<4;i++){
        //     let a=this.getList.shift();
        //     this.getList.push(a);
        //   }
        // },
        // upper(){
        //   for(let i=0;i<4;i++){
        //     let a=this.getList.pop();
        //     this.getList.unshift(a);
        //   }
        // },
        //获取当前时间
        // addDate() {
        //   let nowDate = new Date();
        //   let date = {
        //     year: nowDate.getFullYear(),
        //     month: nowDate.getMonth() + 1,
        //     date: nowDate.getDate(),
        //   }
        //   if (date.month >= 1 && date.month <= 9) {
        //     date.month = "0" + date.month;
        //   }
        //   if (date.date >= 0 && date.date <= 9) {
        //     date.date = "0" + date.date;
        //   }
        //   this.date = date.year + '/'  + date.month + '/'  + date.date;
        // },
        //axios接口请求数据
        getData(){
          var time=[];
          var dataNeed = '';
          var arr=[];//获取到的总数据
          var arr2=[];//默认显示的数据
          var that =this;
          that.axios.get("http://api.shipxy.com/apicall/GetWeatherTime?k=e38ef584670348ceae168fe5f3985fa4").then((response) => {
            //将接口中的数据time和各个浪高对应的数据进行组合
            //处理时间
            time = response.data.data;
            // console.log(time)
            // for(var i=0;i<time.length;i++) {
            //   this.axios.get(`http://api.shipxy.com/apicall/GetWeatherByPoint?k=e38ef584670348ceae168fe5f3985fa4&type=11,12,17&time=${time[i]}&lon=155.2134&lat=24.1234`).then((response) => {
            //     dataNeed = response.data;
            //     // console.log(dataNeed);
            //     // console.log(dataNeed);
            //     arr.push(dataNeed);
            //   })
            // }
            // console.log(time)
            getGoodsList(0,time.length);
            function getGoodsList(j,length) {
              that.axios.get(`http://api.shipxy.com/apicall/GetWeatherByPoint?k=e38ef584670348ceae168fe5f3985fa4&type=11,12,17&time=${time[j]}&lon=155.2134&lat=24.1234`)
                .then((response)=> {
                  dataNeed = response.data;
                  console.log(dataNeed)
                  // 这是实现风向功能
                  if(dataNeed.data[0].winddir<90){
                    dataNeed.data[0].winddir ='东北风'+ dataNeed.data[0].winddir;
                  }else if(dataNeed.data[0].winddir>90&&dataNeed.data[0].winddir<180){
                    dataNeed.data[0].winddir ='东南风'+ dataNeed.data[0].winddir;
                  }else if(dataNeed.data[0].winddir>180&&dataNeed.data[0].winddir<270){
                    dataNeed.data[0].winddir ='西南风'+ dataNeed.data[0].winddir;
                  }else if(dataNeed.data[0].winddir<360){
                    dataNeed.data[0].winddir ='西北风'+ dataNeed.data[0].winddir;
                  }else if(dataNeed.data[0].winddir=90){
                    dataNeed.data[0].winddir ='东风'+ dataNeed.data[0].winddir;
                  }else if(dataNeed.data[0].winddir=180){
                    dataNeed.data[0].winddir ='南风'+ dataNeed.data[0].winddir;
                  }else if(dataNeed.data[0].winddir=270){
                    dataNeed.data[0].winddir ='西风'+ dataNeed.data[0].winddir;
                  }else if(dataNeed.data[0].winddir=0){
                    dataNeed.data[0].winddir ='北风'+ dataNeed.data[0].winddir;
                  }
                  dataNeed.data[0].url=require("@/assets/weather_system/image/image_t/sun.svg");
                  // console.log(dataNeed.data[0])
                  arr.push(dataNeed.data[0].temperature);
                  // 这是实现20~30功能
                  if(j===0||j===4||j===8||j===12||j===16||j===20||j===24){
                    arr2.push(dataNeed);
                  }
                  if(++j < length) {
                    getGoodsList(j, length);
                  }
                });
            }
          })
          console.log(arr);
          // this.compareKey(arr,'time')
          that.getList=arr2;
        },
        //获取数组的最大最小值
        getMaximin(array,b) {
          if(b=="max") {
            return Math.max.apply(Math,array);
          } else if(b=="min") {
            return Math.min.apply(Math,array);
          }
        },
        //点击图表进行时间转换
        Transformation(){
            //功能不知道有啥用
        },
        //展示一天的数据
        showDay(i){
          // console.log(i)
          bus.$emit('Event',i)
          let li =this.$refs.li;

        }
      },
    }
</script>

<style scoped>
  @import "../../../../assets/public/icomoon/style.css";
.AirTemperature{
  width: 100%;
  height:100%;
  border-radius: 10px;
  color: white;
  background-color: rgb(248,248,248);
  box-sizing: border-box;
  left:0 ;
  top: 0px;
  position: absolute;
  /*border: 1px solid red;*/
}
@font-face {
  font-family: 'iconfont';
  src: url('../../../../assets/public/icomoon/fonts/icomoon.eot');
  src: url('../../../../assets/public/icomoon/fonts/icomoon.eot?#iefix') format('embedded-opentype'),
  url('../../../../assets/public/icomoon/fonts/icomoon.woff') format('woff'),
  url('../../../../assets/public/icomoon/fonts/icomoon.ttf') format('truetype');
}
.iconfont{
  font-family: "iconfont" !important;
  font-size: 36px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  /*.left{*/
    /*position: absolute;*/
    /*left: 20px;*/
    /*top: 160px;*/
    /*z-index: 999;*/
    /*cursor: pointer;*/
    /*color: rgb(103,103,103);*/
    /*!*border: 1px solid red;*!*/
  /*}*/
  .img >span{
    /*border: 1px solid red;*/
    font-size: 50px;
  }
.timer-slot{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  left: 0px;
  top: 0px;
  /*border: 1px solid red;*/
}
.timer-slot >ul{
  width: 100%;
  height: 100%;
  /*border: 1px solid red;*/
}
.box-ul{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap:nowrap;
  /*margin: 5px;*/
}
.box-ul>li{
  list-style:none;
  background:#ddd;
  margin: 10px;
}
.timer-slot >ul >li{
  float: left;
  overflow: hidden;
  width: 12%;
  /*width: 14%;*/
  height: 100%;
  box-sizing: border-box;
  /*margin: 0 18px;*/
  border-radius: 8px;
  cursor: pointer;
  /*border: 1px solid red;*/
  background:url("../../../../../static/img/weatherbackground.png");
  /*background-position: left -60px top -10px;*/
  background-position: left -40px top -10px;
  background-repeat:no-repeat;
}
.timer-slot >ul>:nth-child(1){
  margin-left: 0px;
}
.timer-slot >ul>:nth-child(7){
  margin-right: 0;
}
.timer-slot >ul >li >:nth-child(1){
  margin-top: 20px;
}
.timer-slot >ul >li>:nth-child(2){
  color: white;
  margin-top: 60%;
}
.timer-slot >ul >li >div{
  width: 100%;
  height: auto;
  font-size: 16px;
  clear: left;
  float: left;
  text-align: center;
}
.timer-slot >ul >li >:nth-child(3){
  margin-top: 60%;
}

/*.right{*/
  /*position: absolute;*/
  /*right: 20px;*/
  /*top: 160px;*/
  /*color: rgb(103,103,103);*/
  /*cursor: pointer;*/
/*}*/
.list-3{
  margin-bottom: 20px;
}
.list-4{
  /*margin-bottom: 20px;*/
  margin-top: 20px;
}
</style>
