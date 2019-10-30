<template>
  <div  class="monitoringManagement">
      <div class="monitoringManagementHeader">
        <el-input placeholder="请输入摄像头编号" suffix-icon="el-icon-search" class="monitoringManagementHeaderInput"  v-model="search" clearable>
        </el-input>
        <!--<searchBox class="alarmMessageHeaderInput" hint="请输入警报船队"></searchBox>-->
       <!--<div style="float: right">-->
         <!--<el-button type="primary" @click="monitoringPicture()" class="blue button">监控画面</el-button>-->
         <!--<el-button type="primary" @click="historicalRecord()" class="button">历史记录</el-button>-->
       <!--</div>-->
      </div>
      <!--这是中间图片展示-->
      <div class="middle">
        <!--<router-link :to="">-->
          <div @click="specific(index)" v-for="(item,index) in tableData" class="div-hover" >
            <div class="num-hover">{{item.num}}</div>
            <div class="tips">
              <p>编号；<span>{{item.num}}</span></p>
              <p>型号；<span>{{item.model}}</span></p>
              <p>经度；<span>{{item.longitude}}</span></p>
              <p>纬度；<span>{{item.latitude}}</span></p>
              <p>摄像头状态；<span>{{item.cameraStatus}}</span></p>
              <p>上报时间；<span>{{item.reportingTime}}</span></p>
              <p>备注；<span>{{item.remarks}}</span></p>
            </div>
            <div>
              <img :src="item.url" alt="">
            </div>
            <!--<img src="" alt="">-->
          </div>
        <!--</router-link>-->
      </div>
      <div class="bottom">
        <!--<div >-->
          <!--<el-button type="primary" @click="historicalRecord()" class="button">视频导出</el-button>-->
        <!--</div>-->
        <div class="page">
          <!--@childFn="parentFn"-->
          <Paging :list="tableList" ></Paging>
        </div>
      </div>
    </div>
</template>

<script>
  import Paging from "../../../common/common_t/Paging.vue"
  // import monitoringManagementFrame from "./monitoringManagementFrame.vue"
    export default {
        name: "monitoringManagement",
      components: {
        Paging,
        // monitoringManagementFrame
      },
      data(){
        return{
          flag:true,
          search:'',//用于全局搜索
          childNum:'',//给子路由的编号
          tableList:[],//操作摄像头数据
          tableData: [
            {
            num:'1',//摄像头编号
            url:require('../../../../../assets/video_system/image/image_t/1.png'),//图片路径
            model:'BTWS',//型号
            longitude:'160°',//经度
            latitude:'118°',//纬度
            cameraStatus:'运行',//摄像头状态
            reportingTime:'20.19.10.16 15:30',//上报时间
            remarks:'无备注',//备注
          },
            {
              num:'2',//摄像头编号
              url:require('../../../../../assets/video_system/image/image_t/2.png'),//图片路径
              model:'',//型号
              longitude:'',//经度
              latitude:'118°',//纬度
              cameraStatus:'运行',//摄像头状态
              reportingTime:'20.19.10.16 15:30',//上报时间
              remarks:'无备注',//备注
            },
            {
              num:'3',//摄像头编号
              url:require('../../../../../assets/video_system/image/image_t/3.png'),//图片路径
              model:'',//型号
              longitude:'',//经度
              latitude:'118°',//纬度
              cameraStatus:'运行',//摄像头状态
              reportingTime:'20.19.10.16 15:30',//上报时间
              remarks:'无备注',//备注
            },
            {
              num:'4',//摄像头编号
              url:require('../../../../../assets/video_system/image/image_t/4.png'),//图片路径
              model:'',//型号
              longitude:'',//经度
              latitude:'118°',//纬度
              cameraStatus:'运行',//摄像头状态
              reportingTime:'20.19.10.16 15:30',//上报时间
              remarks:'无备注',//备注
            },
            {
              num:'5',//摄像头编号
              url:require('../../../../../assets/video_system/image/image_t/5.png'),//图片路径
              model:'',//型号
              longitude:'',//经度
              latitude:'118°',//纬度
              cameraStatus:'运行',//摄像头状态
              reportingTime:'20.19.10.16 15:30',//上报时间
              remarks:'无备注',//备注
            },
            {
              num:'6',//摄像头编号
              url:require('../../../../../assets/video_system/image/image_t/6.png'),//图片路径
              model:'',//型号
              longitude:'',//经度
              latitude:'118°',//纬度
              cameraStatus:'运行',//摄像头状态
              reportingTime:'20.19.10.16 15:30',//上报时间
              remarks:'无备注',//备注
            },
            {
              num:'7',//摄像头编号
              url:require('../../../../../assets/video_system/image/image_t/7.png'),//图片路径
              model:'',//型号
              longitude:'',//经度
              latitude:'118°',//纬度
              cameraStatus:'运行',//摄像头状态
              reportingTime:'20.19.10.16 15:30',//上报时间
              remarks:'无备注',//备注
            },
            {
              num:'8',//摄像头编号
              url:require('../../../../../assets/video_system/image/image_t/8.png'),//图片路径
              model:'',//型号
              longitude:'',//经度
              latitude:'118°',//纬度
              cameraStatus:'运行',//摄像头状态
              reportingTime:'20.19.10.16 15:30',//上报时间
              remarks:'无备注',//备注
            },
          ],
        }
      },
      created(){
        this.tableList = this.tableData;
      },
      computed:{
        tables:function(){
          let search=this.search;
          if(search){
            return  this.tableData.filter(function(dataNews){
              return Object.keys(dataNews).some(function(key){
                return String(dataNews[key]).toLowerCase().indexOf(search) > -1
              })
            })
          }
          return this.tableData
        }
      },
      methods:{
        // //子组件传给父组件的值
        // parentFn(payload) {
        //   // this.currentPage = payload;
        //   console.log(payload);
        //   this.tableData = payload
        // },
        //点击的具体展示
        specific(index){
          // console.log(index);
          this.childNum=index+1;
          this.flag=!this.flag;
          this.$router.push({name:"monitoringManagementFrame",params:{ userId: this.childNum}})
        }
      },
    }
