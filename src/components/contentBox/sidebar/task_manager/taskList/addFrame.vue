<template>
  <el-dialog
    title='添加任务'
    :visible.sync="centerDialogVisible"
    :modal="false"
    width="60%"
    custom-class="elastic-box5"
    @close="$emit('update:show', false)"
    center>
    <el-form  :label-position="labelPosition" class="inputtttt" label-width="180px" :model="formLabelAlign">
      <el-form-item label="任务名称: ">
        <el-input  v-model="formLabelAlign.taskName"  class="form-input5"></el-input>
      </el-form-item>
      <el-form-item label="任务类型: ">
        <!--<el-input  v-model="formLabelAlign.entryIntoForceTime" class="form-input"></el-input>-->
        <el-select v-model="value1" placeholder="请选择" class="input5">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务周期: ">
        <!--<el-input  v-model="formLabelAlign.failureTime" class="form-input"></el-input>-->
        <el-select v-model="value2" placeholder="请选择周期" class="input5">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务描述: ">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          class="textarea-input"
          v-model="formLabelAlign.taskDescription">
        </el-input>
      </el-form-item>
      <el-form-item label="选择作业人员: " class="person">
        <div  v-model="formLabelAlign.operationPersonnel" @click="dialogVisible =true" class="button" >
          <span class="el-icon-plus add-2" @click="dialogVisible =true"></span>
        </div>
      </el-form-item>
      <el-form-item label="生效时间: ">
        <div class="box-input">
          <!--<el-input v-model="formLabelAlign.entryIntoForceTime"  class="form-input"></el-input>-->
          <el-date-picker
            v-model="value3"
            type="datetime"
            class="input5"
            placeholder="选择日期时间">
          </el-date-picker>
          <span>失效时间：</span>
          <!--<el-input v-model="formLabelAlign.failureTime" class="form-input"></el-input>-->
          <el-date-picker
            v-model="value4"
            type="datetime"
            class="input5"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">提交</el-button>
      </span>
    <!--第二层弹框-->
    <el-dialog
      title="选择作业人员"
      :visible.sync="dialogVisible"
      :modal="false"
      width="40%"
      custom-class="elastic-box5"
      center>
      <!--这是复选框-->
      <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      ref="tree"
      :default-expanded-keys="[2, 3]"
      style='margin:0 30% '
     >
        <!--:default-checked-keys="[5]"默认选中-->
    </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getCheckedNodes">确 定</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
    const cityOptions = ['小邓', '小白', '小刘'];
    export default {
        name: "addFrame",
        data(){
          return{
            centerDialogVisible: this.show,//监控弹框显示/隐藏
            dialogVisible:false,//控制第二层弹框显示
            labelPosition: 'right',//默认表单对齐方式
            textarea:'',//任务描述
            formLabelAlign: {
              SerialNum:'',//工号
              taskName:'',//任务名称
              entryIntoForceTime:'',//生效时间
              failureTime:'',//失效时间
              taskType:'',//任务类型
              operationPersonnel:'',
              taskDescription:'',//任务描述
              taskCycle:'',//任务周期
              creationTime:'',//创建时间
              distributor:'',//分发人员
            },
            value1:'',//任务周期的绑定
            //周期
            options1: [
              {
              value: '选项1',
              label: '每天两次'
            }, {
              value: '选项2',
              label: '两天一次'
            }],
            value2: '',//任务周期的绑定
            //任务类型
            options: [
              {
              value: '选项1',
              label: '普通任务'
            }, {
              value: '选项2',
              label: '特殊任务'
            }, {
              value: '选项3',
              label: '紧急任务'
            }],
            value: '',
            //复选框
            data: [
              {
              id: 1,
              label: '全选',
              children: [{
                id: 3,
                label: '电气运行专责',
                children: [{
                  id: 4,
                  label: '电气运行专员',
                  children:[
                    {
                      id: 8,
                      label: '小刘',
                    },
                    {
                      id: 9,
                      label: '小张',
                    },
                    {
                      id: 10,
                      label: '小李',
                    }
                  ]
                }, {
                  id: 5,
                  label: '电气管理专员',
                  // disabled: true
                }]
              }, {
                id: 2,
                label: '设备运行专责',
                // disabled: true,
                children: [{
                  id: 6,
                  label: '设备管理专员'
                }, {
                  id: 7,
                  label: '设备运行专员',
                  // disabled: true
                }]
              }]
            }],
            value3:'',//生效时间
            value4:'',//失效时间
            defaultProps: {
              children: 'children',
              label: 'label'
            }
            // checkAll: false,
            // checkedCities: ['上海', '北京'],
            // cities: cityOptions,
            // isIndeterminate: true
          }
        },
        props: {
          show: {
            type: Boolean,
            default: false
          },
          },
      watch: {
        show () {
          this.centerDialogVisible = this.show;
        }
      },
      methods: {
        //作业人员弹框选择的数据显示
        getCheckedNodes() {
          let rad='';
          let ridsa = this.$refs.tree.getCheckedKeys().join(','); // 获取当前的选中的数据[数组] -id, 把数组转换成字符串
          let ridsb = this.$refs.tree.getCheckedNodes(); // 获取当前的选中的数据{对象}
          ridsb.forEach(ids=>{//获取选中的所有的父级id
            rad+=','+ids.pid
          })
          rad=rad.substr(1) // 删除字符串前面的','
          let rids=rad+','+ridsa
          let arr=rids.split(',')//  把字符串转换成数组
          arr=[...new Set(arr)]; // 数组去重
          rids=arr.join(',')// 把数组转换成字符串
          console.log(rids)
          this.dialogVisible =false;
        },
      }
    }
</script>
<style scoped>
  .box-input >div{
    width: 24%;
    margin-right: 10%;
  }
  .form-input5{
    width: 24%;
    /*border: 1px solid red;*/
    position: relative;
  }

  .inputtttt >div{
    margin-bottom: 40px;
  }
    /*//作业人员的点击*/
  .person{
    position: relative;
    /*width: 30%;*/
  }
  .person  span{
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 15px;
    text-align: center;
    line-height: 20px;
    border-radius: 20px;
    color: #2c64e4;
    border: 2px solid #2c64e4;
  }
  .div{
    display: block;
    margin-left: 60px;
  }
  .button{
    width: 24%;
    height: 30px;
    line-height: 30px;
    text-align: right;
    background-color: rgb(247,247,247);
    border: 1px solid white;
    border-radius: 30px;
    position: relative;
  }
</style>
<style>
  .elastic-box5>div:nth-child(1){
    color: white;
    background-color: rgb(78,125,230);
  }
  .elastic-box5>div:nth-child(1) >span{
    color: white;
  }
  .form-input5 .el-input__inner {
    width: 100%;
    height: 30px;
    border-radius: 100px;
    background-color: rgb(247,247,247);
    display: inline-block;
  }
  .input5 .el-input__inner{
    background-color: rgb(247,247,247);
    height: 30px;
    border-radius: 40px;
  }
  .textarea-input .el-textarea__inner{
    background-color: rgb(247,247,247);
  }
</style>
