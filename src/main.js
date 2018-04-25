// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App'
import router from './router'
import store from './store'
import api from './api'

Vue.use(ElementUI);

Vue.prototype.$ajax = api

Vue.config.productionTip = false


// 用钩子函数beforeEach()对路由进行判断
router.beforeEach((to, from, next) => {

    var pathObj = {
        "省用户":"/home/datamanage",
        "网评专家":"/home/specialist",
        "实地专家":"/home/datamanage", ///暂定
        "督导":"/home/supervisor",
    }

    if(to.name =='login' && window.localStorage.getItem("token")){  //解决登陆后 用户输入登录地址重定向到首页

        let role = JSON.parse(window.localStorage.getItem("user")).role

        next({
            path: pathObj[role]
          })
    }

    if (to.name !== 'login') {//除了登录页
        if (window.localStorage.getItem("token")) {

            let role = JSON.parse(window.localStorage.getItem("user")).role

            if (to.matched.some(record => record.meta.requiresAuth == role)) {
                next()
            } else {
                next({
                    path: '/'
                })
            }



        } else {//没有权限

            next({
                path: '/'
            })

        }
    } else {

        next()

    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
