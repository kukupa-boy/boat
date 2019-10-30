<template>
  <!--作业人员弹框-->
  <div class="elastic">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="600px"
      top="30vh"
      :modal="false"
      center
      custom-class="elastic-box"
      @close="$emit('update:show', false)"
      :show="show">
      <!--这是增删改查的弹框-->
      <el-form v-if="addDel" :label-position="labelPosition" label-width="180px" :model="formLabelAlign">
        <el-form-item label="船号: ">
          <el-input v-model="formLabelAlign.shipNumber"  class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="船舶呼号: ">
          <el-input v-model="formLabelAlign.shipNum" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="mmsi号:">
            <el-input v-model="formLabelAlign.mmsiCode" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="iom号码:">
          <el-input v-model="formLabelAlign.iomCode" class="form-input"></el-input>
        </el-form-item>
        <!--<el-form-item label="船舶类型: ">-->
          <!--<el-input v-model="formLabelAlign.shipType" class="form-input"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="船舶类型: ">
          <el-select v-model="formLabelAlign.shipType" placeholder="请选择船舶类型" class="form-select">
            <el-option label="船舶类型一" value="shanghai"></el-option>
            <el-option label="船舶类型二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="船舶高度: ">
          <div class="box-input">
            <el-input v-model="formLabelAlign.shipLong"  class="form-input"></el-input>
             <span>长度：</span>
            <el-input v-model="formLabelAlign.shipLong"  class="form-input"></el-input>
            <span>m/米</span>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer bottom">
        <el-button type="primary"   @click="addConfirm">添加</el-button>
        <el-button   @click="removeConfirm">取 消</el-button>
      </span>
    </el-dialog>

    <!--这个是点击修改进行确认之后的弹框的样式-->
    <div class="checkBoxInformation" v-if="checkBoxInformation">
      <div class="checkBoxInformation_icon">
        <div>
          <i class="el-icon-close" @click="deleteBox"></i>
        </div>
      </div>
      <div class="checkBoxInformation_img">

      </div>
      <div class="checkBoxInformation_content">
        <h3>添加成功</h3>
        <p>稍后可以在船舶页面进行查看</p>
      </div>
      <el-button type="primary" class="confirm_button" @click="deleteBox">确认</el-button>
  </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        checkBoxInformation:false,
        checkBoxInformation1:false,
        visible: this.show,//监控弹框显示/隐藏
        title:'新增信息',
        addDel:true,//控制增删改查的表单显示
        labelPosition: 'right',//默认表单对齐方式
        formLabelAlign: {
          shipNumber: '',//船号
          shipType: '',//船舶类型
          shipLong:'',//船舶长度
          shipDeep:'',//船舶高度
          shipNum:'',//船舶呼号
          mmsiCode:'',//mmsi号码
          iomCode:''//iom号码
        }
      };
    },
    methods:{
      addConfirm(){
        this.show=false
        this.checkBoxInformation=true
      },
      removeConfirm(){
        this.show=false
      },
      deleteBox(){
        this.checkBoxInformation=false
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
        // console.log(this.title)
        // console.log(this.title === '添加船舶')
        if(this.title === '添加船舶'){
          this.formLabelAlign.shipNumber='';
          this.formLabelAlign.shipType='';
          this.formLabelAlign.shipLong='';
          this.formLabelAlign.shipDeep='';
          this.formLabelAlign.shipNum='';
          this.formLabelAlign.mmsiCode='';
          this.formLabelAlign.iomCode='';
        }
      }
    }
  };
</script>

<style scoped>

</style>
<style>
  .elastic-box>:nth-child(1){
    background-color: rgb(78,125,230);
  }
  .elastic-box>:nth-child(2) > form > div{
    margin-bottom: 10px;
  }
  .form-input .el-input__inner {
    width: 80%;
    height: 30px;
    background-color: rgb(247,247,247);
    border-radius: 30px;
    display: inline-block;
  }

  .box-input >div{
    width: 100px;
  }
  .box-textarea >div{
    width: 300px;
  }
  .bottom >button{
    border-radius: 40px;
  }
  .form-select .el-input__inner{
    height: 30px;
    background-color: rgb(247,247,247);
    border-radius: 30px;
    display: inline-block;
  }
  .form-select {
    width: 80%;
  }


  /*删除信息确认框*/
  .checkBoxInformation{
    background-color: white;
    border-radius:10px ;
    width: 390px;
    height: 340px;
    position: fixed;
    top: 50%;
    margin-top: -170px;
    left: 50%;
    margin-left: -195px;
    z-index:999;
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-around;
  }
  .checkBoxInformation_icon{
    width: 100%;
  }
  .checkBoxInformation_icon>div{
    font-size: 20px;
    text-align:right;
    margin-right: 10px
  }
  .checkBoxInformation_img{
    width:80px;
    height:80px;
    background-color: rgb(44,100,228);
  }
  .checkBoxInformation_content{
    width: 100%;
  }
  .checkBoxInformation_content h3{
    width: 100%;
    text-align: center;
    color: rgb(44,100,228);
  }
  .checkBoxInformation_content p{
   margin-top:30px;
    width: 100%;
    text-align: center;
    color:rgb(153,153,153);
  }
  .confirm_button{
    margin-bottom: 30px;
    background-color: rgb(44,100,228);
  }

</style>
