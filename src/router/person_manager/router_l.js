export default [{
  path: '/personManager/personTask',
  name: 'personTask',
  component: () => import ('@/components/contentBox/sidebar/userManagement/personTask/personTask.vue'),
},{
  path: '/personManager/personGroup',
  name: 'personGroup',
  component: () => import ('@/components/contentBox/sidebar/userManagement/personGroup/personGroup.vue'),
}];
