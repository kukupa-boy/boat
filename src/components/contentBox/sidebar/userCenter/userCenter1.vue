<template>
    <div id="userCenter1">
      <div class="userCenter1_inner">
        <div class="account_information">

          <router-link to="/contentBox/userCenter"><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></router-link>

          <span>修改信息</span>
        </div>
        <div class="imageAndInformation">
          <div class="user_image">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-change="imgUpload"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <p class="changeImgInformation">点击可以更换头像</p>
          <div class="user_information">
            <el-form
              :rules="rules"
              ref="ruleForm"
              :model="userData"
              label-width="85px">
            <el-form-item label="姓名："  prop="UserName">
              <el-input v-model="userData.UserName" ></el-input>
            </el-form-item>
            <el-form-item label="性别：">
              <el-select v-model="userData.gender" placeholder="请选择活动区域">
                <el-option label="男" value="man"></el-option>
                <el-option label="女" value="woman"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄：" prop="age">
              <el-input v-model="userData.age"></el-input>
            </el-form-item>
              <el-form-item label="时间：">
               <p><span>{{userData.time}}</span></p>
              </el-form-item>
              <el-form-item label=" 密码：">
                <p>  <span><router-link to="/contentBox/updatePhoneNumber">修改</router-link></span></p>
              </el-form-item>
              <el-form-item label=" 手机密码：">
                <p>  <span><router-link to="/contentBox/updatePassword">修改</router-link></span></p>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div>
          <div class="confirmButton">
            <el-button  type="primary" @click="submitForm('ruleForm')" round>
              确定
            </el-button>
            <el-button type="info" @click="userCenterCancel" round>
              取消
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
      export default {
          name: "userCenter11",
        //在页面打开的时候将localStorage中的值进行取出
          created(){
            console.log(11);
            // this.userData=JSON.parse(localStorage.getItem("userInfo"));
            console.log(this.userData=JSON.parse(localStorage.getItem("userInfo")))
          },
        data(){
            return{
              //图片上传的url
              imageUrl: '',
              userData:{
                UserName:"",
                age:""
              },
              //表单的验证规则
              rules: {
                UserName: [
                  {
                    required:true,message: '姓名不能为空', trigger: 'blur'
                  },
                ],
                age: [
                  { required: true, message: '请输入3位数以内的整数', trigger: 'blur' },
                  { min: 1, max: 2, message: '长度在 1到 2 个字符', trigger: 'blur' }
                ]
              }
            }
        },
        methods:{
          // userCenterComfirm(){
          //   this.$router.push("/contentBox/userCenter");
          // },
          userCenterCancel(){
            this.$router.push("/contentBox/userCenter");
          },
          //用户进行上传的函数
          handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log("这个是文件上传成功的时候的东西");
            console.log(res);
            console.log(file);
          },
          beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
          },
          imgUpload(file,fileList){
            console.log("正在调用onchange事件")
            console.log(file);
            console.log(fileList)
          },
          //用户进行提交的时候进行触发的函数
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
                //验证规则通过跳转液面
                this.$router.push("/contentBox/userCenter");
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          }
        }
      }
  </script>

  <style scoped>
    #userCenter1{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(240,240,240);
    }
    .userCenter1_inner{
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
    .imageAndInformation{

    }
    .user_image{
      margin: 0 auto;
      width: 150px;
      height: 150px;
      border-radius: 100%;
      border: 1px solid #d7d7d7;
    }
    .user_image img{
      width: 150px;
      height: 150px;
      border-radius: 100%;
    }
    .changeImgInformation{
      width: 100%;
      text-align: center;
      color: lightgrey;
    }

    /*这个是控制输入框的样式*/
    .user_information{
      margin-top: 4%;
      text-align: center;
      /*height: 31.8%;*/
      /*border: 1px solid red;*/
    }
    .user_information>>>.el-form{
      width: 25%;
      margin: 0 auto;
    }
    .user_information>>>.el-input__inner,.user_information>>>.el-select__inner{
      border-radius: 20px;
    }
    /*.user_information>>>.el-form-item__label{*/
    /*  text-align: left;*/
    /*}*/
    .user_information p{
      text-align: center;
    }
    .confirmButton{
      display: flex;
      justify-content: space-around;
    }
    .confirmButton .el-button:nth-of-type(1){
      margin-left: 20%;
      box-sizing: border-box;
    }
    .confirmButton .el-button:nth-of-type(2){
      margin-right: 20%;
      box-sizing: border-box;
    }

  /*  用户上传的style*/
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 100%;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    .avatar {
      width: 150px;
      height: 150px;
      display: block;
    }
    .user_image>>>.el-upload i{
      text-align: center;

    }
    .el-form{
      /*border: 1px solid red;*/
      height: 50%;
      margin-top: -20px!important;
    }
    .el-form-item{
      /*border: 1px solid red;*/
      margin-top: -18px;
    }
  </style>

