import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Paginate from 'vuejs-paginate'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import MainLayout from './layout/MainLayout'
import EmptyLayout from './layout/EmptyLayout'
import Vuelidate from 'vuelidate'
import messegePlagin from './utils/messegePlagin'
import VueFilterDateFormat from 'vue-filter-date-format'
import Loader from './components/Loader'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.component('main-layout', MainLayout)
Vue.component('empty-layout', EmptyLayout)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

Vue.use(messegePlagin)

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)
Vue.use(VueFilterDateFormat, {dayOfWeekNames: [
  'Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четверг',
  "П'ятниця", 'Субота'
]})


const firebaseConfig = {
  apiKey: "AIzaSyCi54ayG9djC4As754m-BNuRpqu1_xitRw",
  authDomain: "hhome-soft.firebaseapp.com",
  databaseURL: "https://hhome-soft.firebaseio.com",
  projectId: "hhome-soft",
  storageBucket: "hhome-soft.appspot.com",
  messagingSenderId: "282058373271",
  appId: "1:282058373271:web:f804594018b9bbfc06d1d2"
};

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  } 
})


