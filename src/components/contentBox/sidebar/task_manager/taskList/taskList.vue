<template>
  <!--作业人员-->
  <div class="taskList">
    <div class="taskListHeader">
      <el-input placeholder="请输入姓名/账号"  suffix-icon="el-icon-search" class="taskListHeaderInput"  v-model="search" clearable>
      </el-input>
      <!--<searchBox class="alarmMessageHeaderInput" hint="请输入警报船队"></searchBox>-->
      <el-button type="primary" @click="add()" class="add">添加任务</el-button>
    </div>
    <div class="allTask"><span>所有任务</span></div>
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
          prop="taskName"
          label="任务名称"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="entryIntoForceTime"
          label="生效时间"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="failureTime"
          label="失效时间"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="taskType"
          label="任务类型"
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
             <el-tooltip placement="top" content="任务下发" effect="light" class="bor">
               <span  @click="assignment(scope.$index, scope.row)"><i class="icon-14"></i></span>
             </el-tooltip>
             <el-tooltip placement="top" content="任务详情" class="bor1" effect="light">
               <span  @click="open();edit(scope.$index, scope.row)"><i class="icon-21"></i></span>
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
    <taskListFrame :show.sync="show" :title1="title1" :sonData="sonData"></taskListFrame>
    <addFrame :show.sync="centerDialogVisible"></addFrame>
    <!--这是选择作业人员弹框-->
    <el-dialog
      title="选择作业人员"
      :visible.sync="dialogVisible"
      :modal="false"
      width="40%"
      custom-class="elastic-box"
      center>
      <!--这是复选框-->
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        style='margin:0 30% '
      >
        <!--:default-checked-keys="[5]"默认选中-->
      </el-tree>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
  const cityOptions = ['小邓', '小白', '小刘'];
  import Paging from "../../../common/common_t/Paging.vue"
  import taskListFrame from "./taskListFrame.vue"
  import addFrame from "./addFrame.vue"
  export default {
    name: "taskList",
    components: {
      Paging,
      taskListFrame,
      addFrame
    },
    data() {
      return {
        show: false,//详情弹框
        centerDialogVisible: false,//添加弹框
        dialogVisible:false,//控制弹框的隐藏和显示
        title1:'',//用于确定弹框的title
        sonData:{},//传给子组件的对象
        search:'',//用于全局搜索
        txt:'禁用',
        txt1:'启用',
        tableList:[],//操作表格数据
        //存放表格数据
        tableData: [{
          SerialNum:'1',//工号
          taskName:'VRBQ6',//任务名称
          entryIntoForceTime:'2019.10.17',//生效时间
          failureTime:'2019',//失效时间
          taskType:'普通任务',//任务类型
          taskDescription:'检修风机',//任务描述
          taskCycle:'两天一次',//任务周期
          creationTime:'19-10-16 10:40',//创建时间
          distributor:'小邓',//分发人员
          style:false,//存放class类名
          // date: '2016-05-02',//时间
        },
          {
            SerialNum:'2',//工号
            taskName:'VRBQ7',//任务名称
            entryIntoForceTime:'2019.10.17',//生效时间
            failureTime:'正常',//失效时间
            taskType:'普通任务',//任务类型
            taskDescription:'检修风机.....',//任务描述
            taskCycle:'每天',//任务周期
            creationTime:'19-10-16 10:40',//创建时间
            distributor:'小邓',//分发人员
            style:true,//存放class类名
            // date: '2016-05-02',//时间
          },],
        //复选框
        data: [{
          id: 1,
          label: '全选',
          children: [{
            id: 3,
            label: '电气运行专责',
            children: [{
              id: 4,
              label: '电气运行专员',
              children:[
                {
                  id: 8,
                  label: '小刘',
                },
                {
                  id: 9,
                  label: '小张',
                },
                {
                  id: 10,
                  label: '小李',
                }
              ]
            }, {
              id: 5,
              label: '电气管理专员',
              // disabled: true
            }]
          }, {
            id: 2,
            label: '设备运行专责',
            // disabled: true,
            children: [{
              id: 6,
              label: '设备管理专员'
            }, {
              id: 7,
              label: '设备运行专员',
              // disabled: true
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
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
      parentAdd(){

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
        this.centerDialogVisible=true;
      },
      //选择作业人员
      assignment(index,row){
        this.dialogVisible=true;
      },
      // 详情/修改数据
      edit(index,row){
        this.title1 ='任务详情';
        // console.log(index, row);
        this.sonData=row;
      },
      //这是禁用
      prohibit(index,row){
        console.log(index, row);
        for(let i=0;i<this.tableData.length;i++){
          if(index === i){
            row.style=!row.style;
          }
        }
      },
      //复选框全选功能
    },
  }
</script>

<style scoped>
  @import "../../../../../assets/public/icomoon/style.css";
  .taskList{
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    border-radius: 10px;
    /*border: 1px solid red;*/
    background-color: rgb(255,255,255);
  }
  .taskListHeader{
    height: 50px;
    width: 100%;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0);
  }
  .taskListHeaderInput{
    width: 20%;
    height: 40px;
    line-height: 40px;
    /*border: 1px solid red;*/
  }
  .add{
    height: 40px;
    border-radius: 40px;
    /*border: 1px solid red;*/
    /*margin-right: 10px;*/
    position: absolute;
    right: 10px;
    top: 0;
  }
  .allTask{
    width: 64px;
    /*margin-left: 6%;*/
    font-size: 16px;
    padding-bottom: 5px;
    border-bottom: 3px solid #2c64e4;
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
  .div{
    display: block;
    margin-left: 60px;
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
  .bor,.bor1,.bor2, .bor3{
    display: inline-block;
    height: 28px;
    width: 28px;
    padding: 1px 3px  3px 3px;
    /*margin-right: 3px;*/
    box-sizing: border-box;
    font-size: 18px;
    margin: auto;
    text-align: center;
    border-radius: 10px;
  }
  .center{
    width: 132px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .bor{
    border: 2px solid #a54fff;
    color: #a54fff;
    position: absolute;
    top: 10px;
    left: 15px;
    /*margin-left: 2px;*/
  }
  .bor1{
    border: 2px solid #2c64e4;
    /*padding: 3px;*/
    font-size: 14px;
    position: absolute;
    top: 10px;
    left: 50px;
    color: #2c64e4;
  }
  .bor2{
    border: 2px solid #2c64e4;
    color: #2c64e4;
    position: absolute;
    top: 10px;
    left: 87px;
  }
  .bor3{
    border: 2px solid #ff861a;
    color: #ff861a;
    font-size: 16px;
    position: absolute;
    top: 10px;
    left: 87px;
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
  .taskListHeaderInput .el-input__inner {
    border-radius: 40px;
    display: inline-block;
    background-color: rgb(247,247,247);
  }
</style>
