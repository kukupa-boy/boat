<template>
  <!--任务通知-->
  <div class="taskNotification">
      <div class="taskNotificationChild">
        <div class="taskNotificationHeader">
          <el-input placeholder="请输入任务名称" suffix-icon="el-icon-search" class="taskNotificationHeaderInput"  v-model="search" clearable>
          </el-input>
          <!--<searchBox class="alarmMessageHeaderInput" hint="请输入警报船队"></searchBox>-->
        </div>
        <div class="tabPage">
          <!--<ul>-->
            <!--<li>任务通知</li>-->
            <!--<li>我的提交</li>-->
          <!--</ul>-->
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="任务通知" name="first">
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
                  <el-tooltip placement="top" content="这是详情" effect="light">
                    <span  @click="open();edit(scope.$index, scope.row)"><i class="bor icon-21"></i></span>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            </el-tab-pane>
            <el-tab-pane label="我的提交" name="second">
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
                    <el-tooltip placement="top" content="这是详情" effect="light">
                      <span  @click="open();edit(scope.$index, scope.row)"><i class="bor icon-21"></i></span>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!--这是分页-->
        <div class="page">
          <Paging :list="tableList" @childFn="parentFn"></Paging>
        </div>
        <taskListFrame :show.sync="show" :title1="title1" :sonData="sonData"></taskListFrame>
      </div>
  </div>
</template>

<script>
  import Paging from "./Paging.vue"
  import taskListFrame from "../../../contentBox/sidebar/task_manager/taskList/taskListFrame.vue"
  export default {
    name: "taskNotification",
    components: {
      Paging,
      taskListFrame,
    },
    data() {
      return {
        show: false,//详情弹框
        centerDialogVisible: false,//添加弹框
        dialogVisible:false,//控制弹框的隐藏和显示
        title1:'',//用于确定弹框的title
        sonData:{},//传给子组件的对象
        search:'',//用于全局搜索
        activeName: 'first',//默认显示任务通知
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
            // date: '2016-05-02',//时间
          },]
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
      // 详情/修改数据
      edit(index,row){
        this.title1 ='任务详情';
        // console.log(index, row);
        this.sonData=row;
      },
      //这是表头标签页的点击事件
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
  }
</script>

<style scoped>
  @import "../../../../assets/public/icomoon/style.css";
  .taskNotification{
    height: 100%;
    padding: 20px 6%;
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;
    /*border: 1px solid red;*/
    background-color: rgb(239,239,239);
  }
  .taskNotificationChild{
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: white;
    /*border: 1px solid red;*/
  }
  .taskNotificationHeader{
    height: 60px;
    width: 100%;
    line-height: 60px;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0);
  }
  /*ul{*/
    /*margin-left: 1.5%;*/
  /*}*/
  /*ul li{*/
    /*list-style: none;*/
    /*float: left;*/
    /*margin-right: 20px;*/
    /*!*border-bottom: 3px solid blue;*!*/
  /*}*/
  /*ul>:nth-of-type(1){*/
    /*border-bottom: 3px solid rgb(44,100,228);*/
  /*}*/
  .taskNotificationHeaderInput{
    width: 20%;
    height: 40px;
    margin-left: 1.5%;
    line-height: 40px;
    /*border: 1px solid red;*/
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
  .iconfont{
    font-family: "icomoon" !important;
    font-size: 36px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  /*.add{*/
    /*height: 40px;*/
    /*!*border: 1px solid red;*!*/
    /*!*margin-right: 10px;*!*/
    /*position: absolute;*/
    /*right: 10px;*/
    /*top: 0;*/
  /*}*/
  .page{
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;
    margin: auto;
    width: 75%;
    text-align: right;
    /*border: 1px solid red;*/
  }
  .bor{
    display: inline-block;
    box-sizing: border-box;
    border-radius: 10px;
    border: 2px solid  #2c64e4;
    padding: 5px;
    font-size: 14px;
    color: #2c64e4;
  }
</style>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .taskNotificationHeaderInput .el-input__inner {
    border-radius: 40px;
    background-color: rgb(247,247,247);
    display: inline-block;
  }
  .tabPage  .el-tabs__nav{
    margin-left: 1.5%;
  }
</style>
