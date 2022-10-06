import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HomeSearch from './views/HomeSearch.vue'
import LandingPage from './views/LandingPage.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import SearchResult from './views/SearchResult.vue'
// import { component } from 'vue/types/umd'
import Settings from './views/Settings.vue'
import Inbox from './views/Inbox.vue'
import Dashboard from './views/Dashboard.vue'
import ServiceList from './views/ServiceList.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

function checkId(to, from, next) {
  if (localStorage.loginToken !== undefined && localStorage.loginToken !== null && localStorage.loginToken !== '') {
    next()
  } else {
    next('/404')
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeSearch
    },
    {
      path: '/home',
      name: 'homeNot',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/results',
      name: 'searchResult',
      component: SearchResult
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/providers/:providerId',
      name: 'landingPage',
      component: LandingPage
    },
    {
      path: '/dashboard/services',
      name: 'service list',
      component: ServiceList,
      beforeEnter: checkId
    },
    {
      path: '/dashboard/settings',
      name: 'settings',
      component: Settings,
      beforeEnter: checkId
    },
    {
      path: '/dashboard/inbox',
      name: 'inbox',
      component: Inbox,
      beforeEnter: checkId
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: checkId
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      beforeEnter: checkId
    }
  ]
})
