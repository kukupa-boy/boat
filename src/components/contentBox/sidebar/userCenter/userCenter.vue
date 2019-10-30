<template>
    <div id="userCenter">
      <div class="userCenter_inner">
        <div class="account_information">账号信息</div>
        <div class="imageAndInformation">
          <div class="user_image">
              <img src="@/assets/public/img/pig.jpg">
          </div>
          <div class="user_information">
            <p><span>账号</span>   <span>{{this.userInfo.account}}</span></p>
            <p><span>手机号码</span>   <span>{{this.userInfo.number}}</span></p>
            <p><span>姓名</span>   <span>{{this.userInfo.UserName}}</span></p>
            <p><span>性别</span>   <span>{{this.userInfo.gender}}</span></p>
            <p><span>年龄</span>   <span>{{this.userInfo.age}}</span></p>
            <p><span>创建时间</span>   <span>{{this.userInfo.time}}</span></p>
          </div>
        </div>
        <div>
          <div class="confirmButton">
            <router-link to="/contentBox/userCenter1">
            <el-button type="primary" round>
            修改信息
            </el-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "userCenter",
      mounted(){
          //在mounted中将用户的信息数据渲染在localStorage中
          localStorage.setItem("userInfo",JSON.stringify(this.userInfo));
      },
        data(){
          return {
            userInfo: {
              account: "VQRB6",
              number: "1825****153",
              UserName: JSON.parse(localStorage.getItem("userName")),
              gender: "女",
              age: 30,
              time: "2016.12.12"
            }
          }
        }
    }
</script>

<style scoped>
  #userCenter{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(240,240,240);
  }
  .userCenter_inner{
    height: 83.4%;
    width: 74%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    border-radius: 10px;
  }
  .account_information{
    width: 100%;
    padding: 20px;
    font-size: 18px;
  }
  .imageAndInformation{

  }
  .user_image{
    margin: 0 auto;
    width: 150px;
    height: 150px;
  }
  .user_image img{
    width: 150px;
    height: 150px;
    border-radius: 100%;
  }
  .user_information{
    text-align: center;
    height: 31.8%;
  }
  .user_information p{
    width:30%;
    margin: 3% auto;
  }
  .user_information p span{
    display: inline-block;
    width: 40%;
    font-size: 16px;
  }
  .user_information p span:nth-of-type(1){
    text-align:right;
  }
  .user_information p span:nth-of-type(2){
    margin-left: 15%;
    text-align:left;
  }
  .confirmButton{
    width: 100%;
    margin-top: 40px;

  }
  .confirmButton a{
    display: inline-block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: black;
    display: flex;
    justify-content: center;
  }
  .confirmButton .el-button:hover a{
    color: white;
  }

</style>
