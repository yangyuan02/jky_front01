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

const specialistReport = r => require.ensure([], () => r(require('@/views/specialist/report')), 'specialistReport')

//督导用户



const supervisorIndex = r => require.ensure([], () => r(require('@/views/supervisor/index')), 'supervisorIndex')

const supervisorMain = r => require.ensure([], () => r(require('@/views/supervisor/provinceProgress')), 'provinceProgress')

const supervisorList = r => require.ensure([], () => r(require('@/views/supervisor/supervisorList')), 'supervisorList')

const supervisorListReport = r => require.ensure([], () => r(require('@/views/supervisor/report')), 'supervisorListReport')

const supervisorListUpload = r => require.ensure([], () => r(require('@/views/supervisor/upload')), 'supervisorListUpload')

const supervisorOnMain = r => require.ensure([], () => r(require('@/views/supervisor/on_main')), 'supervisorOnMain')


// const supervisorMain = r => require.ensure([], () => r(require('@/views/supervisor/main')), 'supervisorMain')

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
                    meta: { requiresAuth: '省用户' },
                    children: [
                        {
                            path: '/',
                            component: manageMain,
                            meta: { requiresAuth: '省用户' }
                        },
                        {
                            path: '/home/upload/:id',
                            name:'upload',
                            component: upload,
                            meta: { requiresAuth: '省用户' }
                        },
                        {
                            path: '/home/grade',
                            component: grade,
                            meta: { requiresAuth: '省用户' }
                        },
                        {
                            path: '/home/report',
                            component: report,
                            meta: { requiresAuth: '省用户' }
                        }
                    ]
                },
                {
                    path: '/home/specialist',//网评专家
                    component: specialist,
                    meta: { requiresAuth: '网评专家' },
                    children: [
                        {
                            path: '/',
                            component: specialistMain,
                            meta: { requiresAuth: '网评专家' },
                        },
                        {
                            path: '/home/specialist/grade',
                            component: grade,
                            meta: { requiresAuth: '网评专家' },
                        },
                        {
                            path: '/home/specialist/report',
                            component: specialistReport,
                            meta: { requiresAuth: '网评专家' },
                        },
                        {
                            path: '/home/expert/:id',
                            name:'expert',
                            component: specialistGrade,
                            meta: { requiresAuth: '网评专家' },
                        },
                    ]
                },
                {
                    path: '/home/supervisor',//督导
                    component: supervisorIndex,
                    meta: { requiresAuth: '督导' },
                    children: [
                        {
                            path: '/',
                            component: supervisorMain,
                            meta: { requiresAuth: '督导' },
                        },
                        {
                            path: '/home/supervisor/list/:code',
                            name:'supervisorList',
                            component: supervisorList,
                            meta: { requiresAuth: '督导' },
                        },
                        {
                            path: '/home/supervisor/report:code',
                            name:'supervisorReport',
                            component: supervisorListReport,
                            meta: { requiresAuth: '督导' },
                        },
                        {
                            path: '/home/supervisor/upload/:id/:code',
                            name:'supervisorListUpload',
                            component: supervisorListUpload,
                            meta: { requiresAuth: '督导' },
                        },
                        {
                            path: '/home/supervisor/onlinecomment',
                            component: supervisorOnMain,
                            meta: { requiresAuth: '督导' },
                        },
                        {
                            path: '/home/supervisor/onlinecomment/department',
                            component: department,
                            meta: { requiresAuth: '督导' },
                        },
                        {
                            path: '/home/department/detail',
                            component: departmentDetail,
                            meta: { requiresAuth: '督导' },
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