</script>

<style scoped>
  .monitoringManagement{
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    border-radius: 10px;
    /*border: 1px solid red;*/
    background-color: rgb(255,255,255);
  }
  .monitoringManagementHeader{
    height: 10%;
    width: 100%;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0);
  }
  .monitoringManagementHeaderInput{
    width: 20%;
    height: 40px;
    /*margin-left: 1.5%;*/
    line-height: 40px;
    /*border: 1px solid red;*/
  }
  .middle{
    width: 100%;
    /*margin: 20px 5%;*/
    height: 80%;
    /*border: 1px solid red;*/
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
  }
  .middle >div{
    display: flex;
    /*align-items:center;*/
    margin:auto;
    width: 24%;
    height: 48%;
    border-radius: 15px;
    /*background-color: #55a532;*/
    position: relative;
    /*border: 1px solid red;*/
  }
  .middle >div >:nth-of-type(1){
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 20px;
    background-color: #97a9c1;
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .tips{
    color: white;
    width: 70%;
    height: 70%;
    padding: 10px;
    box-sizing: border-box;
    position: absolute;
    font-size: 10px;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /*border: 1px solid red;*/
    border-radius: 10px;
    background-color: rgba(13, 13, 13, 0.77);
    display: none;
  }
  .num-hover{
    position: relative;
    /*z-index: 999;*/
  }
  .div-hover:hover   .tips{
    display: block;
  }
  .div-hover> :nth-of-type(3){
    width: 100%;
    height: 100%;
  }
  .div-hover> :nth-of-type(3)>img{
    width: 100%;
    height: 100%;
    /*border: 1px solid black;*/
  }
  .page{
    position: absolute;
    bottom: 0;
    top: 0;
    margin: auto;
    right: 20px;
    /*margin: auto;*/
    /*width: 30%;*/
    /*border: 1px solid red;*/
    width: 28%;
    height: 50%;
    text-align: center;
  }
  .bottom{
    /*height: auto;*/
    width: 100%;
    height: 10%;
    line-height: 10%;
    /*border: 1px solid red;*/
    /*margin-top: 60px;*/
    position: relative;
  }
</style>
<style>
  /*.monitoringManagementHeaderInput*/
  .monitoringManagementHeaderInput .el-input__inner{
    border-radius: 40px;
    background-color: rgb(247,247,247);
  }
</style>
