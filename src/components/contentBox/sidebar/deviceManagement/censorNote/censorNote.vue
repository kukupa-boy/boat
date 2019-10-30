<!-- 打卡记录 -->

<template>
  <div class="censorNoteBoxBg">
    <div class="censorNoteBox">
      <div class="thehead">
        <div class="th-search">
          <searchBox @back="searchChangeBack" @clickBack="searchClickBack" border="open"></searchBox>
        </div>
      </div>
      <div class="thebody">
        <div class="tableLabel">
          <span>打卡记录</span>
        </div>

        <el-table
          :data="tables"
          stripe
          :header-cell-style="{padding:'0',textAlign:'center'}"
          :cell-style="{padding:'0',textAlign:'center'}"
        >
          <el-table-column prop="name" label="设备名称"></el-table-column>
          <el-table-column prop="userName" label="打卡用户"></el-table-column>
          <el-table-column prop="type" label="打卡类型"></el-table-column>
          <el-table-column prop="time" label="打卡时间"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="oprate">
                <el-tooltip
                  content="删除"
                  placement="right"
                  effect="light"
                  :open-delay="300"
                  :enterable="false"
                >
                  <el-button type="text" size="small">
                    <i class="icon--2" @click="deleteIt(scope.$index)"></i>
                  </el-button>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="thefoot">
        <pagination :perpage="perpage" :pagesize="tableData.length" @currentPageChange="pageChange"></pagination>
      </div>

      <affirmBox :show="showAffirm" type="normal" content="你确定要删除吗？" @back="affirmBack"></affirmBox>
    </div>
  </div>
</template>


<script>
import theBtn from "@/components/contentBox/common/common_l/theBtn";
import theTable from "@/components/contentBox/common/common_l/theTable";
import searchBox from "@/components/contentBox/common/common_l/searchBox";
import pagination from "@/components/contentBox/common/common_l/pagination";
import affirmBox from "@/components/contentBox/common/common_l/affirmBox";

export default {
  name: "personManagerL",
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "摄像头",
          userName: "小明",
          type: "检修",
          time: "2019-2-9",
          remark: "这里是备注"
        },
        {
          id: 1,
          name: "风电机",
          userName: "小华",
          type: "巡视",
          time: "2019-2-9",
          remark: "这里是备注"
        },
        {
          id: 1,
          name: "摄像头",
          userName: "刚子",
          type: "检修",
          time: "2019-2-9",
          remark: "这里是备注"
        },
        {
          id: 1,
          name: "风电机",
          userName: "西西",
          type: "检修",
          time: "2019-2-9",
          remark: "这里是备注"
        },
        {
          id: 1,
          name: "变压器",
          userName: "老王",
          type: "巡视",
          time: "2019-2-9",
          remark: "这里是备注"
        },
        {
          id: 1,
          name: "摄像头",
          userName: "小陈",
          type: "巡视",
          time: "2019-2-9",
          remark: "这里是备注"
        },
        {
          id: 1,
          name: "风电机",
          userName: "东东",
          type: "巡视",
          time: "2019-2-9",
          remark: "这里是备注"
        },
        {
          id: 1,
          name: "摄像头",
          userName: "老王",
          type: "巡视",
          time: "2019-2-9",
          remark: "这里是备注"
        },
        {
          id: 1,
          name: "摄像头",
          userName: "老王",
          type: "巡视",
          time: "2019-2-9",
          remark: "这里是备注"
        },
        {
          id: 1,
          name: "摄像头",
          userName: "老王",
          type: "巡视",
          time: "2019-2-9",
          remark: "这里是备注"
        }
      ],
      perpage: 10, //每页数据条数
      pagesize: 35,
      // 是否展示询问框
      showAffirm: false,
      theindex: undefined,//存放点前要删除的列的index,
      search:"",
    };
  },
  methods: {
    pageChange(val) {
      console.log(val);
    },
    // 换页回调函数
    pageChange(val) {
      console.log(val);
    },
    // 删除打卡记录的click函数
    deleteIt(index) {
      console.log(index);
      this.showAffirm = true;
      this.theindex = index;
    },
    searchChangeBack(val) {
      console.log(val);
      if(val===""){
        this.search="";
      }
    },
    searchClickBack(val) {
      this.search=val;
    },
    // 点击询问框的“确定”或“取消”后的返回函数，res返回“sure”或“cancel”
    affirmBack(res) {
      this.showAffirm = false;
      if (res === "sure") {
        if (this.theindex !== undefined) {
          this.tableData.splice(this.theindex, 1);
          const h = this.$createElement;
          this.$message({
            message: h("p", null, [
              h("span", { style: { color: "green" } }, "删除成功！ ")
            ]),
            type: "success"
          });
        }
      } else {
        this.theindex = undefined;
      }
    },
    // 表格筛选条件发生改变
    filterChange(val) {
      console.log(val);
    }
  },
  computed:{
    tables:function(){
      var search=this.search;
      if(search){
        return  this.tableData.filter(function(dataNews){
          return Object.keys(dataNews).some(function(key){
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1;
          })
        })
      }
      return this.tableData;
    }
  },
  components: {
    theBtn,
    theTable,
    searchBox,
    pagination,
    affirmBox
  }
};
</script>


<style lang='less' scoped>
@import url("./censorNote.less");
</style>


<style>
/* 1080px下 */
.has-gutter tr th {
  height: 80px;
}
.el-table__row td {
  height: 66px;
}

@import url("../../../../../assets/public/icomoon/style.css");
@font-face {
  font-family: "icomoon2";
  src: url("../../../../../assets/public/icomoon/fonts/icomoon.eot");
  /* IE9*/
  src: url("../../../../../assets/public/icomoon/fonts/icomoon.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("../../../../../assets/public/icomoon/fonts/icomoon.woff")
      format("woff"),
    /* chrome, firefox */
      url("../../../../../assets/public/icomoon/fonts/icomoon.ttf")
      format("truetype"),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
      url("../../../../../assets/public/icomoon/fonts/icomoon.svg#icomoon"); /* iOS 4.1- */
}

.icomoon {
  font-family: "icomoon2" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media screen and (max-height: 1000px) {
  .has-gutter tr th {
    height: 76px;
  }
  .el-table__row td {
    height: 60px;
  }
}
@media screen and (max-height: 940px) {
  .has-gutter tr th {
    height: 80px;
  }
  .el-table__row td {
    height: 56px;
  }
}
@media screen and (max-height: 900px) {
  .has-gutter tr th {
    height: 66px;
  }
  .el-table__row td {
    height: 50px;
  }
}
@media screen and (max-height: 840px) {
  .has-gutter tr th {
    height: 62px;
  }
  .el-table__row td {
    height: 46px;
  }
}
@media screen and (max-height: 800px) {
  .has-gutter tr th {
    height: 56px;
  }
  .el-table__row td {
    height: 40px;
  }
}
@media screen and (max-height: 760px) {
  .has-gutter tr th {
    height: 40px;
  }
  .el-table__row td {
    height: 40px;
  }
}
</style>
