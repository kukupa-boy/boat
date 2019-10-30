<template>
  <div id="updatePassword">
    <div class="updatePassword_inner">
      <div class="account_information">

        <router-link to="/contentBox/userCenter1"> <i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></router-link>

        <span>修改密码</span>
      </div>
      <div class="imageAndInformation">
        <div class="updatePassword_form" >
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="原密码：" prop="pass1">
              <el-input type="password" v-model="ruleForm.pass1"  autocomplete="off"></el-input>
            </el-form-item >
            <el-form-item label="新密码：" prop="pass">
              <el-input type="password" v-model="ruleForm.pass"  autocomplete="off"></el-input>
            </el-form-item >

            <el-form-item label="确认密码：" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass"  autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="手机号码：" prop="number">
              <el-input type="text" v-model.number="ruleForm.number"  autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="获取验证码：" prop="statusCode" >
              <el-input style="width: 60%;" type="text" v-model="ruleForm.statusCode"  autocomplete="off"></el-input>
              <el-button type="primary" size="small" style="float: right;vertical-align: middle;position: relative;top: 4px;" round>获取验证码</el-button>
            </el-form-item>

          </el-form>
        </div>
      </div>
      <div>
        <div class="confirmButton">
          <router-link to="/contentBox/userCenter1">
          <el-button type="primary"  round>
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
        name: "updatePhoneNumber",
        data(){
          //新密码判断
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            }else if(value === this.ruleForm.pass) {
              callback(new Error('和原密码一致!'));
            } else {
              if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
              }
              callback();
            }
          };
          //第二次输入密码判断
          var validatePass2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
              callback(new Error('两次输入密码不一致!'));
            }else {
              callback();
            }
          };
          //验证码判断
          var validatePass3 = (rule, value, callback) => {
            if(!(/^1[3456789]\d{9}$/.test(value))){
              callback(new Error('手机号码有误，请重填'));
            }else{
              callback();
            }
          };
          return{
            ruleForm:{
              pass1:"yzy980427",
              pass:"yzy980427",
              checkPass:"yzy980427",
              number:"17780576951",
              statusCode:""
            },
          rules:{
              pass1: [
                {  required: true,validator: validatePass, trigger: ['blur','change'] },
                { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: ['blur','change']}
              ],
              pass: [
                {  required: true,validator: validatePass, trigger: 'blur' },
                { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger:  ['blur','change'] }
              ],
              checkPass: [
                { required: true, validator: validatePass2, trigger:  ['blur','change'] }
              ],
              number: [
                { required: true,validator:validatePass3 ,trigge: ['blur','change']},
              ],
              statusCode: [
                { required: true, message: '验证码不能为空', trigger:  ['blur','change'] }
              ]
            }
          }
        },

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
  .updatePassword_form{
    width: 40%;
    margin: 0 auto;
    margin-top: 8%;
  }
  .updatePassword_form p{
    margin-top: 5%;
    height:50px ;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .updatePassword_form p span{
    width: 20%;
    text-align: right;
  }
  .updatePassword_form>div{
    margin-top: 20px;
  }
  .updatePassword_form input{
    height: 30px;
    border-radius: 20px;
    outline: none;
    text-indent: 8px;
    background-color: lightgrey;
    border: 0.1px solid transparent;
  }
  .updatePassword_form>p>input{
    width: 70%;
    /*margin-top: 5%;*/
  }
  .updatePassword_form>div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8%;
  }
  .confirmButton{
    width: 100%;
    margin-top:5%;
    display: flex;
    justify-content: space-around;
    padding-left: 25%;
    padding-right: 25%;
    box-sizing: border-box;
  }
  .user_information input{
    height: 25px;
    border-radius: 20px;
    width: 80%;
    border: 1px solid black;
    text-indent: 8px;
    box-shadow: none;
  }
  .updatePassword_form>>>.el-input__inner{
    border-radius: 20px;
    background-color: rgb(240,240,240);
  }
  .updatePassword_form>>>.el-form-item__label{
    text-align: left;
  }
</style>
