<template>
    <!--作业人员弹框-->
  <div class="elastic">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="560px"
      :modal="false"
      center
      custom-class="elastic-box2"
      @close="$emit('update:show', false)"
      :show="show">
      <!--这是头像-->
      <div class="img">
        <div v-show="head">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div v-show="edit">
          <!--<img :src=formLabelAlign.headPortrait alt="">-->
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <!--这是增删改查的弹框-->
      <el-form  :label-position="labelPosition" label-width="180px" :model="formLabelAlign">
        <!--<el-form-item label="账号: ">-->
          <!--<el-input v-model="formLabelAlign.accountNumber" :disabled="edit"  class="form-input2"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="姓名: ">
          <el-input v-model="formLabelAlign.name" class="form-input2"></el-input>
        </el-form-item>
        <el-form-item label="状态: " v-if="edit">
          <el-select v-model="value" placeholder="请选择状态" class="input">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄: ">
          <el-input v-model="formLabelAlign.age" class="form-input2"></el-input>
        </el-form-item>
        <el-form-item label="性别: ">
          <!--<el-input v-model="formLabelAlign.gender" class="form-input2"></el-input>-->
          <el-select v-model="value2" placeholder="请选择性别" class="input">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位: ">
          <el-select v-model="value1" placeholder="请选择岗位" class="input">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码: ">
          <el-input v-model="formLabelAlign.phone" disabled class="form-input2"></el-input>
        </el-form-item>
        <!--<el-form-item label="创建时间: " v-if="edit">-->
          <!--<el-input v-model="formLabelAlign.time" class="form-input"></el-input>-->
        <!--</el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        visible: this.show,//监控弹框显示/隐藏
        title:'添加用户',
        head:false,//添加时隐藏
        edit:false,//编辑时显示
        imageUrl: '',//存储img路径
        labelPosition: 'right',//默认表单对齐方式
        formLabelAlign: {
          SerialNum:'',//工号(需要注释的)
          headPortrait:'',//头像
          age:'',//年龄
          name:'',//员工姓名
          gender:'',//性别
          accountNumber:'',//账号
          post:'',//岗位
          time:'',//创建时间
          personStatus:'正常',//人员状态
          phone:''//员工电话
        },
        options: [
          {
          value: '选项1',
          label: '正常'
        }, {
          value: '选项2',
          label: '落水'
        }, {
          value: '选项3',
          label: '呼救'
        }],
        value: '',//状态的绑定
        options1: [
          {
          value: '电气运行专员',
          label: '电气运行专员'
        }, {
          value: '电气巡检专员',
          label: '电气巡检专员'
        },
          {
            value: '设备运行专员',
            label: '设备运行专员'
          },
          {
            value: '设备巡检专员',
            label: '设备巡检专员'
          }],
        value1: '',//岗位的绑定
        options2: [
          {
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }],
        value2: '',//性别的绑定
      };
    },
    methods:{
      add(){
        // console.log(this.title);
        //
        // if(this.title==='添加用户'){
        //   console.log(this.formLabelAlign);
        // }else {
        //
        //   console.log(this.formLabelAlign);
        // }
        this.visible =false;
      },
      //这是上传img的方法
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title1: {
        type: String,
        default: false
      },
      sonData:{
        type: Object,
        default:false,
      }
    },
    watch: {
      show () {
        this.visible = this.show;
        this.title = this.title1;
        // console.log(this.title);
        // console.log(this.title === '添加用户');
        if(this.title === '添加用户'){
          this.head=true;
          this.edit=false;
        }else {
          this.head=false;
          this.edit=true;
        }
        if(this.title === '添加用户'){
          this.formLabelAlign.name='';
          this.formLabelAlign.age='';
          // this.formLabelAlign.gender='';
          this.formLabelAlign.accountNumber='';
          this.formLabelAlign.phone='';
          this.value1='';
          this.value='';
          this.value2='';
          this.imageUrl = '';
        }else {
          this.formLabelAlign.SerialNum=this.sonData.SerialNum;
          this.formLabelAlign.name=this.sonData.name;
          this.formLabelAlign.age=this.sonData.age;
          this.imageUrl=this.sonData.headPortrait;
          this.value2=this.sonData.gender;
          this.formLabelAlign.accountNumber=this.sonData.accountNumber;
          this.formLabelAlign.phone=this.sonData.phone;
          this.value1=this.sonData.post;
          this.value=this.sonData.personStatus;
        }
      }
    }
  };
</script>

<style scoped>

</style>
<style>
  .elastic-box2>div:nth-child(1){
    color: white;
    background-color: rgb(78,125,230);
  }
  .elastic-box2>div:nth-child(1) >span{
  color: white;
  }
  .elastic-box2>div:nth-child(2) > form > div{
    margin-bottom: 10px;
  }
  .form-input2 .el-input__inner {
    width: 220px;
    height: 30px;
    border-radius: 100px;
   display: inline-block;
  }
  .box-input >div{
    width: 220px;
  }
  .box-textarea >div{
    width: 300px;
  }
  .input>div>input{
    height: 30px;
    border-radius: 40px;
  }
  .img{
    width: 100%;
    height: 80px;
    text-align: center;
    position: relative;
  }
  .img >div{
    width: 60px;
    height: 60px;
    /*background-color: rgba(0, 0, 0, 0.69);*/
    background-image: url("../../../../../assets/person_system/image/image_t/upload.png");
    background-size: cover;
    color: white;
    text-align: center;
    line-height: 60px;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .img >div  img{
    width: 100%;
    height: 100%;
    border-radius: 100px;
    border: 1px solid rgb(247,247,247);
  }

  /*这是img上传的css*/
  .avatar-uploader .el-upload {
    /*border: 1px dashed #d9d9d9;*/
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #fff;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }
</style>
