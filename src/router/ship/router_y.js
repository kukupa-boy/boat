export default {
  path: '/shipManagerment/myboat/boat_list',
  name: 'my_boat',
  component: () => import ('@/components/sidebar/shipManagerment/my_boat/boat_list.vue'),
  children:[
    {
      path: '/shipManagerment/myboat/boat_list/edit',
      name: 'edit',
      component: () => import ('@/components/sidebar/shipManagerment/my_boat/childrenComponents/edit.vue'),
    },
    {
      path: '/shipManagerment/myboat/boat_list/sendMessage',
      name: 'edit',
      component: () => import ('@/components/sidebar/shipManagerment/my_boat/childrenComponents/sendMessage.vue'),
    },
    {
      path: '/shipManagerment/myboat/boat_list/sendMessage1',
      name: 'edit1',
      component: () => import ('@/components/sidebar/shipManagerment/my_boat/childrenComponents/sendMessage1.vue'),
    },
    {
      path: '/shipManagerment/myboat/boat_list/warn_setting',
      name: 'warn_setting',
      component: () => import ('@/components/sidebar/shipManagerment/my_boat/childrenComponents/warn_setting.vue'),
    },
    {
      path: '/shipManagerment/myboat/boat_list/call_police',
      name: 'call_police',
      component: () => import ('@/components/sidebar/shipManagerment/my_boat/childrenComponents/call_police.vue'),
    },
    {
      path: '/shipManagerment/myboat/boat_list/delete_boat',
      name: 'delete_boat',
      component: () => import ('@/components/sidebar/shipManagerment/my_boat/childrenComponents/delete_boat.vue'),
    },
    {
      path: '/shipManagerment/myboat/boat_list/add_boat',
      name: 'add_boat',
      component: () => import ('@/components/sidebar/shipManagerment/my_boat/childrenComponents/add_boat.vue'),
    },
    // {
    //   path: '/shipManagerment/seaChart',
    //   name: 'seaChart',
    //   component: seaChart
    // }
  ]
};
