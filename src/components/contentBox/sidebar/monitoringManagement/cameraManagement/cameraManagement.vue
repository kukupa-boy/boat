<template>
  <!--摄像头管理-->
  <div class="cameraManagement">
    <div class="cameraManagementHeader">
      <el-input placeholder="请输入摄像头型号/型号" suffix-icon="el-icon-search" class="cameraManagementHeaderInput"  v-model="search" clearable>
      </el-input>
      <!--<searchBox class="alarmMessageHeaderInput" hint="请输入警报船队"></searchBox>-->
      <el-button type="primary" @click="open();add()" class="cameraManagementAdd">添加摄像头</el-button>
    </div>
    <div>
      <el-table
        :data="tables"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
          prop="num"
          label="编号"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="model"
          label="型号"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="longitude"
          label="经度"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="latitude"
          label="维度"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="cameraStatus"
          label="摄像头状态"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="reportingTime"
          label="上报时间"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注"
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
            <el-tooltip placement="top" content="详情/编辑"  effect="light">
              <span @click="open();edit(scope.$index, scope.row)"><i class="bor icon-48"></i></span>
            </el-tooltip>
            <el-tooltip placement="top" content="删除"  effect="light">
              <span @click="open3();del(scope.$index, scope.row)" :plain="true"> <i class="bor1 icon--2"></i></span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--这是分页-->
    <div class="page">
      <Paging :list="tableList" @childFn="parentFn"></Paging>
    </div>
    <cameraManagementFrame :show.sync="show" :title1="title1" :sonData="sonData"></cameraManagementFrame>
  </div>
</template>

<script>
  import Paging from "../../../common/common_t/Paging.vue"
  import cameraManagementFrame from "./cameraManagementFrame.vue"
  export default {
    name: "cameraManagement",
    components: {
      Paging,
      cameraManagementFrame
    },
    data() {
      return {
        show: false,
        dialogVisible:false,//控制弹框的隐藏和显示
        title1:'',//用于确定弹框的title
        sonData:{},//传给子组件的对象
        search:'',//用于全局搜索
        tableList:[],//操作表格数据
        //存放表格数据
        tableData: [{
          num:'1',//编号
          model:'BTWS',//型号
          longitude:'117°',//经度
          latitude:'118°',//纬度
          cameraStatus:'运行',//摄像头状态
          reportingTime:'20.19.10.16 15:30',//上报时间
          remarks:'无备注',//备注
          // date: '2016-05-02',//时间
        },
          {
            num:'2',//编号
            model:'BTWS',//型号
            longitude:'127°',//经度
            latitude:'149°',//纬度
            cameraStatus:'故障',//摄像头状态
            reportingTime:'20.19.10.16 15:30',//上报时间
            remarks:'无备注',//备注
            // date: '2016-05-02',//时间
          },
          {
            num:'3',//编号
            model:'BTWS',//型号
            longitude:'167°',//经度
            latitude:'38°',//纬度
            cameraStatus:'维护中',//摄像头状态
            reportingTime:'20.19.10.16 15:30',//上报时间
            remarks:'无备注',//备注
            // date: '2016-05-02',//时间
          },
         ]
      }
    },
    created(){
      this.tableList = this.tableData;
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
        this.title1 ='添加摄像头'
      },
      // 修改数据
      edit(index,row){
        this.title1 ='编辑摄像头';
        console.log(index, row);
        this.sonData=row;
      },
      //删除数据
      del(index,row){
        this.title1 ='删除信息'
        console.log(index, row);
      },
      open3() {
        this.$message({
          message: '恭喜你，删除成功',
          type: 'warning'
        });
      },
    },
  }
</script>

<style scoped>
  @import "../../../../../assets/public/icomoon/style.css";
  .cameraManagement{
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    /*border: 1px solid red;*/
    background-color: rgb(255,255,255);
  }
  .cameraManagementHeader{
    height: 50px;
    width: 100%;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0);
  }
  .cameraManagementHeaderInput{
    width: 20%;
    height: 40px;
    line-height: 40px;
    /*border: 1px solid red;*/
  }
  .cameraManagementAdd{
    height: 40px;
    border-radius: 40px;
    /*border: 1px solid red;*/
    /*margin-right: 10px;*/
    position: absolute;
    right: 10px;
    top: 0;
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
  .iconfont{
    font-family: "icomoon" !important;
    font-size: 36px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .page{
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: auto;
    width: 88%;
    text-align: right;
    /*border: 1px solid red;*/
  }
  .bor,.bor1{
    display: inline-block;
    /*height: auto;*/
    /*width: auto;*/
    padding: 3px;
    margin-right: 5px;
    box-sizing: border-box;
    font-size: 20px;
    text-align: center;
    border-radius: 10px;
  }
  .bor{
    border: 2px solid #00a800;
    color: #00a800;
  }
  .bor1{
    border: 2px solid ;
    /*color: ;*/
  }
</style>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .elastic-box>div:nth-child(1){
    color: white;
    background-color: rgb(78,125,230);
  }
  .elastic-box>div:nth-child(1) >span{
    color: white;
  }
  /*cameraManagementHeaderInput*/
  .cameraManagementHeaderInput .el-input__inner{
    border-radius: 40px;
    background-color: rgb(247,247,247);
  }
</style>
