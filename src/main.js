// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api'

Vue.prototype.$ajax = api

Vue.config.productionTip = false

// 用钩子函数beforeEach()对路由进行判断
router.beforeEach((to,from,next)=>{
    if(to.name !== 'login'){//除了登录页
        if(window.localStorage.getItem("user")){

            next()

        }else{//没有权限

            next({
                path: '/'
              })

        }
    }else{

        next()

    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
