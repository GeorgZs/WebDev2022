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

Vue.use(Router)

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
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
