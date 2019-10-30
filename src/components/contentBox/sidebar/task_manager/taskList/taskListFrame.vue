<template>
  <!--任务弹框-->
  <div class="elastic">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="560px"
      :modal="false"
      center
      custom-class="elastic-box"
      @close="$emit('update:show', false)"
      :show="show">
      <!--这是头像-->
      <el-form  :label-position="labelPosition" label-width="180px" :model="formLabelAlign">
        <el-form-item label="任务名称: ">
          <el-input disabled v-model="formLabelAlign.taskName"  class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="生效时间: ">
          <el-input disabled v-model="formLabelAlign.entryIntoForceTime" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="失效时间: ">
          <el-input disabled v-model="formLabelAlign.failureTime" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="任务描述: ">
          <el-input disabled v-model="formLabelAlign.taskDescription" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="任务周期: ">
          <el-input disabled v-model="formLabelAlign.taskCycle" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="任务类型: ">
          <el-input disabled v-model="formLabelAlign.taskType" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="分发人员: " >
          <el-input disabled v-model="formLabelAlign.distributor" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="创建时间: " >
          <el-input disabled v-model="formLabelAlign.creationTime" class="form-input"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        visible: this.show,//监控弹框显示/隐藏
        title:'',
        labelPosition: 'right',//默认表单对齐方式
        formLabelAlign: {
          SerialNum:'',//工号
          taskName:'',//任务名称
          entryIntoForceTime:'',//生效时间
          failureTime:'',//失效时间
          taskType:'',//任务类型
          taskDescription:'',//任务描述
          taskCycle:'',//任务周期
          creationTime:'',//创建时间
          distributor:'',//分发人员
        }
      };
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
        this.title=this.title1
        console.log(this.title)
        console.log(this.sonData);
        this.formLabelAlign.taskName=this.sonData.taskName;
        this.formLabelAlign.entryIntoForceTime=this.sonData.entryIntoForceTime;
        this.formLabelAlign.failureTime=this.sonData.failureTime;
        this.formLabelAlign.taskType=this.sonData.taskType;
        this.formLabelAlign.taskDescription=this.sonData.taskDescription;
        this.formLabelAlign.creationTime=this.sonData.creationTime;
        this.formLabelAlign.taskCycle=this.sonData.taskCycle;
        this.formLabelAlign.distributor=this.sonData.distributor;
      }
    }
  };
</script>

<style scoped>
  .elastic-box>:nth-child(1){
    color: white;
    background-color: rgb(78,125,230);
  }
  .elastic-box>:nth-child(2) > form > div{
    margin-bottom: 10px;
  }
  .box-input >div{
    width: 220px;
  }
  .box-textarea >div{
    width: 300px;
  }
  /*.img{*/
    /*width: 100%;*/
    /*height: 80px;*/
    /*text-align: center;*/
    /*position: relative;*/
  /*}*/
  /*.img >div{*/
    /*width: 60px;*/
    /*height: 60px;*/
    /*background-color: #55a532;*/
    /*text-align: center;*/
    /*line-height: 60px;*/
    /*border-radius: 10px;*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*margin: auto;*/
  /*}*/
</style>
<style>
  .form-input .el-input__inner {
    width: 220px;
    height: 30px;
    border-radius: 40px;
    display: inline-block;
  }
  .input>div>input{
    height: 30px;
    border-radius: 40px;
  }

</style>
