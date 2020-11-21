// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase  from "@/firebase/init"

let app = null
Vue.config.productionTip = false
// wait for firebase aut to init before creating the app
firebase.auth().onAuthStateChanged(()=>{
  /* eslint-disable no-new */
  // init app if not ready to created
  if(!app){
   app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})

