import Vue from 'vue'
import Router from 'vue-router'

const Login = r => require.ensure([], () => r(require('@/views/login')), 'Login')

const DataManage = r => require.ensure([], () => r(require('@/views/datamanage/datamanage')), 'DataManage')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/datamanage',
      name: 'DataManage',
      component: DataManage
    }
  ]
})
