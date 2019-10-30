<template>
  <!-- 这个是页面中的内容的部分-->
  <div class="contentBox" v-cloak>
    <el-container>
      <el-header>
        <headerbox></headerbox>
      </el-header>
      <el-container>
        <span class="showBtn switchBtn" @click="switchMenu" v-show="!isShow">
          <i class="fa fa-angle-double-right"></i>
        </span>
        <span class="hideBtn switchBtn" @click="switchMenu" v-show="isShow">
          <i class="fa fa-angle-double-left"></i>
        </span>
        <el-aside>
          <siderbar></siderbar>
        </el-aside>
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>


<script>
import headerbox from "@/components/contentBox/header/head_box.vue";
import siderbar from "@/components/contentBox/sidebar/sidebar.vue";
export default {
  name: "contentBox",
  data() {
    return {
      isShow:true
    };
  },
  methods: {
    switchMenu(){
      if(this.isShow){
        $(".el-aside").css({"visibility":"hidden","opacity":"0"});
        $(".el-main").css({"width":"100%"});
        this.isShow=false;
      }else{
        $(".el-aside").css({"visibility":"visible","opacity":"1"});
        $(".el-main").attr("style","");
        this.isShow=true;
      }

    }
  },
  components: {
    siderbar,
    headerbox
  }
};
</script>

<style scoped>
[v-cloak] {
    display: none;
}
.contentBox {
  width: 100%;
  height: 100%;
}
.switchBtn{
  position: fixed;
  display: block;
  width: 36px;
  height: 36px;
  top: 80px;
  border-radius: 50%;
  left: -15px;
  z-index: 999;
  text-align: right;
  transition: 0.3s;
  line-height: 40px;
}
.switchBtn>i{
  font-size: 24px;
  margin-right: 6px;
  color: #fff;
  transition: 0.3s;
}
.switchBtn:hover{
  left: 0;
}
.switchBtn:hover>i{
  margin-right: 12px;
}
.showBtn{
  background-color: rgb(206, 206, 206);
}
.hideBtn {
  background-color: rgb(196, 196, 196);
}
.showBtn:hover{
  background-color: rgb(72, 111, 240);
}
.hideBtn:hover{
  background-color: rgb(72, 111, 240);
}
.contentBox >>> .tac {
  width: 100%;
}
.contentBox >>> .el-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.contentBox >>> .el-menu {
  border: none;
}
.contentBox >>> .el-header {
  padding: 0;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
}
.contentBox >>> .el-container {
  width: 100%;
  height: 100%;
  display: flex;
  /* flex-direction: row; */
}
.contentBox >>> .el-aside {
  width: 240px !important;
  color: black;
  height: 100%;
  top: 60px;
  overflow: hidden;
  transition: 0.3s;
  /*background-color: #eee;*/

}
.contentBox >>> .el-main {
  width: calc(100% - 240px);
  height: 100%;
  position: absolute;
  transition: 0.3s;
  right: 0;
  z-index: 99;
}
.el-main {
  padding: 0;
  margin: 0;
}
@media screen and (max-width: 1480px) {
  .contentBox >>> .el-aside {
    width: 16.2% !important;
  }
  .contentBox >>> .el-main {
    width: 83.8%;
  }
}
@media screen and (max-width: 1200px) {
  .contentBox >>> .el-aside {
    width: 194px !important;
  }
  .contentBox >>> .el-main {
    width: calc(100% - 194px);
  }
}
</style>

