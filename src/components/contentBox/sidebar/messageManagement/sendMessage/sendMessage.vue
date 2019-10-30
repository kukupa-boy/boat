<template>
  <div id="sendMessage">
    <p class="sendMessage_header" style="text-align: center">编辑消息</p>
    <!--这个是放置接受消息的表格的地方-->
    <div class="sendMessage_form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="消息类型">
          <el-select v-model="drop.region" @change="selectItem" >
            <el-option v-for="(value,index) in drop.data" :label=value.label :value=value.value1 ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息标题" class="message_type">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="消息内容">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>

        <el-form-item label="消息对象">
          <el-select  v-model="value1" multiple filterable :filter-method="dataFilter" @change="selectItem1" >
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item class="lastButton">
          <div>
            <el-button type="primary" @click="onSubmit" round>确认发送</el-button>
            <el-button  round>取消发送</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <!--这个是消息的弹出框 -->
    <div class="checkBoxInformation" v-if="checkBoxInformation">
      <div class="checkBoxInformation_icon">
        <div>
          <i class="el-icon-close"  @click="confirmOk"></i>
        </div>
      </div>
      <div class="checkBoxInformation_img">
          <i class="icon-2"></i>
      </div>
      <div class="checkBoxInformation_content">
        <h3>添加成功</h3>
        <p>稍后可以在消息页面进行查看</p>
      </div>
      <el-button type="primary" class="confirm_button" @click="confirmOk" >确认</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "sendMessage",
      data() {
        return {
          //下拉框中的值
          drop: {
            data: [
              {
                label: "普通消息",
                value1: "normalMessage"
              },
              {
                label: "紧急消息",
                value1: "urgentMessage"
              },
              {
                label: "公告消息",
                value1: "publicMessage"
              },
              {
                label: "警报消息",
                value1: "warnMessage"
              },
            ],
            region:"公告消息",
          },
          //是否进行显示隐藏弹出
          //发送消息下拉框中的值
          oldOptions: [],
          optionsCopy: [
            {
              value: 'ALL_SELECT',
              label: '全部'
            },
            {
              value: '1',
              label: '小陈'
            },
            {
              value: '2',
              label: '小文'
            }, {
              value: '3',
              label: '小何'
            },
            {
              value: '4',
              label: "小雨"
            },
            {
              value: '5',
              label: '小彭'
            }],
          options: [
            {
              value: 'ALL_SELECT',
              label: '全部'
            },
            {
              value: '1',
              label: '小陈'
            },
            {
              value: '2',
              label: '小文'
            },
            {
              value: '3',
              label: '小何'
            },
            {
              value: '4',
              label: '小雨'
            },
            {
              value: '5',
              label: '小彭'
            }],
          //选中的value值会放入到这个里面
          value1: [],

          checkBoxInformation:false,
          //多选框的data
          checkAll: false,
          isIndeterminate: true,
          form: {
            name: '',
            region:{
              type:"警告消息",
              object:"消息对象"
            },
          }
        }
      },
      methods: {
        //选择下拉框选中的函数
        selectItem(index){
          console.log(index)
        },
        onSubmit() {
          this.checkBoxInformation=true
        },
        confirmOk(){
          this.checkBoxInformation=false
        },
        //下拉框中的函数
        handleCheckAllChange(val) {
          this.checkedCities = val ? cityOptions : [];
          this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.cities.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        //下拉多选框中的函数
        dataFilter(val) {
          if (val) {
            this.options = this.optionsCopy.filter((item) => {
              // console.log(val)
              // if(item.label.indexOf(val)==="ALL_SELECT"){
              //   return true
              // }
              if (!!~item.label.indexOf(val) || !!~item.label.toUpperCase().indexOf(val.toUpperCase())) {
                return true
              }
            })
            this.options.unshift({
              value: 'ALL_SELECT',
              label: '全部'
            })
            console.log(this.options)
          } else { //val为空时，还原数组
            this.options = this.optionsCopy;
          }
        },
        selectItem1(val) {//val是多选框中的选中的数据的集合
          const allValues = [];
          // 保留所有值
          for (const item of this.options) {
            allValues.push(item.value)
          }
          // 用来储存上一次的值，可以进行对比
          const oldVal = this.oldOptions.length === 1 ? this.oldOptions[0] : [];
          // 若是全部选择
          if (val.includes('ALL_SELECT')) {


            this.value1 = allValues;
          }
          // 取消全部选中 上次有 当前没有 表示取消全选
          if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
            this.value1 = []
          };
          // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
          // 新老数据都有全部选中
          if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
            const index = val.indexOf('ALL_SELECT');
            val.splice(index, 1); // 排除全选选项
            this.value1 = val
          }
          // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
          if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
            if (val.length === allValues.length - 1) this.value1 = ['ALL_SELECT'].concat(val)
          }
          // 储存当前最后的结果 作为下次的老数据
          this.oldOptions[0] = this.value1;
        },
      }
    }
</script>

<style scoped>
  /*字体图标文件*/
  @import '../../../../../assets/public/icomoon/style.css';
  #sendMessage{
    width:100%;
    height: 100%;
    position: relative;
  }
  .sendMessage_header{
    padding: 15px;
    font-size: 18px;
    font-weight: 600;
    color: rgb(104,124,223);
    box-sizing: border-box;
  }
  .sendMessage_form{
    height: 80%;
    width: 80%;
    margin: 0 auto;
  }
 .el-select {
    width: 100%;
   border-radius: 10px;
  }
  .el-select>>>.el-input__inner,.el-input>>>.el-input__inner{
    border-radius: 20px;
  }
  .el-textarea{
    height: 200px;
  }
  .el-textarea>>>.el-textarea__inner{
    height: 200px;
  }
  .lastButton div{
    float: right;
    margin-right: 5%;
  }
  .el-form-item{
    margin-top: 4%;
  }
/*  弹出框*/
  /*删除信息确认框*/
  .checkBoxInformation{
    background-color:lightgrey;
    border-radius:10px ;
    width: 390px;
    height: 340px;
    position:absolute;
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
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
  }
  .checkBoxInformation_img i{
    font-size: 55px;
    color: white;
    font-weight: 900;
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























