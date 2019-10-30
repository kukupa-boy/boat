
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//--------------------------------------------------用户管理------------------------------------------------------------
import person_t from '../router/person_manager/router_t.js'
// import person_l from '../router/person_manager/router_l.js'
var boatRouter= new Router({
  routes: [
    //app默认的页面()
    {
      path: '/',
      name: 'app',
      redirect: "/login"
    },
    //登录
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login.vue'),
      meta: {
        auth: false
      }
    },
    //页面的content的内容的部分
    {
      path: '/contentBox',
      name: 'contentBox',
      component: () => import('@/components/contentBox/contentBox.vue'),
      redirect: "/contentBox/chartManagement/shipManagerMent",
      meta: {
        auth: true,
        keep: true
      },
      children: [
        //气象路由
        {
          // 气象的路由的配置
          path: 'weatherReport',
          name: 'weatherReport',
          component: () => import ('@/components/contentBox/sidebar/weatherReport/weatherReport.vue'),
          redirect: 'weatherReport/defaultComponents',
          children: [
            //   //气象路由
            {
              path: 'defaultComponents',
              name: 'defaultComponents',
              component: () => import ('@/components/contentBox/sidebar/weatherReport/defaultComponents/defaultComponents.vue'),
            },
            {
              path: 'airPressure',
              name: 'airPressure',
              component: () => import ('@/components/contentBox/sidebar/weatherReport/airPressure/airPressure.vue'),
              // component: airPressure,
            },
            {
              path: 'haze',
              name: 'haze',
              component: () => import ('@/components/contentBox/sidebar/weatherReport/haze/haze.vue'),
              // component: haze,
            },
            {
              path: 'humidity',
              name: 'humidity',
              component: () => import ('@/components/contentBox/sidebar/weatherReport/humidity/humidity.vue'),
              // component: humidity,
            },
            {
              path: 'precipitation',
              name: 'precipitation',
              component: () => import ('@/components/contentBox/sidebar/weatherReport/precipitation/precipitation.vue'),
              // component: precipitation,
            },
            {
              path: 'temperature',
              name: 'temperature',
              component: () => import ('@/components/contentBox/sidebar/weatherReport/temperature/temperature.vue'),
              // component: temperature,
            },
            {
              path: 'thunder',
              name: 'thunder',
              component: () => import ('@/components/contentBox/sidebar/weatherReport/thunder/thunder.vue'),
              // component: thunder,
            },
            {
              path: 'visibility',
              name: 'visibility',
              component: () => import ('@/components/contentBox/sidebar/weatherReport/visibility/visibility.vue'),
              // component: visibility,
            },
            {
              path: 'waveHeight',
              name: 'waveHeight',
              component: () => import ('@/components/contentBox/sidebar/weatherReport/waveHeight/waveHeight.vue'),
              // component: waveHeight,
            },
            {
              path: 'windDirection',
              name: 'windDirection',
              // component: windDirection,
              component: () => import ('@/components/contentBox/sidebar/weatherReport/windDirection/windDirection.vue'),
            }
          ],
        },
        //船舶路由
        {
          // 船舶的路由的配置
          path: 'boat_list',
          name: 'boat_list',
          component: () => import ('@/components/contentBox/sidebar/shipManagerment/my_boat/boat_list.vue'),
        },
        //这个是船舶出海条件的路由的配置
        {
          // 船舶的路由的配置
          path: 'sea_conditions',
          name: 'sea_conditions',
          component: () => import ('@/components/contentBox/sidebar/shipManagerment/my_boat/sea_conditions.vue'),
        },
        //海图路由
        {
          path: 'chartManagement',
          name: 'chartManagement',
          component: () => import ('@/components/contentBox/sidebar/chartManagement/chartManagement.vue'),
          redirect:"/contentBox/chartManagement/shipManagerMent",
          children:[
            //海图管理
            {
              path: 'shipManagerMent',
              name: 'shipManagerMent',
              component: () => import ('@/components/contentBox/sidebar/chartManagement/chartManagement/shipManagerMent.vue'),
            }
          ]
        },
        //设备路由
        {
          path: 'deviceManage/deviceList',
          name: 'deviceList',
          component: () => import ('@/components/contentBox/sidebar/deviceManagement/deviceList/deviceList.vue'),
        },
        {
          path: 'deviceManage/censorNote',
          name: 'censorNote',
          component: () => import ('@/components/contentBox/sidebar/deviceManagement/censorNote/censorNote.vue'),
        },
        //区域管理路由
        {
          path: 'regionalManagement',
          name: 'regionalManagement',
          component: () => import ('@/components/contentBox/sidebar/regionalManagement/regionalManagement.vue'),
        },
        //监控管理路由
        {
          path: 'monitoringManagement',
          name: 'monitoringManagement',
          component: () => import ('@/components/contentBox/sidebar/monitoringManagement/monitoringManagement.vue'),
          redirect:"/contentBox/monitoringManagement/cameraManagement",
          children:[
            //摄像头管理
            {
              path: 'cameraManagement',
              name: 'cameraManagement',
              component: () => import ('@/components/contentBox/sidebar/monitoringManagement/cameraManagement/cameraManagement.vue'),
            },
            //监控视频管理
            {
              path: 'monitoringManagement',
              name: 'monitoringManagement',
              component: () => import ('@/components/contentBox/sidebar/monitoringManagement/monitoringManagement/monitoringManagement.vue'),
              // redirect:"/contentBox/monitoringManagement/monitoringManagement/monitoringManagementFrame",
            },
            //监控视频管理单个风电场的路由
            {
              path: 'monitoringManagementFrame/:userId',
              name: 'monitoringManagementFrame',
              component: () => import ('@/components/contentBox/sidebar/monitoringManagement/monitoringManagement/monitoringManagementFrame.vue'),
            },
            //监控视频管理单个风电场的历史记录路由
            {
              path: 'historicalRecord/:userId',
              name: 'historicalRecord',
              component: () => import ('@/components/contentBox/sidebar/monitoringManagement/monitoringManagement/historicalRecord.vue'),
            },
            // 监控视频管理单个风电场的历史记录的单个时间路由
            {
              path: 'historicalRecordFrame/:Id',
              name: 'historicalRecordFrame',
              component: () => import ('@/components/contentBox/sidebar/monitoringManagement/monitoringManagement/historicalRecordFrame.vue'),
            },
          ]
        },
        //任务列表页面
        {
          path: 'task_management',
          name: 'task_management',
          component: () => import ('@/components/contentBox/sidebar/task_manager/task_management.vue'),
          redirect:"/contentBox/task_management/taskList",
          children:[
            {
              path: 'taskList',
              name: 'taskList',
              component: () => import ('@/components/contentBox/sidebar/task_manager/taskList/taskList.vue'),
            }
          ]
        },
        //任务通知
        //消息管理
        {
          path: 'messageManagement',
          name: 'messageManagement',
          component: () => import ('@/components/contentBox/sidebar/messageManagement/messageManagement.vue'),
          redirect:"/contentBox/messageManagement/getMessage",
          children:[
            {
              path: 'sendMessage',
              name: 'sendMessage',
              component: () => import ('@/components/contentBox/sidebar/messageManagement/sendMessage/sendMessage.vue'),
            },
            {
              path: 'getMessage',
              name: 'getMessage',
              component: () => import ('@/components/contentBox/sidebar/messageManagement/getMessage/getMessage.vue'),
            },
          ]
        },
        //用户管理
        {
          path: 'userManagement',
          name: 'userManagement',
          component: () => import ('@/components/contentBox/sidebar/userManagement/userManagement.vue'),
          redirect:"/contentBox/userManagement/OperationPersonnel",
          children: [
            //   //气象路由
            {
              path: 'personTask',
              name: 'personTask',
              component: () => import ('@/components/contentBox/sidebar/userManagement/personTask/personTask.vue'),
            },
            {
              path: 'personGroup',
              name: 'personGroup',
              component: () => import ('@/components/contentBox/sidebar/userManagement/personGroup/personGroup.vue'),
            },
            {
              path: 'OperationPersonnel',
              name: 'OperationPersonnel',
              component: () => import ('@/components/contentBox/sidebar/userManagement/OperationPersonnel/OperationPersonnel.vue'),
            }
        ]

        },
        // ...person_l,
        //个人中心1
        {
          path: 'userCenter',
          name: 'userCenter',
          component: () => import ('@/components/contentBox/sidebar/userCenter/userCenter.vue'),
        },
        //个人中心二
        {
          path: 'userCenter1',
          name: 'userCenter1',
          component: () => import ('@/components/contentBox/sidebar/userCenter/userCenter1.vue'),
        },
        //个人中心修改密码
        {
          path: 'updatePassword',
          name: 'updatePassword',
          component: () => import ('@/components/contentBox/sidebar/userCenter/updatePassword.vue'),
        },
        //个人中心修改手机号
        {
          path: 'updatePhoneNumber',
          name: 'updatePhoneNumber',
          component: () => import ('@/components/contentBox/sidebar/userCenter/updatePhoneNumber.vue'),
        },
        //消息页面
        {
          path: 'message',
          name: 'message',
          // redirect:"/contentBox/message/publicMessage",
          component:() => import ('@/components/contentBox/sidebar/message/message.vue'),
         // children:[
         //   {
         //     path: 'publicMessage',
         //     name: 'publicMessage',
         //     component:() => import ('@/components/contentBox/sidebar/message/secondComponents/publicMessage.vue'),
         //   },
         //   {
         //     path: 'normalMessage',
         //     name: 'normalMessage',
         //     component:() => import ('@/components/contentBox/sidebar/message/secondComponents/normalMessage.vue'),
         //   },
         //   {
         //     path: 'urgentMessage',
         //     name: 'urgentMessage',
         //     component:() => import ('@/components/contentBox/sidebar/message/secondComponents/urgentMessage.vue'),
         //   },
         //   {
         //     path: 'warnMessage',
         //     name: 'warnMessage',
         //     component:() => import ('@/components/contentBox/sidebar/message/secondComponents/warnMessage.vue'),
         //   }
         // ]
        },
        //任务通知()顶部的路由
        {
          path: 'messageInform',
          name: 'messageInform',
          component:() => import ('@/components/contentBox/common/common_t/taskNotification.vue'),
        },
        //具体消息页面
        {
          path: 'messageDetails',
          name: 'messageDetails',
          // redirect:"/contentBox/message/messageDetails",
          component:() => import ('@/components/contentBox/sidebar/message/messageDetails.vue'),
        },
      ],
    }]
})



