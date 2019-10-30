<template>
    <div class="seaConditions">
      <div class="seaConditions_inner">
        <el-table
          class="getMessage_table"
          ref="multipleTable"
          :data="normalMessage.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          tooltip-effect="dark"
          style="width: 100%;text-align: center"
          :stripe=true
          :header-cell-style="{'text-align':'center',color:'#555'}"
          :cell-style="{'text-align':'center',color:'#555'}"
          >
          <el-table-column
            prop="boat_height"
            label="船高"
          >
            <!--          <template slot-scope="scope">{{ scope.row.date }}</template>-->
          </el-table-column>
          <el-table-column
            prop="boat_width"
            label="船宽"
          >
            <!--          <template slot-scope="scope">{{ scope.row.date }}</template>-->
          </el-table-column>
          <el-table-column
            prop="wind_strength"
            label="风力"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="wave_height"
            label="浪高"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="detail"
            label="详情"
            show-overflow-tooltip>
            <el-tooltip content="详情" placement="top">
            <el-button class="detail" size="small" @click="showDetailFunction">
              <i class="icon-21" ></i>
            </el-button>
            </el-tooltip>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination" align='center' @current-change="handleCurrentChange"  :current-page="currentPage"
                       :page-size="pageSize" layout="slot,prev, pager, next, jumper" :total="normalMessage.length" >
        </el-pagination>
      </div>
      <!--这个是弹出框 -->
      <div class="seaConditions_box" v-show="showDetail">
        <div class="checkBoxInformation_icon">
          <div>
          <!-- @click="deleteBox"-->
            <i class="el-icon-close" ></i>
          </div>
        </div>
        <div class="checkBoxInformation_content">
          <el-form  label-width="80px" :model="normalMessage">
            <el-form-item label="名称">
              <el-input v-model="normalMessage.boat_height" :value="normalMessage[1].boat_height"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-input v-model="normalMessage.boat_height"  :value="normalMessage[1].boat_height"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input v-model="normalMessage.boat_height"  :value="normalMessage[1].boat_height"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!--@click="deleteBox"-->
        <el-button type="primary" class="confirm_button" >确认</el-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "sea_conditions",
        data() {
          return {
            //分页的组件
            currentPage: 1, // 当前页码
            total: 20, // 总条数
            pageSize: 10, // 每页的数据条数
            //数据中的databoat_
            // boat_width
            // wind_strength
            // wave_height
            // state
            // remarks
            normalMessage:[
              {
                boat_height:"19m",
                boat_width: '3m',
                wind_strength: '<=5级',
                wave_height: '1-2m',
                state:"无",
                remarks:"无",
                detail:""
              },
              {
                boat_height:"20m",
                boat_width: '3m',
                wind_strength: '<=6级',
                wave_height: '2-3m',
                state:"无",
                remarks:"无",
                detail:""
              },
              {
                boat_height:"21m",
                boat_width: '3m',
                wind_strength: '<=7级',
                wave_height: '3-4m',
                state:"无",
                remarks:"无",
                detail:""
              },
              {
                boat_height:"20m",
                boat_width: '3m',
                wind_strength: '<=6级',
                wave_height: '2-3m',
                state:"无",
                remarks:"无",
                detail:""
              },
              {
                boat_height:"21m",
                boat_width: '3m',
                wind_strength: '<=7级',
                wave_height: '3-4m',
                state:"无",
                remarks:"无",
                detail:""
              },
              {
                boat_height:"20m",
                boat_width: '3m',
                wind_strength: '<=6级',
                wave_height: '2-3m',
                state:"无",
                remarks:"无",
                detail:""
              },
              {
                boat_height:"21m",
                boat_width: '3m',
                wind_strength: '<=7级',
                wave_height: '3-4m',
                state:"无",
                remarks:"无",
                detail:""
              },
              {
                boat_height:"19m",
                boat_width: '3m',
                wind_strength: '<=5级',
                wave_height: '1-2m',
                state:"无",
                remarks:"无",
                detail:""
              },
              {
                boat_height:"20m",
                boat_width: '3m',
                wind_strength: '<=6级',
                wave_height: '2-3m',
                state:"无",
                remarks:"无",
                detail:""
              },
              {
                boat_height:"21m",
                boat_width: '3m',
                wind_strength: '<=7级',
                wave_height: '3-4m',
                state:"无",
                remarks:"无",
                detail:""
              },
              {
                boat_height:"20m",
                boat_width: '3m',
                wind_strength: '<=6级',
                wave_height: '2-3m',
                state:"无",
                remarks:"无",
                detail:""
              },
              {
                boat_height:"21m",
                boat_width: '3m',
                wind_strength: '<=7级',
                wave_height: '3-4m',
                state:"无",
                remarks:"无",
                detail:""
              },
              {
                boat_height:"20m",
                boat_width: '3m',
                wind_strength: '<=6级',
                wave_height: '2-3m',
                state:"无",
                remarks:"无",
                detail:""
              },
              {
                boat_height:"21m",
                boat_width: '3m',
                wind_strength: '<=7级',
                wave_height: '3-4m',
                state:"无",
                remarks:"无",
                detail:""
              },
            ],
            showDetail:false
          }
        },
        mounted(){
          //修改分页下面的第一个文本节点，修改为“跳转至”
          this.$nextTick(function () { //使用这个是在dom加载完成的时候进行加载，比如axios和for循环都需要使用这个
            var textChildren=document.getElementsByClassName("el-pagination__jump")[0];
            //删除第一个文本节点（修改文本节点的值药使用nodeValue属性）
            textChildren.childNodes[0].nodeValue="跳转至";
          })
        },
         methods:{
        //分页的函数
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.currentPage = 1;
          this.pageSize = val;
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
        },
           //这个是显示船舶详情的弹出框
       showDetailFunction(){
         this.showDetail=!this.showDetail
       }
      }
    }
</script>

<style scoped>
  /*引入图标文件style*/
  @import "../../../../../assets/public/icomoon/style.css";
  .seaConditions{
    padding: 20px 6%;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: rgb(240,240,240);
    position: relative;
  }
  .seaConditions_inner{
    border: 0.1px solid transparent;
    background-color: white;
    width: 100%;
    height:100%;
    border-radius: 20px;
    box-shadow: black;
    padding: 20px;
    box-sizing: border-box;
  }
  .el-table{
    margin-top: 5%;
  }
  .el-pagination{
    width: 25%;
    position: absolute;
    bottom: 5%;
    left: 50%;
    /*margin-left: -12.5%;*/
  }
  .detail{
    background-color:rgb(104,124,223);
    color: white;
    border-radius: 4px;
  }
  .seaConditions_box{
    width:600px ;
    height:550px;
    background-color: pink;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -275px;
    margin-left: -300px;
  }
</style>
