import Vue from 'vue'
import Router from 'vue-router'

const login = r => require.ensure([], () => r(require('@/views/login')), 'Login')

const home = r => require.ensure([], () => r(require('@/views/home')), 'home')

//省用户

const datamanage = r => require.ensure([], () => r(require('@/views/datamanage/index')), 'datamanage')

const manageMain = r => require.ensure([], () => r(require('@/views/datamanage/main')), 'main')

const upload = r => require.ensure([], () => r(require('@/views/datamanage/upload')), 'upload')

const grade = r => require.ensure([], () => r(require('@/views/datamanage/grade')), 'grade')

const report = r => require.ensure([], () => r(require('@/views/datamanage/report')), 'report')

const error = r => require.ensure([], () => r(require('@/components/common/error')), 'error')



// 专家
const specialist = r => require.ensure([], () => r(require('@/views/specialist/index')), 'specialist')

const specialistMain = r => require.ensure([], () => r(require('@/views/specialist/main')), 'specialistMain')

const specialistGrade = r => require.ensure([], () => r(require('@/views/specialist/grade')), 'specialistGrade')


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
                    path: '/home/datamanage',//省用户
                    component: datamanage,
                    children: [
                        {
                            path: '/',
                            component: manageMain,
                        },
                        {
                            path: '/home/upload/:id',
                            name:'upload',
                            component: upload,
                        },
                        {
                            path: '/home/grade',
                            component: grade
                        },
                        {
                            path: '/home/report',
                            component: report
                        }
                    ]
                },
                {
                    path: '/home/specialist',//专家用户
                    component: specialist,
                    children: [
                        {
                            path: '/',
                            component: specialistMain,
                        },
                        {
                            path: '/home/expert/:id',
                            name:'expert',
                            component: specialistGrade,
                        },
                    ]
                }
            ]
        },
        {
            path: '*',
            name: 'error',
            component: error
        }
    ]
})
