<template>
  <div>
    <!--页面中的table表格的地方-->
    <table-components :normalMessage="commonData"></table-components>
  </div>
</template>

<script>
  import tableComponents from "../../../../../../components/contentBox/sidebar/messageManagement/getmessage/secondComponents/common_table.vue"
  export default {
    name: "publicMessage",
    data(){
      return{
        //是否显示删除的按钮
        showDeleteButton:false,
        //是否显示弹出框
        showDiv:false,
        commonData:[
          {
            id:1,
            sendPeople: '工作人员',
            title: '台风来袭',
            messageType: '公共消息',
            messageTime:"2019-10-12 16:00",
            messageState:"已收到"
          },
          {
            id:2,
            sendPeople: '管理员',
            title: '台风来袭',
            messageType: "公共消息",
            messageTime:"2019-10-10 11:30",
            messageState:"已收到"
          },
          {
            id:3,
            sendPeople: '管理员',
            title: '巡视',
            messageType: '公共消息',
            messageTime:"2019-10-09 12:00",
            messageState:"已失效"
          },
          {
            id:4,
            sendPeople: '工作人员',
            title: '台风来袭',
            messageType: '公共消息',
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


