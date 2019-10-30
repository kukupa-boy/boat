<template>
    <div id="getMessage">
      <el-form class="getMessage_header" >
        <el-input placeholder="请输入设备名称...">
          <i slot="suffix" class="el-icon icon-15"></i>
        </el-input>
        <el-form-item label="消息类型" label-width="70px">
          <!--selectItem是被选中的时候触发的事件（@change）-->
          <el-select  v-model="drop.region" placeholder="请选择消息类型" @change="selectItem">
            <el-option v-for="(value,index) in drop.data" :label=value.label :value=value.value ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <normal-message v-if="normalFlag"></normal-message>
      <public-message v-if="publicFlag"></public-message>
      <warn-message v-if="warnFlag"></warn-message>
      <urgent-message v-if="urgentFlag"></urgent-message>
    </div>
</template>

<script>
  import normalMessage from "../../../../../components/contentBox/sidebar/messageManagement/getmessage/secondComponents/normalMessage.vue"
  import publicMessage from "../../../../../components/contentBox/sidebar/messageManagement/getmessage/secondComponents/publicMessage.vue"
  import warnMessage from "../../../../../components/contentBox/sidebar/messageManagement/getmessage/secondComponents/warnMessage.vue"
  import urgentMessage from "../../../../../components/contentBox/sidebar/messageManagement/getmessage/secondComponents/urgentMessage.vue"
    export default {
        name: "getMessage",
      data() {
        return {
          //页面中下拉框的数据的设置
          drop:{
            data:[
              {
                label:"普通消息",
                value:"normalMessage"
              },
              {
                label:"紧急消息",
                value:"urgentMessage"
              },
              {
                label:"公告消息",
                value:"publicMessage"
              },
              {
                label:"警报消息",
                value:"warnMessage"
              },
            ],
            region:"公告消息",
            input3:"",
          },
          normalFlag:false,
          publicFlag:true,
          warnFlag:false,
          urgentFlag:false
        }
      },
      methods: {
          //选择不同的消息类型,给不同的页面
        selectItem(index){//index代表下拉框的第几个(string值)
          this.$nextTick(function(){
            if(index==="normalMessage"){
              this.normalFlag=true;
              this.publicFlag=false;
              this.warnFlag=false;
              this.urgentFlag=false;
            }else if(index==="urgentMessage"){
              this.normalFlag=false;
              this.publicFlag=false;
              this.warnFlag=false;
              this.urgentFlag=true;
            }else if(index==="publicMessage"){
              this.normalFlag=false;
              this.publicFlag=true;
              this.warnFlag=false;
              this.urgentFlag=false;
            }else if(index==="warnMessage"){
              this.normalFlag=false;
              this.publicFlag=false;
              this.warnFlag=true;
              this.urgentFlag=false;
            }
          })
        },
      },
      components:{
        normalMessage,
        publicMessage,
        warnMessage,
        urgentMessage
      }
    }
</script>

<style scoped>
  /*字体图标文件*/
  @import '../../../../../assets/public/icomoon/style.css';
  /*引入公共样式*/
  #getMessage{
    padding: 20px;
    box-sizing: border-box;
  }
  .getMessage_header .el-input{
    width: 21%;
  }
  .getMessage_header>>>.el-input__inner{
    border-radius: 20px;
  }
  .getMessage_header .el-select{
    box-sizing: border-box;
  }
  .getMessage_header .el-form-item{
    width: 35%;
    display: inline-block;
    margin-left: 10%;
  }
  .getMessage_header .el-form-item__label{
    text-align: right;
  }
  #getMessage{
    width:100%;
    height: 100%;
    position: relative;
  }
  .getMessage_header{
    padding-left: 15px;
    padding-top: 15px;
    font-size: 18px;
    font-weight: 600;
    color: rgb(104,124,223);
    box-sizing: border-box;
  }
  .getMessage_header i{
    font-size:20px ;
    display: inline-block;
    margin-top: 45%;
    position: relative;
    right: 30%;
  }
  .getMessage_table{
    padding-left: 15px;
    padding-right: 15px;
  }
</style>












