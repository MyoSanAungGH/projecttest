import Vue from 'vue';
import VueRouter from 'vue-router';

import home from '../views/home.vue';


Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name: "home",
    component: home,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//when before we go to path, do it..
router.beforeEach((to,from, next) => {
  let loginUser = router.app.$store.getters.loginUser;
  let isLogin = router.app.$store.getters.isLogin;

  //from - Home
  //to - profile
  //Need to be login but it not login
  if (to.meta.requiresAuth == true && !isLogin) {
    next({ path: "/" });
  } else if (
    to.meta.requiresAuth == true &&
    to.meta.requiresAdmin == true &&
    loginUser.role != "admin"
  ) {
    next({ path: "/" });
  } else {
    next();
  }
});

export default router;
