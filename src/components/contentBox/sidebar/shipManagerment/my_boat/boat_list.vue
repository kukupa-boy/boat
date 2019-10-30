<template>
  <!--船舶列表-->
  <div class="box-1">
    <div class="operationPersonnel">
      <div class="operationPersonnelHeader">
        <el-input placeholder="请输入姓名" suffix-icon="el-icon-search" class="operationPersonnelHeaderInput"  v-model="search" clearable>
        </el-input>
        <!--<searchBox class="alarmMessageHeaderInput" hint="请输入警报船队"></searchBox>-->
        <el-button  @click="open();add()" class="add">添加船舶</el-button>
      </div>
      <div>
        <el-table
          :data="tables"
          style="width: 100%;font-size: 16px"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="serialNum"
            label="序号"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="shipNumber"
            label="船号"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="shipNum"
            label="船舶呼号"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="mmsiCode"
            label="mmsi"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="iomCode"
            label="imo号码"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="shipType"
            label="船舶类型"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="shipLongDeep"
            label="长/深"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="creationTime"
            label="创建时间"
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
              <span  @click="open();edit(scope.$index, scope.row)"><i class="bor icon-2"></i></span>
              <span  @click="open();del(scope.$index, scope.row)"> <i class="bor1 icon--2"></i></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--这是分页-->
      <div class="page">
        <Paging :list="tableList" @childFn="parentFn"></Paging>
      </div>
      <add :show.sync="show" :title1="title1" :sonData="sonData"></add>
    </div>
  </div>
</template>

<script>
  import Paging from "../../../common/common_t/Paging.vue"
  import add from "./childrenComponents/add_boat.vue"
  export default {
    name: "OperationPersonnel",
    components: {
      Paging,
      add
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
          serialNum:'1',//序号
          shipNumber:'111',//船号
          shipNum:'VRBQ6',//船舶呼号
          mmsiCode:'574374000',//海上移动业务识别码
          iomCode:'9384526',//iom号码
          shipType:'搜救船',//船舶类型
          shipLongDeep:'190公尺 2.4公尺',//长/深
          creationTime:'2019.9.29 15:46:03',//创建时间
          // date: '2016-05-02',//时间
        },
          {
            serialNum:'2',//序号
            shipNumber:'222',//船号
            shipNum:'VRBQ6',//船舶呼号
            mmsiCode:'574374000',//海上移动业务识别码
            iomCode:'9384526',//iom号码
            shipType:'搜救船',//船舶类型
            shipLongDeep:'190公尺 2.4公尺',//长/深
            creationTime:'2019.9.29 15:46:03',//创建时间
            // date: '2016-05-02',//时间
          },
          {
            serialNum:'3',//序号
            shipNumber:'333',//船号
            shipNum:'VRBQ6',//船舶呼号
            mmsiCode:'574374000',//海上移动业务识别码
            iomCode:'9384526',//iom号码
            shipType:'搜救船',//船舶类型
            shipLongDeep:'190公尺 2.4公尺',//长/深
            creationTime:'2019.9.29 15:46:03',//创建时间
            // date: '2016-05-02',//时间
          }]
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
        this.title1 ='添加船舶'
      },
      // 修改数据
      edit(index,row){
        this.title1 ='编辑信息';
        // console.log(index, row);
        this.sonData=row;
      },
      //删除数据
      del(index,row){
        this.title1 ='删除信息'
        // console.log(index, row);
        this.sonData=row;
      },
    },
  }
</script>

<style scoped>
  @import "../../../../../assets/public/icomoon/style.css";
  .box-1{
    width: 100%;
    height: 100%;
    /*border: 1px solid red;*/
    padding: 20px 6%;
    box-sizing: border-box;
    background-color: rgb(240,240,240);
  }
  .edit{
    border: 2px solid blue;
    color: blue;
    border-radius: 5px;
  }
  .del{
    border: 2px solid gainsboro;
    color: gainsboro;
    border-radius: 5px;
  }
  .operationPersonnel{
    height: 90%;
    padding: 20px;
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
  .operationPersonnelHeader >button{
    color: white;
    border-radius: 50px;
    background-color: rgb(44,100,228);
  }
  .operationPersonnelHeaderInput{
    width: 20%;
    height: 40px;
    line-height: 40px;
    /*border: 1px solid red;*/
  }
  .add{
    height: 40px;
    /*border: 1px solid red;*/
    /*margin-right: 10px;*/
    position: absolute;
    right: 10px;
    top: 0;
  }
  .page{
    position: absolute;
    bottom: 30px;
    left:70%;
    right: 0;
    margin: auto;
    width: auto;
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
    border: 2px solid blue;
    color: blue;
  }
  .bor1{
    border: 2px solid ;

  }
</style>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
