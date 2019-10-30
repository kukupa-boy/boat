<template>
  <div class="header_box">
    <div class="header_left">
      <img src="@/assets/public/img/header_left.png" />
      <img src="@/assets/public/img/item-manage.png"/>
    </div>
    <div class="item-right">
      <div class="btnbox">
        <div>
          <i class="fa fa-address-card-o" aria-hidden="true"></i>
          <span>
            <router-link to="/contentBox/messageInform" class="messageInform">任务</router-link>
          </span>
        </div>
        <div>
<!--          <el-dropdown>-->
            <span class="el-dropdown-link1" style="width: 70px;vertical-align: baseline;">
<!--              <i class="fa fa-bell-o" aria-hidden="true"></i>消息-->
              <router-link to="/contentBox/message"> <i class="fa fa-bell-o" aria-hidden="true"></i>消息</router-link>
            </span>
<!--            <el-dropdown-menu slot="dropdown">-->
<!--              <el-dropdown-item>-->
<!--                <router-link to="/contentBox/message">公告消息</router-link>-->
<!--              </el-dropdown-item>-->
<!--              <el-dropdown-item>-->
<!--                <router-link to="/contentBox/message">警报消息</router-link>-->
<!--              </el-dropdown-item>-->
<!--              <el-dropdown-item>-->
<!--                <router-link to="/contentBox/message">紧急消息</router-link>-->
<!--              </el-dropdown-item>-->
<!--              <el-dropdown-item>-->
<!--                <router-link to="/contentBox/message">普通消息</router-link>-->
<!--              </el-dropdown-item>-->
<!--            </el-dropdown-menu>-->
<!--          </el-dropdown>-->
        </div>
      </div>
      <div class="login_state">
        <div class="user_portrait"><img src="@/assets/public/img/pig.jpg"></div>
        <!--        <span>未登录</span> <i class="fa fa-sort-desc" aria-hidden="true"></i>-->
        <el-dropdown trigger="click">
          <span class="el-dropdown-link" style="width: 70px;vertical-align: baseline;">
            已登录
            <i class="el-icon-arrow-down el-icon--right" style="cursor: pointer;position: relative;top: 1px;"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/contentBox/userCenter">个人中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item> <router-link to="/login">退出</router-link></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "head_box",
  data() {
    return {};
  },
  methods: {
  }
};
</script>

<style  scoped>
/*header的样式部分的设计*/
.header_box {
  height: 100%;
  width: 100%;
  background-color: rgb(95, 124, 226);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/*头部的样式*/
.header_left {
  height: 100%;
  background-color: rgb(68, 100, 224);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px !important;
}
@media screen and (max-width:1480px) {
  .header_left {
    width: 16.2% !important;
  }
}
@media screen and (max-width:1200px) {
  .header_left {
    width: 194px !important;
  }
}
.header_left {
  float: left;
  display: flex;
  justify-content: space-around;
}
.header_left img {
  height: 45px;
  width: 45px;
}
.header_left img:nth-of-type(2) {
  height: 35px;
  width: 35px;
}
.item-right {
  /*width: 30.7%;*/
  /*border: 1px solid red;*/
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.item-right .btnbox {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.item-right .btnbox div {
  height: 100%;
  cursor: pointer;
  color: white;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
.item-right .btnbox div i {
  font-size: 22px;
}
.item-right .btnbox div span {
  font-size: 16px;
}
.item-right .btnbox div:hover {
  color: rgb(135, 135, 236);
  background-color: #fff;
}
.login_state {
  padding-left: 35px;
  padding-right: 35px;
  background-color: rgb(79, 100, 221);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.login_state div {
  vertical-align: center;
}
.login_state span {
  color: white;
  width: 50px;
  display: inline-block;
  padding-left: 5px;
}

.user_portrait {
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-color: white;
}
.user_portrait img{
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.login_state i {
  color: white;
  position: relative;
  top: -3px;
  text-indent: 3px;
}
.el-dropdown-menu a {
  text-decoration: none;
  color: black;
  display: inline-block;
  width: 100%;
  height: 100%;
}
.messageInform {
  text-decoration: none;
  color: white;
}
  .el-dropdown-link1 a,.btnbox a{
    display: inline-block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
  }
.btnbox span,.el-dropdown-link1 span{
  display: inline-block;
  width: 100%;
  height: 100%;
  align-items: center;
}
  .btnbox:hover a,.btnbox:hover i ,.el-dropdown-link1:hover a,.el-dropdown-link1:hover i{
    color:rgb(79, 100, 221);
  }

</style>
