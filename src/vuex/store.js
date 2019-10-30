
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//state对象主要是储存数据
  var state={
    //这个是首页的header和slider组件之间的联系和传值
    sliderFlag:true,
    count:1,
    screenHeight:"",
    isCollapse: false,//这个用来重绘图表
  //  这个是用户的登录信息
    userInfomation:{
      name:"",
      detail:""
    }
  }
//mutations主要是为了该bainstate里面的数据值
  var mutations={
    changeHeadName(state,name){//第一个对象必须是state，你也可以写这个参数，但是第一个参数必须是state
      state.headerName=name
    },
    commitCollapse(state, bool) {
      state.isCollapse = bool;
    }
  }
//实例化vuex.store
const store=new Vuex.Store({
  state,
  mutations
})
export default  store;
