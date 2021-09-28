import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Firebase from 'firebase';
import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)

Vue.config.productionTip = false


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpAG64tbH5PMIFo3r87cZNVE2fAyyYG9E",
  authDomain: "alfaweb-61422.firebaseapp.com",
  databaseURL: "",
  projectId: "alfaweb-61422",
  storageBucket: "alfaweb-61422.appspot.com",
  messagingSenderId: "513941339090",
  appId: "1:513941339090:web:9dddac2c2d43556abc660b"
};


Firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
