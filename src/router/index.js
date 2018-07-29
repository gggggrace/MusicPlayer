import Vue from 'vue'
import Router from 'vue-router'
import vueResource from 'vue-resource'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
Vue.use(vueResource)

const router = new Router({
  routes: [{
      path: '/newSongs',
      component: require('../views/newSongs').default
    }, {
      path: '/rank',
      component: require('../views/rank').default
    }, {
    path: '/pList',
    component: require('../views/pList').default
  }, {
    path: '/singer',
    component: require('../views/singer').default
  }
  ]
});
export default router
