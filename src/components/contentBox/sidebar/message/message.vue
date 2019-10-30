<template>
  <div id="message">
    <div class="message_inner">
      <p class="message_header">
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="input1">
        </el-input>
      </p>
      <div class="message_content">
        <el-tabs v-model="activeName" @tab-click="handleClick" >
          <el-tab-pane label="公告消息" name="first">
            <public-message></public-message>
          </el-tab-pane>
          <el-tab-pane label="警报消息" name="second">
            <warn-message></warn-message>
          </el-tab-pane>
          <el-tab-pane label="紧急消息" name="third">
            <urgent-message></urgent-message>
          </el-tab-pane>
          <el-tab-pane label="普通消息" name="fourth">
            <normal-message></normal-message>
          </el-tab-pane>
        </el-tabs>
      </div>
<!--      <transition>-->
<!--        <router-view></router-view>-->
<!--      </transition>-->
    </div>
  </div>
</template>

<script>
  import normalMessage from '@/components/contentBox/sidebar/message/secondComponents/normalMessage.vue'
  import publicMessage from '@/components/contentBox/sidebar/message/secondComponents/publicMessage.vue'
  import urgentMessage from '@/components/contentBox/sidebar/message/secondComponents/urgentMessage.vue'
  import warnMessage from '@/components/contentBox/sidebar/message/secondComponents/warnMessage.vue'
    export default {
        name: "message",
      data() {
        return {
          input1:"",
          activeName: 'second',
          itemsData:{

          }
        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        }
      },
      components:{
        normalMessage,
        publicMessage,
        urgentMessage,
        warnMessage,
      }
    }
</script>

<style scoped>
  #message{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(240,240,240);
    padding: 20px 6%;
    box-sizing: border-box;
  }
  .message_inner{
    height: 100%;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    border-radius: 10px;
  }
  .message_header{
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    padding-left: 5%;
    box-sizing: border-box;
  }
  .message_header .el-input{
    width: 40%;
    height: 30px;
    border-radius: 20px;
  }
  .message_header>>>.el-input__inner{
    /*height: 30px;*/
    border-radius: 20px;
  }
  .message_content{
    width: 90%;
    margin: 0 auto;
    margin-top: 1%;
  }
  .message_content>>>.el-tabs__nav-scroll{
    border: none;
  }

</style>




