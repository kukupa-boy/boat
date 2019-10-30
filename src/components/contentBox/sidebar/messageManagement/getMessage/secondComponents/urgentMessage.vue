<template>
  <div>
    <!--页面中的table表格的地方-->
    <table-components :normalMessage="urgentData" ></table-components>
  </div>
</template>

<script>
  import tableComponents from "../../../../../../components/contentBox/sidebar/messageManagement/getmessage/secondComponents/common_table.vue"
  export default {
    name: "urgentMessage",
    data(){
      return{
        urgentData:[
          {
            id:1,
            sendPeople: '工作人员',
            title: '台风来袭',
            messageType: '紧急消息',
            messageTime:"2019-10-12 16:00",
            messageState:"已收到"
          },
          {
            id:2,
            sendPeople: '管理员',
            title: '台风来袭',
            messageType: "紧急消息",
            messageTime:"2019-10-10 11:30",
            messageState:"已收到"
          },
          {
            id:3,
            sendPeople: '工作人员',
            title: '台风来袭',
            messageType: '紧急消息',
            messageTime:"2019-10-12 16:00",
            messageState:"已收到"
          },
          {
            id:4,
            sendPeople: '管理员',
            title: '台风来袭',
            messageType: "紧急消息",
            messageTime:"2019-10-10 11:30",
            messageState:"已收到"
          },
          {
            id:5,
            sendPeople: '工作人员',
            title: '台风来袭',
            messageType: '紧急消息',
            messageTime:"2019-10-12 16:00",
            messageState:"已收到"
          },
          {
            id:6,
            sendPeople: '工作人员',
            title: '台风来袭',
            messageType: '紧急消息',
            messageTime:"2019-10-12 16:00",
            messageState:"已收到"
          },
          {
            id:7,
            sendPeople: '管理员',
            title: '台风来袭',
            messageType: "紧急消息",
            messageTime:"2019-10-10 11:30",
            messageState:"已收到"
          },
          {
            id:8,
            sendPeople: '工作人员',
            title: '台风来袭',
            messageType: '紧急消息',
            messageTime:"2019-10-12 16:00",
            messageState:"已收到"
          }
        ],
      }
    },
    methods: {
    },
    components:{
      tableComponents
    }
  }
</script>

<style scoped>
  @import "../../../../../../assets/public/css/getMessage.css";
  div{
    width: 100%;
    height: 100%;
  }
</style>


