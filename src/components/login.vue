<template>
  <div class="login" >
        <div style="width: 100%;">
        <p>
          <img src="@/assets/public/img/Wind Power Intelligence(1).png">
        </p>
        <p>
          海上风电智慧运维系统
        </p>
    </div >
        <div class="login_box" >

          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <el-form-item label="" prop="userName">
              <el-input type="text" v-model="ruleForm.userName"  autocomplete="off" placeholder="登录账号"></el-input>

            </el-form-item>
            <el-form-item label="" prop="userPassword">
              <el-input type="password" v-model="ruleForm.userPassword" placeholder="登录密码" autocomplete="off"></el-input>
            </el-form-item>
<!--            <div class="input_code" style="border: 1px solid red;">-->
              <el-form-item label="" prop="vertifyCode">
                <el-input type="text" v-model="ruleForm.vertifyCode" placeholder="请输入验证码"  autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item class="submit_button">
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
    <div class="code">
      <p style="margin-top: 0;color:rgb(106,176,223);"><span @click="refreshCode">看不清楚?换一张图</span></p>
      <div id="code"  class="login-code"  style="display:block; margin: 10px auto;width: 180px;height: 50px;text-align: center;border-radius: 20px;margin-top:-20px;color: white">
        <!--验证码组件-->
        <s-identify :identifyCode="identifyCode"></s-identify>
      </div>
    </div>
    <!--图标-->
    <p  class="footer" style="width: 100%;">
          <img style="width: 720px;height: 40px;" src="@/assets/public/img/logo.png">
        </p >
  </div>
</template>

<script>
  import SIdentify from '@/components/verticalify_code.vue'
  export default {
    name: 'login',
    created(){
      this.refreshCode()
    },
    mounted(){
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },

    data(){

      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error('请输入密码'));
        } else if(value!==this.identifyCode) {
          console.log(this.code)
          callback(new Error('验证码不正确'));
        }
        callback();
      };
      return {
        //  验证码部分
        identifyCodes: "1234567890",
        //identifyCode是验证码的码数
        identifyCode: "",
        code:"",//text框输入的验证码
        checkCode:"",
        //登录的值部分
        ruleForm: {
          userName: '',
          userPassword: '',
          vertifyCode: ''
        },
        rules: {
          userName: [
            { required:true,message:"登录账号不能为空", trigger: ['blur','change'] },
            { min:2,max:16,message:"账号在2到16位", trigger:  ['blur','change'] }
          ],
          userPassword: [
            { required:true,message:"登录密码不能为空", trigger: ['blur','change'] },
            { min:6,max:16,message:"密码在6到16位", trigger:  ['blur','change'] }
          ],
          vertifyCode: [
            {validator:validatePass, trigger:  ['blur','change']}
          ]
        }
      };
    },
    methods: {
      //验证码
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
        }
      },

      //登录时验证码判断部分
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            localStorage.setItem("userName",JSON.stringify(this.ruleForm.userName));
            this.$router.push("/contentBox/chartManagement/shipManagerMent");
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    components:{
      SIdentify
    }
  }
</script>

<style scoped>
  .login{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: red;
    background: url("../assets/public/img/login_background.png");
    border: 0.1px solid transparent;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
    align-content: space-around;
  }
  .login>div>p:nth-of-type(1){
    height: 45px;
    /*height: auto;*/
    /*margin-top: 7.1%;*/
    text-align: center;
    background-color: transparent;
    border: 0.1px solid transparent;
  }
  .login>div>p:nth-of-type(1) img{
    margin-top: 10px;
    width: 360px;
    height: 35px;
    /*height: auto;*/
  }
  .login>div>p:nth-of-type(2){
    /*margin-top:10px;*/
    text-align: center;
    font-size: 24px;
    height: 45px;
    /*height: auto;*/
    line-height:45px ;
    color: white;
    letter-spacing: 5px;
    word-spacing: 5px;
  }
  .login_box{
    width:650px;
    height: 560px;
    /*height: auto;*/
    /*width: 33.8%;*/
    /*height:29.1% ;*/
    background-color:ghostwhite;
    opacity: .8;
    margin: 0 auto;
    /*margin-top: 80px;*/
    border-radius: 10px;
    text-align: center;
    position: relative;
  }
  .login>div>p:nth-of-type(3){
    text-align: center;
    height:30px;
    /*height: auto;*/
    margin-top:50px;
  }
  .login>div>p:nth-of-type(3) img{
    height: 30px;
    /*height: auto;*/
    width: 205px;
  }
  .s-canvas >>>canvas{
    float: left;
    margin-top: -1px;
    border-radius: 20px;
  }
  .login_box>>>.el-form-item:nth-of-type(1){
    margin-top: 50px;
  }
  .el-form{
    margin-top: 80px;
  }
  .login_box>>>.el-form-item:nth-of-type(1),.login_box>>>.el-form-item:nth-of-type(2){
    width: 60%;
    margin: 40px auto;
  }
  .login_box>>>.el-input{
    margin: 0 auto;
  }
  .login_box>>>.el-input__inner{
    border-radius: 0;
    border: none;
    border-bottom: 2px solid rgb(107,178,238);
    height: 50px;
    background-color: transparent;
  }
  .login_box>>>.el-input ::placeholder{
    color: deepskyblue;
    font-size: 18px;
  }
  /*验证码部分*/
  .input_code{
    width: 60%;
    height: 60px;
    margin: 0 auto;
    /*overflow: hidden;*/
    position: relative;
  }
  .input_code>>>.el-form-item{
    float: left;
  }
  .login_box>>>.el-form-item:nth-of-type(3){
    width:60%;
    display: inline-block;
  }
  .login_box>>>.el-form-item:nth-of-type(3)>.el-form-item__content{
    display: inline-block;
    width: 45%;
    float: left;
  }
  .code{
    width: 10%;
    position: absolute;
    top: 47%;
    left: 50%;
    display: flex;
    height:82px;
    flex-direction: column;
    justify-content: space-between
  }
  .el-button{
    width: 200px;
    height: 60px;
    border-radius: 30px;
    background-color: deepskyblue;
    color: white;
    text-decoration: none;
  }
.submit_button{
  margin-top: 60px;
}


</style>