// 全局路由守卫(用户是否进行登录的值，将存储在本地，如果用户没有进行登录就跳转到登录页面)
// boatRouter.beforeEach((to, from, next) => {
//  登录验证：
// if (to.fullPath === "/contentBox") {
//   console.log("即将进入" + to.fullPath);
//   console.log("即将离开" + from.fullPath);
//   if (sessionStorage.getItem('isLogin') === 'true') {
//     // next({
//     //   path: '/content',
//     //   query: {//携带用户的名字，密码等信息到content页面
//     //     // redirect: to.fullPath
//     //   }
//     // })
//     boatRouter.push({ name: 'login' })
//   } else {
//     next({//本地没有进行存储用户的值，需要进行跳转到对应的页面
//       path: '/contentBox',
//       query: {
//         redirect: to.fullPath
//       }
//     })
//   }
// }



//正宗的登录导航
// boatRouter.beforeEach((to, from, next) => {
//   if(to.meta.auth) { //是否验证
//     if(window.localStorage.access_token) { //是否登录
//       next()
//     } else { //未登录则跳转到登录页面
//       next({
//         name: 'login',
//         query: {
//           redirect: to.fullPath
//         }
//       })
//     }
//   } else {
//     next()
//   }
// })




// })
// if(to.matched.some(record => record.meta.requireAuth)){
//   console.log(to.fullPath ,'需要登录验证')
//   if(sessionStorage.getItem('isLogin') === 'true'){
//     //  表示登录过
//     next()
//   }else{
//     //  表示没有登录过
//     next({
//       path: '/login',
//       query: {
//         redirect: to.fullPath  // 用户要访问 的目录路由，做参数，给/login这个组件；
//       }
//     })
//   }
// }else{
//   console.log(to.fullPath ,'不需要登录验证')
//   next()
// }


// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

// const nextRoute = ['home', 'good-list', 'good-detail', 'cart', 'profile'];
// let isLogin = global.isLogin;  // 是否登录
// // 未登录状态；当路由到nextRoute指定页时，跳转至login
// if (nextRoute.indexOf(to.name) >= 0) {
//   if (!isLogin) {
//     console.log('what fuck');
//     router.push({name: 'login'})
//   }
// }
// // 已登录状态；当路由到login时，跳转至home
// if (to.name === 'login') {
//   if (isLogin) {
//     router.push({name: 'home'});
//   }
// }
// next();
// })
export default boatRouter
