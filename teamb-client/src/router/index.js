import Vue from 'vue'
import Router from 'vue-router'
import top from '@/views/top'
import check from '@/views/check'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: top
    },
    {
      path: '/check',
      component: check
    },
  ]
})