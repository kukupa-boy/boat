<template>
  <div id="updatePassword">
    <div class="updatePassword_inner">
      <div class="account_information">

          <router-link to="/contentBox/userCenter1"> <i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></router-link>

        <span>修改绑定手机</span>
      </div>
      <div class="imageAndInformation">
        <div class="user_image">
          <img src="@/assets/public/img/phone.png">
        </div>

        <!--表单部分-->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="手机号：" prop="number">
            <el-input type="text" v-model="ruleForm.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="获取验证码：" prop="statusCode" >
            <el-input style="width: 60%;" type="text" v-model="ruleForm.statusCode"  autocomplete="off"></el-input>
            <el-button type="primary" size="small" style="float: right;vertical-align: middle;position: relative;top: 4px;" round>获取验证码</el-button>
          </el-form-item>
        </el-form>

      </div>
      <div>
        <div class="confirmButton">
          <router-link to="/contentBox/userCenter1">
          <el-button type="primary" round>
            确定
          </el-button>
          </router-link>
          <router-link to="/contentBox/userCenter1">
          <el-button type="info" round>
            取消
          </el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "updatePassword",
      data() {
        var validatePass3 = (rule, value, callback) => {
          if (!(/^1[3456789]\d{9}$/.test(value))) {
            callback(new Error('手机号码有误，请重填'));
          } else {
            callback();
          }
        };
        return {
          ruleForm: {
            number: ""
          },
          rules: {
            number: [
              {required: true, validator: validatePass3, trigger: 'blur'}
            ],
            statusCode: [
              {required: true, message: "验证码不能为空", trigger: 'blur'}
            ]

          }
        }
      }
    }
</script>

<style scoped>
  #updatePassword{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(240,240,240);
  }
  .updatePassword_inner{
    height: 83.4%;
    width: 74%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    border-radius: 10px;
  }
  .account_information{
    position: relative;
    width: 100%;
    padding: 2%;
    box-sizing: border-box;
  }
  .account_information i{
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 30px;
    color: black;
  }
  .account_information{
    text-align: center;
  }
  .account_information span{
    font-size: 18px;
    line-height: 30px;
  }
  .account_information i:hover{
    color: rgb(79,100,221);
  }
  .user_image{
    margin: 0 auto;
    width: 80px;
    height: 170px;
  }
  .user_image img{
    width: 80px;
    height: 170px;
  }
  .confirmButton{
    width: 100%;
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    padding-right: 20%;
    padding-left: 20%;
    box-sizing: border-box;
  }
  .imageAndInformation .el-form{
    margin-top: 5%;
  }
  .user_information input{
    height: 25px;
    border-radius: 20px;
    width: 80%;
    border: 1px solid black;
    text-indent: 8px;
    box-shadow: none;
  }
  .confirmButton .el-button:nth-of-type(2){
    margin-left: 20%;
  }
  .el-form{
    width: 50%;
    margin: 0 auto;
  }
  .imageAndInformation>>> .el-input__inner{
    background-color: rgb(240,240,240);
    border-radius: 20px;
  }
</style>

