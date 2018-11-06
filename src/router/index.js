import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/pc/HelloWorld'

Vue.use(Router)

//移动端页面
// export const mobileRouter=[
//
// ]

export default new Router({
  mode: 'history',
  // redirect: 'goodslist',
  redirect: '/',
  routes: [
    //登陆
    {
      path:'/',
      name: 'login',
      meta: {
        title: 'Login - 登录'
      },
      component: resolve => {
        require(['@/login.vue'], resolve)
      }
    },
    //pc端组件
    {
      path: '/world',
      name: 'assembly',
      component: resolve => {
        require(['@/components/group/assembly.vue'], resolve)
      }
    },
    //pc端页面
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
        {
          path: '/hello/apple',
          name:'apple',
          component: resolve => {
            require(['@/views/pc/apple.vue'], resolve)
          }
        },
        {
          path: '/hello/banana',
          name: 'banana',
          component: resolve => {
            require(['@/views/pc/banana.vue'], resolve)
          }
        },
        {
          path: '/hello/pear',
          name: 'pear',
          component: resolve => {
            require(['@/views/pc/pear.vue'], resolve)
          }
        },
        {
          path: '/hello/grape',
          name: 'grape',
          component: resolve => {
            require(['@/views/pc/grape.vue'], resolve)
          }
        },
      ]
    },
    //error页面
    {
      path: '/*',
      name: 'error-404',
      meta: {
        title: '404-页面不存在'
      },
      component: resolve => {
        require(['@/error-page/404.vue'], resolve)
      }
    },

    {
      path: '/403',
      meta: {
        title: '403-权限不足'
      },
      name: 'error-403',
      component: resolve => {
        require(['@/error-page/403.vue'], resolve)
      }
    },

    {
      path: '/500',
      meta: {
        title: '500-服务端错误'
      },
      name: 'error-500',
      component: resolve => {
        require(['@/error-page/500.vue'], resolve)
      }
    },
    //移动端页面
    {
      path: '/mobile',
      name: 'mobileMain',
      component: () => import('@/views/mobile/mobileMain.vue'),
      children:[
        {
          path: '/mobile/m-home',
          name: 'home',
          title: '首页',
          component: resolve => {
            require(['@/views/mobile/m-home.vue'], resolve)
          }
        },
        {
          path: '/mobile/m-person',
          name: 'person',
          title: '我',
          component: resolve => {
            require(['@/views/mobile/m-person.vue'], resolve)
          }
        },
      ]
    },
  ]
})
// export const routers = []

