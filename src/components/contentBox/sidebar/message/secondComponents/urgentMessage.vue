<template>
  <div class="normalMessage">

    <div class="publicMessage" v-for="(value,item) in publicMessage" @click="yan(item)">
      <el-row>
        <el-col :span="4">
          <div class="grid-content publicMessage_img">
            <img :src=value.img>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content publicMessage_content">
            <p>{{value.typeMessage}}</p>
            <p>{{value.messageContent}}</p>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content publicMessage_footer">
            <p><span>1</span></p>
            <p>{{value.messageTime}}</p>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  export default {
    name: "urgentMessage",
    data(){
      return{
        publicMessage:[
          {
            img:require("@/assets/public/img/header_left.png"),
            typeMessage:"系统提示",
            messageContent:"台风“木恩”于10月25日登录海南",
            messageTime:"2019.10.17  12:20"
          },
          {
            img:require("@/assets/public/img/header_left.png"),
            typeMessage:"警报消息",
            messageContent:"台风“木恩”于10月25日登录海南",
            messageTime:"2019.10.17  12:20"
          },
          {
            img:require("@/assets/public/img/header_left.png"),
            typeMessage:"系统",
            messageContent:"台风“木恩”于10月25日登录海南",
            messageTime:"2019.10.17  12:20"
          }
        ]
      }
    },
    methods:{
      yan(item){//用户点击每一条的数据的时候，将数据进行显示到对应的页面
        this.$router.push({path:"/contentBox/messageDetails",query:{
            img:"@/assets/public/img/header_left.png",
            typeMessage:this.publicMessage[item].typeMessage,
            messageContent:this.publicMessage[item].messageContent,
            messageTime:this.publicMessage[item].messageTime
          }});
      }
    }
  }
</script>

<style scoped>
  .normalMessage{
    width: 100%;
    height: 100%;
  }
  /*页面中的条目的元素*/
  .publicMessage{
    width: 100%;
    height:60px;
    overflow: hidden;
    background-color:lightgrey;
    margin-top: 2px;
  }
  .publicMessage:hover{
    background-color: lightblue;
  }
  .publicMessage_img img{
    width: 60px;
    height: 60px;
  }
  /*将页面内的元素撑开到100%*/
  .el-row,.el-col{
    height: 100%;
  }
  .publicMessage_content p{
    width: 100%;
  }
  .publicMessage_content{
    display: flex;
    flex-wrap: wrap;
    align-content:space-around ;
    height: 100%;
    width: 100%;
  }
  .publicMessage_content p:nth-of-type(1){
    color: rgb(104,124,223);
    font-size: 16px;
    font-weight: 600;
  }
  .publicMessage_footer{
    display: flex;
    align-content: space-around;
    flex-wrap: wrap;
    height: 100%;
  }
  .publicMessage_footer p{
    width: 100%;
    text-align: right;
  }
  .publicMessage_footer p:nth-of-type(1) span{
    display: inline-block;
    height: 20px;
    width: 20px;
    background-color: red;
    border-radius: 100%;
    text-align: center;
    line-height: 20px;
  }
</style>

