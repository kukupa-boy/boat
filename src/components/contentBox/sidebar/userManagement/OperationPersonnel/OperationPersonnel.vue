<template>
    <!--作业人员-->
<div class="operationPersonnel">
  <div class="operationPersonnelHeader">
    <el-input placeholder="请输入姓名/账号" suffix-icon="el-icon-search" class="operationPersonnelHeaderInput"  v-model="search" clearable>
    </el-input>
    <!--<searchBox class="alarmMessageHeaderInput" hint="请输入警报船队"></searchBox>-->
    <el-button type="primary" @click="open();add()" class="operationPersonnelAdd">添加用户</el-button>
  </div>
  <div>
    <el-table
      :data="tables"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="SerialNum"
        label="序号"
        header-align="center"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="headPortrait"
        label="头像"
        header-align="center"
        align="center"
      >
        <!--这是显示头像-->
        <template slot-scope="scope">
          <!--<img :src="scope.row.headPortrait"  class="head_pic"/>-->
          <el-popover
            placement="right-start"
            title=""
            popper-class="elasticFrame"
            offset="1 3"
            trigger="click">
            <img :src="scope.row.headPortrait"/>
            <img slot="reference" :src="scope.row.headPortrait" :alt="scope.row.headPortrait"  class="head_pic" style="max-height: 50px;max-width: 130px">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="accountNumber"
        label="账号"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        header-align="center"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="personStatus"
        label="人员状态"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="post"
        label="岗位"
        header-align="center"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop=""
        label="操作"
        header-align="center"
        align="center"
        >
        <template slot-scope="scope">
        <div class="center">
          <el-tooltip placement="top" content="详情/编辑" effect="light" class="bor">
            <span  @click="open();edit(scope.$index, scope.row)"><span class=" icon-21"></span></span>
          </el-tooltip>
          <el-tooltip placement="top" :content="scope.row.style?txt1:txt" :class="scope.row.style?'bor3':'bor2'" effect="light">
            <span  @click="prohibit(scope.$index,scope.row)"><i :class="scope.row.style?'icon-39':'icon-2'"></i></span>
          </el-tooltip>
        </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!--这是分页-->
  <div class="page">
    <Paging :list="tableList" @childFn="parentFn"></Paging>
  </div>
  <OperatorCartridgeFrame :show.sync="show" :title1="title1" :sonData="sonData"></OperatorCartridgeFrame>
</div>
</template>

