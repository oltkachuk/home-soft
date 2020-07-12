import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Category from '../views/Category'
import Login from '../views/Login'
import Register from '../views/Register'
import Record from '../views/Record'
import History from '../views/History'
import Chart from '../views/Chart'
import Profile from '../views/Profile'
import firebase from 'firebase/app'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main-layout', auth: true},
    component: Home
  },
  {
    path: '/category',
    name: 'Category',
    meta: {layout: 'main-layout', auth: true},
    component: Category
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'empty-layout'},
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    meta: {layout: 'empty-layout'},
    component: Register
  },
  {
    path: '/record',
    name: 'Record',
    meta: {layout: 'main-layout', auth: true},
    component: Record
  },
  {
    path: '/history',
    name: 'History',
    meta: {layout: 'main-layout', auth: true},
    component: History
  },
  {
    path: '/chart',
    name: 'Chart',
    meta: {layout: 'main-layout', auth: true},
    component: Chart
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout: 'main-layout', auth: true},
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const authUser = to.matched.some(r => r.meta.auth)
  if (authUser && !currentUser) {
    next('/login?messege=login')
  } else {
    next()
  }
})

export default router




