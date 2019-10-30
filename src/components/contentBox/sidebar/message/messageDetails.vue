<template>
  <div id="message">
    <div class="message_inner">
     <div class="message_sidebar">
        <div class="message_item" v-for="(value,index) in sidebarData" :key="index">
          <div class="message_itemImage">
            <img :src=value.img>
          </div>
          <div class="message_itemDetail">
            <h3>{{value.name}}</h3>
            <p>{{value.content | messagePDeal}}</p>
          </div>
        </div>
     </div>
      <div class="message_content">
          <div class="messageContent_header">
            <div>
              <img src="@/assets/public/img/header_left.png"><span>系统提示</span>
            </div>
          </div>
          <div  class="messageContent_content">
            <div class="messageContent_contentInner">
              <h2>2019年第21号台风“博罗依”多少级</h2>
              <p style="color: rgb(114,139,222);">|2019年第21号台风“博罗依”多少级</p>
              <p>|10月20日造成5点钟 热带风暴</p>
              <p>0月20日造成5点钟距离日本冲绳县那霸市偏南方向约315公里，就是北纬11.3度、东经152.0度
                中心附近最大风力有9级（23米/秒），中心最低气压为992百帕，七级风圈半径120-230公里。
              </p>
              <div class="messageContent_news">
                  <h2 style="color: rgb(215,16,12);">台风快讯</h2>
                  <div>2019年总1245期</div>
                  <div style="border-bottom: 2px solid rgb(215,16,12);padding-right: 5%;padding-left: 5%;box-sizing: border-box"><span>中国气象局中央电视台</span><span>10月20日09时11分</span></div>
                  <p><span>时间：</span><span>20日06时</span></p>
                  <p><span>命名：</span><span>“博罗依”，BUALON</span></p>
                  <p><span>编号：</span><span>1921号</span></p>
                  <p style="color: rgb(215,16,12);"><span>中心位置：</span><span>北纬11.4度、东经151.5度</span></p>
                  <p style="color: rgb(215,16,12);"><span>强度等级：</span><span>热带风暴</span></p>
                  <p style="color: rgb(215,16,12);"><span>最大风力：</span><span>9级，23米/秒（约83公里/小时）</span></p>
                  <p><span>中心气压：</span><span>992 hpa</span></p>
                  <p><span>参考位置：</span><span>距离美国关岛东偏南方向约760公里</span></p>
                  <p><span>风圈半径：</span><span>七级风圈半径 东北方向230公里；东南方向200公里；西南方向120公里；西北方向80公里</span></p>
                  <p><span>预报结论：</span><span>“博罗依”将以每小时19公里左右的速度向西偏北方向移动，强度逐渐增强（下次更新时间为20日14时30分）</span></p>
              </div>
            </div>
          </div>
      </div>

    </div>
  </div>
</template>
<script>
  export default{
    name: "messageDetails",
    data(){
      return{
        //这个是存放路由传递过来的参数的地方
        routerParam:[],
        sidebarData:[
          {
            img:require("@/assets/public/img/header_left.png"),
            name:"系统警报",
            content:"台风将于什么什么时候进行登录"
          }
        ]
      }
    },
    created(){
      //获取到路由的参数
      this.routerParam=this.$route.query;
      console.log(this.routerParam)
    },
    methods:{

    },
    //将侧边栏的文字进行过滤处理
    filters:{
      messagePDeal(data){
        console.log(data)
        var a=data.substring(0,4)+"....";
        return a;
      }
    },
    watch:{

    }
  }
</script>

<style>
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
    /*height: 83.4%;*/
    /*width: 74%;*/
    height: 100%;
    width: 100%;
    background-color: white;
    display: flex;
  }
  .message_sidebar{
    width: 320px;
    height: 100%;
    overflow: scroll;
  }
  /*设置滚动条的样式*/
  /*滚动条样式*/
  .message_sidebar::-webkit-scrollbar {/*滚动条整体样式*/
    width: 1px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .message_sidebar::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  .message_sidebar::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }

  .message_content{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

  }
  .message_item{
    height: 9%;
    width: 100%;
    display: flex;
    background-color: #d7d7d7;
    cursor: pointer;
    /*min-width: 200px;*/
    /*min-height:60px ;*/
  }
  .message_item{
    margin-bottom: 2px;
  }
  .message_itemImage{
    flex: 3;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .message_itemImage img{
    width: 40px;
    height: 40px;
  }
  .message_itemDetail{
    flex: 7;
    display: flex;
    flex-direction: column;
  }
  .message_itemDetail h3{
    flex: 5;

    display: flex;
    align-items: center;
    padding-left: 5%;
    color: rgb(68,100,224);
  }
  .message_itemDetail p{
    flex: 5;
    padding-left: 5%;
    display: flex;
    align-items: center;
    word-spacing: 2px;
    letter-spacing: 2px;
  }
  .messageContent_header{
    height:9%;
    margin-bottom: 2px;
    display: flex;
    align-items: center;
  }
  .messageContent_content{
    width: 100%;
    height: 91%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .messageContent_header>div{
    width: 20%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .messageContent_header img{
    width: 45px;
    height: 45px;
  }
  .messageContent_header span{
    vertical-align: middle;
    color: rgb(104,123,223);
    font-size: 15px;
    font-weight: 700;
  }
  .messageContent_contentInner{
    overflow-y: scroll;
    overflow-x: scroll;
    min-width: 700px;
    min-height: 450px;
    width: 85%;
    height: 90%;
    flex-direction:column;
    display: flex;
    justify-content: space-between;
  }
  .messageContent_contentInner>h2{
    width: 100%;
    text-align: center;
  }
  .messageContent_contentInner>p:nth-of-type(1){
    font-size: 18px;
  }
  .messageContent_contentInner>p:nth-of-type(1),.messageContent_contentInner>p:nth-of-type(2){
    text-align: center;
  }
  .messageContent_contentInner>p:nth-of-type(3){
    width: 90%;
    margin: 0 auto;
  }
/*  小文章的排版*/
  .messageContent_news{
    width: 70%;
    height: 70%;
    margin: 0 auto;
    display: flex;
    background-color: rgb(240,240,240);
    flex-direction: column;
    justify-content: space-around;
    /*padding-top:5% ;*/
    padding-bottom: 2%;
  }
  .messageContent_news>h2{
    text-align: center;
  }
  .messageContent_news>div:nth-of-type(1){
    text-align: center;

  }
  .messageContent_news>div:nth-of-type(2){
    display: flex;
    justify-content: space-between;
  }
  .messageContent_news>p{
    display: flex;
  }
  .messageContent_news>p>span:nth-of-type(1){
    flex: 2;
    text-align: right;
  }
  .messageContent_news>p>span:nth-of-type(2){
    flex: 8;
    padding-left: 5%;
    padding-right: 5%;
    box-sizing: border-box;
  }

</style>
