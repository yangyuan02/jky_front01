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

//督导用户
const supervisorIndex = r => require.ensure([], () => r(require('@/views/supervisor/index')), 'supervisorIndex')

const supervisorMain = r => require.ensure([], () => r(require('@/views/supervisor/main')), 'supervisorMain')

const department = r => require.ensure([], () => r(require('@/views/supervisor/department')), 'department')

const departmentDetail = r => require.ensure([], () => r(require('@/views/supervisor/detail')), 'departmentDetail')


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
                },
                {
                    path: '/home/supervisor',//督导用户
                    component: supervisorIndex,
                    children: [
                        {
                            path: '/',
                            component: supervisorMain,
                        },
                        {
                            path: '/home/department',
                            component: department,
                        },
                        {
                            path: '/home/department/detail',
                            component: departmentDetail,
                        }
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
