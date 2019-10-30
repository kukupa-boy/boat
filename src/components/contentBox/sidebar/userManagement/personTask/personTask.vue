<!-- 用户管理-用户角色 -->

<template>
  <div class="personGroupBox">
    <div class="thehead">
      <div class="th-search">
        <searchBox
          classname="icon-15"
          border="open"
          @back="searchChangeBack"
          @clickBack="searchClickBack"
        ></searchBox>
      </div>
      <div class="th-add" @click="openAdd=true">
        <theBtn content="添加岗位" type="normal"></theBtn>
      </div>
    </div>

    <div class="thebody">
      <el-table
        :data="tables"
        stripe
        :header-cell-style="{padding:'0',textAlign:'center'}"
        :cell-style="{padding:'0',textAlign:'center'}"
      >
        <el-table-column prop="id" label="序号" width="80px"></el-table-column>
        <el-table-column prop="name" label="岗位名称"></el-table-column>
        <el-table-column prop="duty" label="岗位职责"></el-table-column>
        <el-table-column prop="creatTime" label="创建时间"></el-table-column>
        <el-table-column prop="describe" label="描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.isban?'已禁用':'禁用'"
              placement="left"
              effect="light"
              :open-delay="300"
              :enterable="false"
            >
              <el-button type="text" size="small">
                <i :class="scope.row.isban?'icon-39':'icon-2'" @click="banIt(scope.$index,$event)"></i>
              </el-button>
            </el-tooltip>

            <el-tooltip
              content="权限设置"
              placement="top"
              effect="light"
              :open-delay="300"
              :enterable="false"
            >
              <el-button type="text" size="small" @click="changeRoot(scope)" :disabled="scope.row.isban">
                <i class="fa fa-lock"></i>
              </el-button>
            </el-tooltip>

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
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="thefoot">
      <pagination :perpage="perpage" :pagesize="tableData.length" @currentPageChange="pageChange"></pagination>
    </div>

    <infoAddBox :show="openAdd" headInfo="添加岗位" @back="addBack">
      <template v-slot:content>
        <div class="slotBody">
          <div class="sb-first sb-input">
            <span>岗位名称</span>
            <div>
              <el-input placeholder="请输入内容" v-model="addData.name" clearable size="small"></el-input>
            </div>
          </div>

          <div class="sb-input">
            <span>所属部门</span>
            <div>
              <el-input placeholder="请输入内容" v-model="addData.partment" clearable size="small"></el-input>
            </div>
          </div>

          <div class="sb-input">
            <span>角色职责</span>
            <div>
              <el-input placeholder="请输入内容" v-model="addData.duty" clearable size="small"></el-input>
            </div>
          </div>

          <div class="sb-textarea">
            <span>岗位描述</span>
            <div>
              <el-input type="textarea" placeholder="请输入内容" :rows="3" v-model="addData.describe"></el-input>
            </div>
          </div>

        </div>
      </template>
    </infoAddBox>

    <affirmBox :show="affirmDelete" type="normal" content="你确定要删除吗？" @back="affirmDeleteBack"></affirmBox>

    <affirmBox :show="affirmBan" type="normal" :content="banContent" @back="affirmBanBack"></affirmBox>

    
    <div class="rootManageCan" v-show="openRoot">
      <div class="rootBox">
        <div class="rb-head">
          <span>角色权限分配</span>
          <!-- <i class="fa fa-times-circle" aria-hidden="true" @click="openRoot=false"></i> -->
        </div>
        <div class="head2">
          <el-table :data="updateData">
            <el-table-column prop="id" label="序号" align="center"></el-table-column>
            <el-table-column prop="name" label="部门名称"></el-table-column>
            <el-table-column prop="parentGroup" label="上级部门"></el-table-column>
            <el-table-column prop="creatTime" label="创建时间"></el-table-column>
            <el-table-column prop="describe" label="描述"></el-table-column>
          </el-table>
        </div>
        <div class="rb-body2">
          <p>
            <i class="fa fa-check-circle selectAll" @click="selectAll($event)" isChecked="0"></i>
            <span>全选</span>
          </p>
          <div class="rb-rootCan">
            <div v-for="(item) in rootList" :class="{'child_deep1':true,'red':!item.children}" :key="item.index">
              <p class="rbr-first">
                <!-- <i class="icon-47" v-show="!item.children"></i> -->
                <span :class="{'isBasicRoot':!item.children}" isChecked="0" @click="rootBtn($event)">{{item.name}}</span>
                <i class="icon--" v-show="!!item.children"></i>
              </p>
              <div v-for="(item) in item.children" :class="{'child_deep2':true,'red':!item.children}" :key="item.index">
                <p class="rbr-second">
                  <!-- <i class="icon-47" v-show="!item.children"></i> -->
                  <span :class="{'isBasicRoot':!item.children}" isChecked="0" @click="rootBtn($event)">{{item.name}}</span>
                  <i class="icon--" v-show="!!item.children"></i>
                </p>
                <div v-for="(item) in item.children" :class="{'child_deep3':true,'red':!item.children}" :key="item.index">
                  <p class="rbr-third">
                    <!-- <i class="icon-47" v-show="!item.children"></i> -->
                    <span :class="{'isBasicRoot':!item.children}" isChecked="0" @click="rootBtn($event)">{{item.name}}</span>
                    <i class="icon--" v-show="!!item.children"></i>
                  </p>
                </div>
              </div>
            </div>
            <div class="rbr-end">
              - - - - - - - - - - - - - - - - - - - - - - End- - - - - - - - - - - - - - - - - - - - - - 
            </div>
          </div>



        </div>

        <div class="rb-foot">
          <div @click="submitRoot('sure')">
            <theBtn content="确定" type="normal"></theBtn>
          </div>
          <div @click="submitRoot('cancel')">
            <theBtn content="取消" type="#ccc"></theBtn>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import theBtn from "@/components/contentBox/common/common_l/theBtn";
