import Vue from 'vue'
import Router from 'vue-router'

const login = r => require.ensure([], () => r(require('@/views/login')), 'Login')

const home = r => require.ensure([], () => r(require('@/views/home')), 'home')

const datamanage = r => require.ensure([], () => r(require('@/views/datamanage/datamanage')), 'datamanage')

const manageMain = r => require.ensure([], () => r(require('@/views/datamanage/main')), 'main')

const replenish = r => require.ensure([], () => r(require('@/views/datamanage/replenish')), 'replenish')

const upload = r => require.ensure([], () => r(require('@/views/datamanage/upload')), 'upload')

const grade = r => require.ensure([], () => r(require('@/views/grade/grade')), 'grade')

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            children: [
                {
                    path: '/home/datamanage',
                    component: datamanage,
                    children: [
                        {
                            path: '/',
                            component: manageMain,
                        },
                        {
                            path: '/home/replenish',
                            component: replenish,
                        },
                        {
                            path: '/home/upload/:id',
                            name:'upload',
                            component: upload,
                        }
                    ]
                },
                {
                    path: '/home/grade',
                    component: grade
                }
            ]
        }
    ]
})
