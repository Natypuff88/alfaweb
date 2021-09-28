import Vue from 'vue'
import Router from 'vue-router'
import Firebase from "firebase";
import Home from '../views/Home.vue'


Vue.use(Router)

const routes = [
    {
      path: "/",
      redirect: "/login",
      meta: { login: false}
    },
    {
      path:"/login",
      name:'Login',
      component:() => import('../views/Login.vue'),
      meta: { login: false}
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { login: true }
    },
    {
      path: "*",
      redirect: "/login",
      meta: { login: false}
    },
    {
      path:"/registro",
      name:'Registro',
      component:() => import('../views/Registro.vue'),
      meta: { login: false}
    },
  ]
  
  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  router.beforeEach((to, from, next) => {
    let user = Firebase.auth().currentUser;
    let authRequired = to.matched.some((route) => route.meta.login);
    if (!user && authRequired) {
      next("login");
    } else if (user && !authRequired) {
      next("Home");
    } else {
      next();
    }
  });
  
  export default router