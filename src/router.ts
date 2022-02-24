import _ from 'lodash'
import auth from './auth'
import BaseView from '@/views/BaseView.vue'
import Department from '@/views/Department.vue'
import Error from '@/views/Error.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import TheMonastery from '@/views/TheMonastery.vue'
import NotFound from '@/views/NotFound.vue'
import StatusBoard from '@/views/StatusBoard.vue'
import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login,
      beforeEnter: (to: any, from: any, next: any) => {
        if (_.get(Vue.prototype.$currentUser, 'isAuthenticated')) {
          next('/')
        } else {
          next()
        }
      },
      meta: {
        title: 'Welcome'
      }
    },
    {
      path: '/',
      component: BaseView,
      beforeEnter: auth.requiresAuthenticated,
      children: [
        {
          path: '/department/:departmentId',
          component: Department,
          meta: {
            title: 'Department'
          }
        },
        {
          path: '/departments',
          component: TheMonastery,
          meta: {
            title: 'Group Management'
          }
        },
        {
          path: '/home',
          component: Home,
          name: 'home'
        },
        {
          path: '/lists',
          component: NotFound,
          meta: {
            title: 'List Management'
          }
        },
        {
          path: '/status',
          component: StatusBoard,
          beforeEnter: auth.requiresAdmin,
          meta: {
            title: 'Status Board'
          }
        },
      ]
    },
    {
      path: '/',
      component: BaseView,
      children: [
        {
          path: '/404',
          component: NotFound,
          meta: {
            title: 'Page not found'
          }
        },
        {
          path: '/error',
          component: Error,
          meta: {
            title: 'Error'
          }
        },
        {
          path: '/errors',
          component: NotFound,
          meta: {
            title: 'Course Errors Board'
          }
        },
        {
          path: '*',
          redirect: '/404'
        }
      ]
    }
  ]
})

router.beforeEach((to: any, from: any, next: any) => {
  const redirect = _.trim(to.query.redirect)
  if (Vue.prototype.$currentUser.isAuthenticated && redirect) {
    next(redirect)
  } else {
    next()
  }
})

router.afterEach((to: any) => {
  const title = _.get(to, 'meta.title') || _.capitalize(to.name) || 'Welcome'
  document.title = `${title} | Course Evaluations`
})

export default router