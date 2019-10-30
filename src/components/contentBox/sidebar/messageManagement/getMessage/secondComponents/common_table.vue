<template>
    <div id="tableComponents">
      <!--这个是放置接受消息的表格的地方-->
      <!--normalMessage是父组件传递过来的值-->
      <div style="width: 100%;height: 91%;">
      <el-table
        class="getMessage_table"
        ref="multipleTable"
        :data="normalMessage.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        :row-key="getRowKeys"
        tooltip-effect="dark"
        style="width: 100%;text-align: center"
        :stripe=true
        :header-cell-style="{'text-align':'center',color:'#555'}"
        :cell-style="{'text-align':'center',color:'#555'}"
        @selection-change="handleSelectionChange">
        <el-table-column
          :reserve-selection="true"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
        >
          <!--          <template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column
          prop="sendPeople"
          label="发件人"
        >
          <!--          <template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="messageType"
          label="消息类型"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="messageTime"
          label="时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="messageState"
          label="消息状态"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>

      <div class="commonFooter">
        <!--开始删除-->
        <div>
          <el-button type="primary" @click="confirmOk" round style="margin-right: 20%">删除</el-button>
<!--          <el-button type="info"  @click="confirmNo" round>取消</el-button>-->
        </div>
          <!--:page-sizes是每一页的行数-->      <!--size-change,pageSize改变时进行改变-->
          <el-pagination class="pagination" align='center' @current-change="handleCurrentChange"  :current-page="currentPage"
                         :page-size="pageSize" layout="slot,prev, pager, next, jumper" :total="normalMessage.length" >
          </el-pagination>
      </div>
      </div>
      <!--弹出框-->
      <div class="checkBoxInformation" v-if="showDiv">
        <div class="checkBoxInformation_icon" style="margin-top: -5%">
          <div>
            <span style="width: 130px;">删除消息</span>
            <!--            @click="deleteBox"-->
            <i class="el-icon-close"   @click="lastConfirmNo"></i>
          </div>
        </div>
        <div class="checkBoxInformation_inner">
          <div class="checkBoxInformation_content">
            <i class="fa fa-info-circle" aria-hidden="true"></i>
            <span>您确定删除已选中的消息吗？</span>
          </div>
          <div class="confirmButton">
            <el-button type="primary" round @click="lastConfirmOk">确认</el-button>
            <el-button type="info" round @click="lastConfirmNo">取消</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "common_table",
      data() {
        return {
          //表单中的复选框被选中时候，进行添加的索引值
          multipleSelection:[],
          //再次确认的data，
          //是否显示删除的按钮
          showDeleteButton:false,
          //是否显示弹出框
          showDiv:false,
          //分页的组件
          currentPage: 1, // 当前页码
          total: 20, // 总条数
          pageSize: 10 // 每页的数据条数
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
        //用户进行删除的数据存放的地方
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
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
        //用于保持selection的勾选
        getRowKeys(row){
          return row.id;
        },
        //点击会出现弹出框
        confirmOk() {
          this.showDiv = true;
        },
        //用户取消删除的函数
        confirmNo() {
          this.showDeleteButton = false
        },
        // 用户点击弹框出现的内容(删除数据的操作在这里)
        lastConfirmOk() {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            let val = this.multipleSelection
            // 获取选中行的索引的方法
            // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
            // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
            val.forEach((val, index) => {
              this.normalMessage.forEach((v, i) => {
                if (val.id === v.id) {
                  // i 为选中的索引
                  this.normalMessage.splice(i, 1)
                }
              })
            })
          }
          // 删除完数据之后清除勾选框
          this.$refs.multipleTable.clearSelection();
                this.showDiv = false;
                this.showDeleteButton = true
        },
        lastConfirmNo() {
          this.showDiv = false;
          this.showDeleteButton = false
        },
      },
      props: {
        normalMessage: this.normalMessage
      }
    }
</script>

<style scoped>
  @import "../../../../../../assets/public/css/getMessage.css";
  .el-input .el-pagination__editor{
    border-radius: 50%;
  }
  .pagination{
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pagination >>>.el-input__inner{
    width: 28px;
    height: 28px;
    border-radius:100%;
    border:1px solid rgb(68,100,224) ;
  }
  .pagination>>>.el-pager li.active{
    color: white!important;
    border: 1px solid rgb(68,100,224)!important;
    background-color: rgb(68,100,224);
    width: 30px;
    height:30px;
    min-width: 30px;
    border-radius: 100%;
    padding: 0;
    text-align: center;
    line-height: 27px;
  }
  .commonFooter{
    width: 70%;
    margin: 0 auto;
    /*border: 1px solid red;*/
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 10%;
    left:15%;
  }
  /*.checkBoxInformation_icon span{*/
  /*  position: absolute;*/
  /*}*/
</style>