<script>
  import Paging from "../../../common/common_t/Paging.vue"
  import OperatorCartridgeFrame from "./OperatorCartridgeFrame.vue"
    export default {
      name: "OperationPersonnel",
      components: {
        Paging,
        OperatorCartridgeFrame
      },
      data() {
        return {
          show: false,
          dialogVisible:false,//控制弹框的隐藏和显示
          title1:'',//用于确定弹框的title
          sonData:{},//传给子组件的对象
          txt:'禁用',
          txt1:'启用',
          search:'',//用于全局搜索
          tableList:[],//操作表格数据
          //存放表格数据
          tableData: [{
            SerialNum:'1',//工号
            headPortrait:require('../../../../../assets/person_system/image/image_t/portrait1.jpg'),//头像
            age:'25',//年龄
            name:'小白',//员工姓名
            gender:'女',//性别
            accountNumber:'VRBQ6',//账号
            post:'电气运行专员',//岗位
            personStatus:'正常',//人员状态
            phone:'9090980',//员工电话
            style:false,//存放class类名
            // date: '2016-05-02',//时间
          },
            {
              SerialNum:'2',//工号
              headPortrait:require('../../../../../assets/person_system/image/image_t/portrait2.jpg'),//头像
              age:'26',//年龄
              name:'小黑',//员工姓名
              gender:'男',//性别
              accountNumber:'VRBQ7',//账号
              post:'电气巡检专员',//岗位
              personStatus:'正常',//人员状态
              phone:'9090940',//员工电话
              style:false,//存放class类名
              // date: '2016-05-02',//时间
            },
            {
              SerialNum:'3',//工号
              headPortrait:require('../../../../../assets/person_system/image/image_t/portrait3.jpg'),//头像
              age:'20',//年龄
              name:'小彭',//员工姓名
              gender:'女',//性别
              accountNumber:'VRBQ7',//账号
              post:'设备运行专员',//岗位
              personStatus:'正常',//人员状态
              phone:'9090940',//员工电话
              style:false,//存放class类名
              // date: '2016-05-02',//时间
            },
            {
              SerialNum:'4',//工号
              headPortrait:require('../../../../../assets/person_system/image/image_t/portrait4.jpg'),//头像
              age:'21',//年龄
              name:'小范',//员工姓名
              gender:'女',//性别
              accountNumber:'VRBQ7',//账号
              post:'设备巡检专员',//岗位
              personStatus:'正常',//人员状态
              phone:'9090940',//员工电话
              style:false,//存放class类名
              // date: '2016-05-02',//时间
            },]
        }
      },
      created(){
        this.tableList = this.tableData;
        //这是判断一页显示几条数据
        let arr=[];
        if(this.tableData.length>9){
          for(let i=0;i<9;i++){
            arr.push(this.tableData[i]);
          }
          this.tableData =arr;
        }
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
      methods: {
        tableRowClassName({row, rowIndex}) {
          if (rowIndex === 1) {
            return 'warning-row';
          } else if (rowIndex === 3) {
            return 'success-row';
          }
          return '';
        },
        //子组件传给父组件的值
        parentFn(payload) {
          // this.currentPage = payload;
          console.log(payload);
          this.tableData = payload
        },
        // 对应行的下标
        See(index, row) {
          console.log(index, row);
        },
        //打开弹框
        open () {
          this.show = true;
        },
        //新增数据
        add(){
          this.title1 ='添加用户'
        },
        // 详情/修改数据
        edit(index,row){
          this.title1 ='用户信息'
          // console.log(index, row);
          this.sonData=row;
        },
        prohibit(index,row){
          // console.log(index, row);
          for(let i=0;i<this.tableData.length;i++){
            if(index === i){
              row.style=!row.style;
            }
          }
        }
      },
    }
</script>

<style scoped>
  @import "../../../../../assets/public/icomoon/style.css";
  .operationPersonnel{
    height: 100%;
    padding: 20px;
    border-radius: 10px;
    box-sizing: border-box;
    position: relative;
    /*border: 1px solid red;*/
    background-color: rgb(255,255,255);
  }
  .operationPersonnelHeader{
    height: 50px;
    width: 100%;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0);
  }
  .operationPersonnelHeaderInput{
    width: 20%;
    height: 40px;
    border-radius: 40px;
    line-height: 40px;
    /*border: 1px solid red;*/
  }
  @font-face {
    font-family: 'icomoon';
    src: url('../../../../../assets/public/icomoon/fonts/icomoon.eot');
    src: url('../../../../../assets/public/icomoon/fonts/icomoon.eot?#iefix') format('embedded-opentype'),
    url('../../../../../assets/public/icomoon/fonts/icomoon.woff') format('woff'),
    url('../../../../../assets/public/icomoon/fonts/icomoon.ttf') format('truetype');
  }
  #iconStyle:before{
    font-size: 30px;
  }
  .head_pic{
    height: 30px;
    width: 30px;
    border-radius: 30px;
  }
  .elasticFrame img{
    width: 400px;
    height: 400px;
    background-color: red;
    overflow: hidden;
  }
  .iconfont{
    font-family: "icomoon" !important;
    font-size: 36px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .operationPersonnelAdd{
    height: 40px;
    /*border: 1px solid red;*/
    /*margin-right: 10px;*/
    border-radius: 40px;
    position: absolute;
    right: 10px;
    top: 0;
  }
  .page{
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: auto;
    width: 85%;
    text-align: right;
  }
  .center{
    width: 90px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .bor,.bor2,.bor3{
    display: inline-block;
    padding: 1px 3px 3px 3px;
    height: 28px;
    width: 28px;
    margin-right: 5px;
    box-sizing: border-box;
    font-size: 20px;
    text-align: center;
    border-radius: 10px;
  }
  .bor{
    border: 2px solid #2c64e4;
    color: #2c64e4;
    /*padding: 5px;*/
    padding: 2px 4px 4px 4px;
    font-size: 14px;
    position: absolute;
    top: 10px;
    left: 15px;
  }
  .bor2{
    border: 2px solid #2c64e4;
    color: #2c64e4;
    /*font-size: 18px;*/
    position: absolute;
    top: 10px;
    left: 50px;
  }
  .bor3{
    border: 2px solid #ff861a;
    color: #ff861a;
    font-size: 16px;
    position: absolute;
    top: 10px;
    left: 50px;
  }
</style>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  /*.elastic-box>div:nth-child(1){*/
    /*color: white;*/
    /*background-color: rgb(78,125,230);*/
  /*}*/
  /*.elastic-box>div:nth-child(1) >span{*/
    /*color: white;*/
  /*}*/
  .operationPersonnelHeaderInput .el-input__inner{
    border-radius: 40px;
    background-color: rgb(247,247,247);
  }
</style>
