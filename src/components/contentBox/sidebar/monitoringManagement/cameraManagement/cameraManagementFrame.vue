<template>
  <!--摄像头管理弹框-->
  <div class="elastic">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="560px"
      top="30vh"
      :modal="false"
      center
      custom-class="elastic-box1"
      @close="$emit('update:show', false)"
      :show="show">
      <el-form :label-position="labelPosition" label-width="60px" :model="formLabelAlign">
        <!--<el-form-item label="编号: ">-->
          <!--<el-input :disabled="bank"  v-model="formLabelAlign.num"  class="form-input1"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="型号: ">
          <el-input :disabled="bank"  v-model="formLabelAlign.model"  class="form-input1"></el-input>
        </el-form-item>
        <el-form-item label="经度: ">
          <el-input v-model="formLabelAlign.longitude" class="form-input1"></el-input>
        </el-form-item>
        <el-form-item label="纬度: ">
          <el-input v-model="formLabelAlign.latitude" class="form-input1"></el-input>
        </el-form-item>
        <el-form-item label="状态: " v-if="status">
            <el-input v-model="formLabelAlign.cameraStatus" class="form-input1"></el-input>
        </el-form-item>
        <el-form-item label="备注: ">
          <el-input type="textarea" v-model="formLabelAlign.remarks" class="form-input1"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false;open2()" :plain="true">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        visible: this.show,//监控弹框显示/隐藏
        title:'新增信息',
        bank:false,//控制input的禁用
        status:false,//编辑时的显示
        labelPosition: 'right',//默认表单对齐方式
        formLabelAlign: {
          // num:'1',//编号
          model:'BTWS',//型号
          longitude:'117°',//经度
          latitude:'118°',//纬度
          cameraStatus:'运行',//摄像头状态
          reportingTime:'20.19.10.16 15:30',//上报时间
          remarks:'无备注',//备注
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
        this.title = this.title1;
        if(this.title==='添加摄像头'){
          this.status=false;
          // this.formLabelAlign.num= '';
          this.formLabelAlign.model= '';
          this.formLabelAlign.longitude='';
          this.formLabelAlign.latitude='';
          this.formLabelAlign.remarks='';
          this.bank = false;
        }else {
          this.status=true;
          // this.formLabelAlign.num=this.sonData.num;
          this.formLabelAlign.model=this.sonData.model;
          this.formLabelAlign.longitude=this.sonData.longitude;
          this.formLabelAlign.latitude=this.sonData.latitude;
          this.formLabelAlign.remarks=this.sonData.remarks;
          this.bank = true;
        }
      }
    },
    methods:{
      open2() {
        if(this.title==='添加摄像头'){
          this.$message({
            message: '恭喜你，添加成功',
            type: 'success'
          });
        }else {
          this.$message({
            message: '恭喜你，编辑成功',
            type: 'success'
          });
        }
      },
    }
  };
</script>

<style scoped>

</style>
<style>
  .elastic-box1>:nth-child(1){
    background-color: rgb(78,125,230);
  }
  .elastic-box1>:nth-child(2) > form > div{
    margin-bottom: 10px;
  }
  .elastic-box1>div:nth-child(1) >span{
    color: white;
  }
  .form-input1 .el-input__inner {
    width: 100%;
    height: 30px;
    border-radius: 30px;
    display: inline-block;
  }
  .box-input1 >div{
    width: 100%;
  }
</style>
