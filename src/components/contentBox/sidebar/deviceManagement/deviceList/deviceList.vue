<!-- 用户管理-用户角色 -->

<template>
<div class="deviceManageBoxBg">

  <div class="deviceManageBox">

    <div class="thehead">
      <div class="th-search">
        <searchBox classname="icon-15" border="open"  @back="searchChangeBack" @clickBack="searchClickBack"></searchBox>
      </div>
      <div class="th-add" @click="addIt">
        <theBtn content="添加设备" type="normal"></theBtn>
      </div>
    </div>
    <div class="thebody">
      <el-table :data="tables" stripe :header-cell-style="{padding:'0',textAlign:'center'}" :cell-style="{padding:'0',textAlign:'center'}">

        <el-table-column prop="name" label="设备名称"></el-table-column>

        <el-table-column prop="QRcode" label="二维码" width="100px">
          <i class="fa fa-qrcode"></i>
        </el-table-column>

        <el-table-column prop="image" label="图片" min-width="80px">
          <template slot-scope="scope">
            <div class="imageCan" v-if="!!scope.row.imgSrc">
              <img class="deviceImg" v-for="(imgsrc,i) in scope.row.imgSrc" :key="i" :src="imgsrc" alt="[图片]" @dblclick="showBigImg($event)">
            </div>
            <i v-else class="fa fa-picture-o" aria-hidden="true"></i>
          </template>
        </el-table-column>

        <el-table-column prop="submitTime" label="上报时间" width="180px"></el-table-column>

        <el-table-column prop="describe" label="描述" :show-overflow-tooltip="true"></el-table-column>

        <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="oprate">
              <el-tooltip content="编辑" placement="left" effect="light" :open-delay="300" :enterable="false">
                <el-button type="text" size="small"><i class="icon-48" @click="editIt(scope.$index)"></i></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="right" effect="light" :open-delay="300" :enterable="false">
                <el-button type="text" size="small"><i class="icon--2" @click="deleteIt(scope.$index)"></i></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div class="thefoot">
      <pagination :perpage="perpage" :pagesize="tableData.length" @currentPageChange="pageChange"></pagination>
    </div>

    <infoAddBox :show="openAdd" headInfo="添加设备" @back="addBack">
      <template v-slot:content >
        <div class="slotBody">
          <div class="sb-first sb-input">
            <span>设备名称</span>
            <div>
              <el-input  placeholder="请输入内容" v-model="addData.name" clearable size="small"></el-input>
            </div>
          </div>
          <div class="sb-file">
            <span>设备图片</span>
            <div>
              <submitImageBox hint="上传" @back="addImgs"></submitImageBox>
            </div>
          </div>
          <div class="sb-textarea">
            <span>设备描述</span>
            <div>
              <el-input type="textarea" placeholder="请输入内容" :rows="3" v-model="addData.describe"></el-input>
            </div>
          </div>
          <div  class="sb-textarea">
            <span>备注</span>
            <div>
              <el-input type="textarea" placeholder="请输入内容" :rows="3" v-model="addData.remark"></el-input>
            </div>
          </div>
        </div>
      </template>
    </infoAddBox>


    <infoAddBox :show="openEdit" headInfo="编辑设备" @back="editBack">
      <template v-slot:content >
        <div class="slotBody">
          <div class="sb-first sb-input">
            <span>设备名称</span>
            <div>
              <el-input  placeholder="请输入内容" v-model="editData.name" clearable size="small"></el-input>
            </div>
          </div>
          <div class="sb-file">
            <span>设备图片</span>
            <div>
              <submitImageBox hint="上传" @back="editImgs"></submitImageBox>
            </div>
          </div>
          <div class="sb-textarea">
            <span>设备描述</span>
            <div>
              <el-input type="textarea" placeholder="请输入内容" :rows="3" v-model="editData.describe"></el-input>
            </div>
          </div>
          <div  class="sb-textarea">
            <span>备注</span>
            <div>
              <el-input type="textarea" placeholder="请输入内容" :rows="3" v-model="editData.remark"></el-input>
            </div>
          </div>
        </div>
      </template>
      
    </infoAddBox>


    <affirmBox :show="showAffirm" type="normal" content="你确定要删除吗？" @back="affirmBack"></affirmBox>

    <div class="bigImgWall" v-show="showImgWall">
      <i class="icon-39" @click="showImgWall=false"></i>
      <img v-if="!!showImgSrc" :src="showImgSrc" alt="not find!">
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
import submitImageBox from "@/components/contentBox/common/common_l/submitImageBox";
import affirmBox from "@/components/contentBox/common/common_l/affirmBox";
export default {
  name: "personManagerL",
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "摄像头RKT",
          QRcode: "[qrcode]",
          image: "[image]",
          submitTime: "2019-02-09 10:12:32",
          describe: "这里是描述这里是描述这里是描述这里是描述，里是描述这里是描。",
          remark:"这里是备注",
          imgSrc:["./static/img/device1.jpg"],
        },{
          id: 1,
          name: "摄像头ACD",
          QRcode: "[qrcode]",
          image: "[image]",
          submitTime: "2019-02-09 10:12:32",
          describe: "这里是描述",
          remark:"这个摄像头有问题！这个摄像头有问题！这个摄像头有问题！"
        },{
          id: 1,
          name: "摄像头MMT",
          QRcode: "[qrcode]",
          image: "[image]",
          submitTime: "2019-02-09 10:12:32",
          describe: "这里是描述",
          remark:"这里是备注",
          imgSrc:["./static/img/device1.jpg","./static/img/device1.jpg"],
        },{
          id: 1,
          name: "变压器#6",
          QRcode: "[qrcode]",
          image: "[image]",
          submitTime: "2019-02-09 10:12:32",
          describe: "这里是描述",
          remark:"这里是备注"
        },{
          id: 1,
          name: "风电机2号",
          QRcode: "[qrcode]",
          image: "[image]",
          submitTime: "2019-02-09 10:12:32",
          describe: "这里是描述",
          remark:"这里是备注",
          imgSrc:["./static/img/device2.jpg"],
        },{
          id: 1,
          name: "摄像头AEP",
          QRcode: "[qrcode]",
          image: "[image]",
          submitTime: "2019-02-09 10:12:32",
          describe: "这里是描述",
          remark:"这里是备注"
        },{
          id: 1,
          name: "风电机14号",
          QRcode: "[qrcode]",
          image: "[image]",
          submitTime: "2019-02-09 10:12:32",
          describe: "这里是描述",
          remark:"这里是备注"
        },{
          id: 1,
          name: "变压器#11",
          QRcode: "[qrcode]",
          image: "[image]",
          submitTime: "2019-02-09 10:12:32",
          describe: "这里是描述",
          remark:"这里是备注"
        }
      ],
      perpage:10,//每页数据条数
      pagesize:35,
      // 初始隐藏添加框
      openAdd: false,
      // 初始隐藏编辑框
      openEdit:false,
      newData:{},
      partment:"",
      //添加设备时输入的新数据
      addData:{
        describe:"",
        remark:"",
        name:"",
        imgSrc:[],
      },
      editData:{
        describe:"",
        remark:"",
        name:"",
        imgSrc:[],
        },
      // 初始不显示询问框
      showAffirm:false,
      deleteIndex:undefined,
      editIndex:undefined,
      // 搜索内容
      search:"",
      // 展示的大图的src
      showImgSrc:"",
      showImgWall:true,
    };
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
  methods: {
    pageChange(val){
      console.log(val);
    },
    appendData(){
      this.newData.id=this.tableData.length+1;
      this.tableData.push(this.newData);
      this.openAdd=false;
    },
    // 换页回调函数
    pageChange(val){
      console.log(val);
    },
    addIt(){
      this.openAdd=true;
    },
    // 删除打卡记录的click函数
    deleteIt(index){
      this.showAffirm=true;
      this.deleteIndex=index;
    },
    editIt(index){
      this.editIndex=index;
      this.openEdit=true;
      this.editData.name=this.tableData[index].name;
      this.editData.describe=this.tableData[index].describe;
      this.editData.remark=this.tableData[index].remark;
    },
    // 点击询问框的“确定”或“取消”后的返回函数，res返回“sure”或“cancel”
    affirmBack(res){
      this.showAffirm=false;
      if(res==="sure"){
        if(this.deleteIndex!==undefined){
          this.tableData.splice(this.deleteIndex,1);
          const h = this.$createElement;
          this.$message({
            message: h('p', null, [
              h('span', {style:{"color":"green"}}, '删除成功！ ')
            ]),
            type:'success'
          });
        }
      }else{
        this.deleteIndex=undefined;
      }
    },
    addBack(res){
      if(res==="cancel"){
        this.openAdd=false;
      }else if(res==="sure"){
        if(!this.addData.describe||!this.addData.name||!this.addData.remark){
          this.$message({
            message:"请完善内容后再提交",
            type:"warning",
          })
        }else{
          this.addData.submitTime=this.nowTime("datetime");
          this.tableData.push(JSON.parse(JSON.stringify(this.addData)));
          this.addData.describe="";
          this.addData.remark="";
          this.addData.name="";
          this.addData.imgSrc=[]
          this.openAdd=false;
          this.$message({
            message:"添加成功",
            type:"success",
          })
        }
      }
    },
    editBack(res){
      if(res==="cancel"){
        this.editIndex=undefined;
        this.openEdit=false;
      }else if(res==="sure"){
        console.log(this.editIndex);
        this.tableData[this.editIndex].name=this.editData.name;
        this.tableData[this.editIndex].describe=this.editData.describe;
        this.tableData[this.editIndex].remark=this.editData.remark;
        this.tableData[this.editIndex].imgSrc=this.editData.imgSrc;
        this.editIndex=undefined;
        this.openEdit=false;
        const h = this.$createElement;
        this.$message({
          message: h('p', null, [
            h('span', {style:{"color":"green"}}, '修改成功 ')
          ]),
          type:'success'
        });
      }
    },
    // 双击图片查看大图
    showBigImg(e){
      let ele=$(e.target);
      let src=ele.attr("src");
      this.showImgSrc=src;
      this.showImgWall=true;
      
    },
    // 上传图片发生改变的回调函数
    addImgs(imgs){
      this.addData.imgSrc=[];
      for(let i=0;i<imgs.length;i++){
        this.addData.imgSrc[i]=URL.createObjectURL(imgs[i]);
      }
    },
    editImgs(imgs){
      this.editData.imgSrc=[];
      for(let i=0;i<imgs.length;i++){
        this.editData.imgSrc[i]=URL.createObjectURL(imgs[i]);
      }
    },
    // 搜索框点击返回
    searchChangeBack(res){
      if(res===""){
        this.search=res;
      }
    },
    searchClickBack(res){
      console.log(res)
      this.search=res;
    },
    nowTime(type) {
      // 参数 type为需要的时间类型,默认为time
      // time : 12:10:22
      // date : 2019-10-10
      // datetime : 2019-10-10 12:10:22
      // timestamp: 1571294661250
      return (()=> {
        let myDate = new Date();
        let year = myDate.getFullYear();
        let month = myDate.getMonth() + 1;
        let date = myDate.getDate();
        let h = myDate.getHours(); //获取当前小时数(0-23)
        let m = myDate.getMinutes(); //获取当前分钟数(0-59)
        let s = myDate.getSeconds();
        //获取当前时间
        if(type=="date"){
          return `${conver(year)}-${conver(month)}-${conver(date)}`;
        }else if(type=="datetime"){
          return `${conver(year)}-${conver(month)}-${conver(date)} ${conver(h)}:${conver(m)}:${conver(s)}`;
        }else if(type=="time"){
          return `${conver(h)}:${conver(m)}:${conver(s)}`;
        }else if(type=="timestamp"){
          return myDate.getTime();
        }
        return `${conver(h)}:${conver(m)}:${conver(s)}`;
      })();
      //日期时间处理
      function conver(s) {
        return s < 10 ? "0" + s : s;
      }
    },
  },
  components: {
    theBtn,
    theTable,
    searchBox,
    pagination,
    infoAddBox,
    submitImageBox,
    affirmBox
  }
};
</script>


<style lang='less' scoped>
@import url("./deviceList.less");
</style>

<style>
/* 1080px下 */
.has-gutter tr th{
  height: 80px;
}
.el-table__row td{
  height: 66px;
}
.el-table__row td div{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.slotBody>.sb-textarea textarea{
  border-radius: 16px;
  resize:none;
}
.slotBody>.sb-input input{
  border-radius: 16px;
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
      url("../../../../../assets/public/icomoon/fonts/icomoon.ttf") format("truetype"),
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

@media screen and (max-height:1080px) {
  .has-gutter tr th{
    height: 80px;
  }
  .el-table__row td{
    height: 66px;
  }
}
@media screen and (max-height:980px) {
  .has-gutter tr th{
    height: 80px;
  }
  .el-table__row td{
    height: 56px;
  }
}
@media screen and (max-height:880px) {
  .has-gutter tr th{
    height: 66px;
  }
  .el-table__row td{
    height: 50px;
  }
}
@media screen and (max-height:810px) {
  .has-gutter tr th{
    height: 56px;
  }
  .el-table__row td{
    height: 40px;
  }
}
@media screen and (max-height:750px) {
  .has-gutter tr th{
    height: 40px;
  }
  .el-table__row td{
    height: 36px;
  }
}
</style>