import theTable from "@/components/contentBox/common/common_l/theTable";
import searchBox from "@/components/contentBox/common/common_l/searchBox";
import pagination from "@/components/contentBox/common/common_l/pagination";
import infoAddBox from "@/components/contentBox/common/common_l/infoAddBox";
import affirmBox from "@/components/contentBox/common/common_l/affirmBox";

export default {
  name: "personManagerL2",
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "电气运行专员",
          duty: "VRBQ6",
          partment: "维修部",
          creatTime: "2019-10-10 12:20:20",
          describe:"负责设备维修工作",
          isban: false
        },{
          id: 2,
          name: "电气运行专员",
          duty: "VRBQ6",
          partment: "维修部",
          creatTime: "2019-10-10 12:20:20",
          describe:"负责设备维修工作",
          isban: false
        },{
          id: 3,
          name: "电气运行专员",
          duty: "VRBQ6",
          partment: "维修部",
          creatTime: "2019-10-10 12:20:20",
          describe:"负责设备维修工作",
          isban: false
        },{
          id: 4,
          name: "电气运行专员",
          duty: "VRBQ6",
          partment: "维修部",
          creatTime: "2019-10-10 12:20:20",
          describe:"负责设备维修工作",
          isban: false
        },{
          id: 5,
          name: "电气运行专员",
          duty: "VRBQ6",
          partment: "维修部",
          creatTime: "2019-10-10 12:20:20",
          describe:"负责设备维修工作",
          isban: false
        },{
          id: 6,
          name: "电气运行专员",
          duty: "VRBQ6",
          partment: "维修部",
          creatTime: "2019-10-10 12:20:20",
          describe:"负责设备维修工作",
          isban: false
        },{
          id: 7,
          name: "电气运行专员",
          duty: "VRBQ6",
          partment: "维修部",
          creatTime: "2019-10-10 12:20:20",
          describe:"负责设备维修工作",
          isban: true
        },{
          id: 8,
          name: "电气运行专员",
          duty: "VRBQ6",
          partment: "维修部",
          creatTime: "2019-10-10 12:20:20",
          describe:"负责设备维修工作",
          isban: false
        }
      ],
      // 存放编辑信息的临时容器
      updateData: [],
      // 存放添加信息的临时容器
      addData: {
        name: "",
        partment:"",
        describe: "",
        duty:"",
        remark:""
      },
      // 搜索框的值
      search: "",
      perpage: 10, //每页数据条数
      openAdd: false,
      openRoot: false,

      // 删除项的index
      deleteIndex: undefined,
      // 禁用项的index
      banIndex:undefined,
      banContent:"",//禁用||解禁时弹框提示文字
      // 确认删除框
      affirmDelete: false,
      // 确认禁用框
      affirmBan: false,
      // 权限分配列表
      rootList: [
        {
          index: "1",
          name: "海图监管"
        },
        {
          index: "2",
          name: "区域监管",
          children: []
        },
        {
          index: "3",
          name: "任务管理",
          children: []
        },
        {
          index: "4",
          name: "气象报告",
          children: []
        },
        {
          index: "5",
          name: "用户管理",
          children: [
            {
              index: "5.1",
              name: "作业人员"
            },
            {
              index: "5.2",
              name: "岗位",
              children: [
                {
                  index: "5.2.1",
                  name: "添加"
                },
                {
                  index: "6.2.2",
                  name: "编辑"
                }
              ]
            },
            {
              index: "5.3",
              name: "部门"
            }
          ]
        },
        {
          index: "6",
          name: "监控管理",
          children: [
            {
              index: "6.1",
              name: "摄像头管理"
            },
            {
              index: "6.2",
              name: "监控视频管理",
              children: [
                {
                  index: "6.2.1",
                  name: "添加视频"
                },
                {
                  index: "6.2.2",
                  name: "删除视频"
                }
              ]
            }
          ]
        },
        {
          index: "7",
          name: "船舶管理",
          children: [
            {
              index: "7.1",
              name: "船舶列表",
              children: [
                {
                  index: "7.1.1",
                  name: "添加船舶"
                },
                {
                  index: "7.1.2",
                  name: "编辑船舶"
                },
                {
                  index: "7.1.3",
                  name: "删除船舶"
                }
              ]
            },
            {
              index: "7.2",
              name: "船舶出海条件",
              children: [
                {
                  index: "7.2.1",
                  name: "添加出海条件"
                },
                {
                  index: "7.2.2",
                  name: "编辑出海条件"
                }
              ]
            }
          ]
        },
        {
          index: "8",
          name: "消息管理",
          children: [
            {
              index: "8.1",
              name: "发送消息"
            },
            {
              index: "8.2",
              name: "接受消息"
            }
          ]
        },
        {
          index: "9",
          name: "设备管理",
          children: [
            {
              index: "9.1",
              name: "设备列表",
              children: [
                {
                  index: "9.1.1",
                  name: "添加设备"
                },
                {
                  index: "9.1.2",
                  name: "编辑设备"
                }
              ]
            },
            {
              index: "9.2",
              name: "打卡记录"
            }
          ]
        }
      ],
      rootMenu: {
        ul1: false,
        ul2: false,
        ul3: false,
        ul4: false,
        ul5: false,
        ul6: false,
        ul7: false,
        nowUlName: ""
      },
      newData: {}
    };
  },
  computed: {
    tables: function() {
      var search = this.search;
      if (search) {
        return this.tableData.filter(function(dataNews) {
          return Object.keys(dataNews).some(function(key) {
            return (
              String(dataNews[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.tableData;
    }
  },
  methods: {
    saveData(prop, value, e) {
      if (value) {
        this.newData[prop] = value;
      } else {
        this.newData[prop] = e.target.value;
      }
    },
    // 换页回调函数
    pageChange(val) {
      console.log(val);
    },
    appendData() {
      this.newData.id = this.tableData.length + 1;
      this.tableData.push({ ...this.newData });
      this.openAdd = false;
    },
    changeRoot(item) {
      $(".selectAll").attr("isChecked","0").removeClass("checkedAll");
      $(".isBasicRoot").attr("isChecked","0").removeClass("isChecked");
      this.updateData = [];
      this.updateData.push({ ...item.row });
      this.openRoot = true;
    },
    selectAll(e) {
      let ele=$(e.target);
      if(ele.attr("isChecked")==="0"){
        ele.attr("isChecked","1").addClass("checkedAll");
        $(".isBasicRoot").attr("isChecked","1").addClass("isChecked");
      }else{
        ele.attr("isChecked","0").removeClass("checkedAll");
        $(".isBasicRoot").attr("isChecked","0").removeClass("isChecked");
      }
    },
    rootBtn(e){
      let ele=$(e.target);
      let isChecked=ele.attr("isChecked");
      if(isChecked==="1"){
        ele.attr("isChecked","0").removeClass("isChecked");
      }else{
        ele.attr("isChecked","1").addClass("isChecked");
      }
    },
    // 点击修改权限的“确定”和“取消”按钮时触发
    submitRoot(res){
      this.openRoot=false;
      if(res==="sure"){
        this.$message({
          message:"修改成功",
          type:"success"
        })
      }
    },
    // 搜索框改变的返回触发函数
    searchChangeBack(res) {
      if (res === "") {
        this.search = res;
      }
    },
    // 搜索框点击的返回触发函数
    searchClickBack(res) {
      console.log(res);
      this.search = res;
    },
    // 删除分组的click函数
    deleteIt(index) {
      this.affirmDelete = true;
      this.deleteIndex = index;
    },
    // 禁用此项
    banIt(index,e) {
      if($(e.target).hasClass("icon-2")){
        this.banContent="你确定要禁用吗？";
      }else{
        this.banContent="你确定要解除禁用吗？";
      }
      this.affirmBan = true;
      this.banIndex=index;
      
    },
    //
    affirmDeleteBack(res) {
      this.affirmDelete = false;
      if (res === "sure") {
        if (this.deleteIndex !== undefined) {
          this.tableData.splice(this.deleteIndex, 1);
          const h = this.$createElement;
          this.$message({
            message: h("p", null, [
              h("span", { style: { color: "green" } }, "删除成功！ ")
            ]),
            type: "success"
          });
        }
      } else {
        this.deleteIndex = undefined;
      }
    },
    affirmBanBack(res){
      this.affirmBan = false;
      if(res==="sure"){
        if(this.banIndex!==undefined){
          this.tableData[this.banIndex].isban=!this.tableData[this.banIndex].isban;
        }
      }else{
        this.banIndex = undefined;
      }
    },
    // 添加分组返回的函数
    addBack(res) {
      if (res === "cancel") {
        this.openAdd = false;
        for(let i in this.addData){
          this.addData[i]="";
        }
      } else {
        if (!this.addData.name || !this.addData.partment || !this.addData.duty || !this.addData.describe) {
          this.$message({
            message: "请完善内容后再提交",
            type: "warning"
          });
        } else {
          this.addData.creatTime = this.nowTime("datetime");
          this.addData.id = this.tableData[this.tableData.length - 1].id + 1;
          this.tableData.push(JSON.parse(JSON.stringify(this.addData)));
          this.openAdd = false;
          this.$message({
            message: "添加成功",
            type: "success"
          });
          for(let i in this.addData){
            this.addData[i]="";
          }
        }
      }
    },
    nowTime(type) {
      // 参数 type为需要的时间类型,默认为time
      // time : 12:10:22
      // date : 2019-10-10
      // datetime : 2019-10-10 12:10:22
      // timestamp: 1571294661250
      return (() => {
        let myDate = new Date();
        let year = myDate.getFullYear();
        let month = myDate.getMonth() + 1;
        let date = myDate.getDate();
        let h = myDate.getHours(); //获取当前小时数(0-23)
        let m = myDate.getMinutes(); //获取当前分钟数(0-59)
        let s = myDate.getSeconds();
        //获取当前时间
        if (type == "date") {
          return `${conver(year)}-${conver(month)}-${conver(date)}`;
        } else if (type == "datetime") {
          return `${conver(year)}-${conver(month)}-${conver(date)} ${conver(
            h
          )}:${conver(m)}:${conver(s)}`;
        } else if (type == "time") {
          return `${conver(h)}:${conver(m)}:${conver(s)}`;
        } else if (type == "timestamp") {
          return myDate.getTime();
        }
        return `${conver(h)}:${conver(m)}:${conver(s)}`;
      })();
      //日期时间处理
      function conver(s) {
        return s < 10 ? "0" + s : s;
      }
    }
  },
  mounted() {
    $(".checkBtn").on("click", e => {
      let ele = $(e.target);
      if (ele.hasClass("checkedI")) {
        e.stopPropagation();
        // ele.find(".fa").removeClass('checkedI');
        ele.removeClass("checkedI");
      } else {
        ele.addClass("checkedI");
        // ele.find(".fa").addClass('checkedI');
      }
    });
  },
  components: {
    theBtn,
    theTable,
    searchBox,
    pagination,
    infoAddBox,
    affirmBox
  }
};
</script>


<style lang='less' scoped>
@import url("./personTask.less");
</style>

<style>
/* 1080px下 */
.has-gutter tr th {
  height: 80px;
}
.el-table__row td {
  height: 60px;
}
.el-table__row td div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.slotBody > .sb-textarea textarea {
  border-radius: 16px;
  resize: none;
}
.slotBody > .sb-input input {
  border-radius: 16px;
}
@media screen and (max-height: 1080px) {
  .has-gutter tr th {
    height: 80px;
  }
  .el-table__row td {
    height: 64px;
  }
}
@media screen and (max-height: 960px) {
  .has-gutter tr th {
    height: 70px;
  }
  .el-table__row td {
    height: 54px;
  }
}
@media screen and (max-height: 840px) {
  .has-gutter tr th {
    height: 60px;
  }
  .el-table__row td {
    height: 40px;
  }
}
</style>
