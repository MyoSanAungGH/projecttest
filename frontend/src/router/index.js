import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import login from "../views/login.vue";
import register from "../views/register.vue";

// import home from "../views/home.vue";
// import profile from "../views/profile.vue";
// import changePwd from "../views/changePwd.vue";
// import movie_details from "../views/movie_details.vue";

// import admin from "../views/admin.vue";
// import admin_create_movie from "../views/admin_create_movie.vue";
// import admin_user_list from "../views/admin_user_list.vue";
// import admin_record_list from "../views/admin_record_list.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
  // {
  //   path: "/",
  //   name: "home",
  //   component: home,
  // },
  // {
  // {
  //   path: "/movie_details/:id",
  //   name: "movie_details",
  //   component: movie_details,
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
  // {
  //   path: "/profile",
  //   name: "profile",
  //   component: profile,
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
  // {
  //   path: "/changePwd",
  //   name: "changePwd",
  //   component: changePwd,
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },

  // // ----------- Admin
  // {
  //   path: "/admin",
  //   name: "admin",
  //   component: admin,
  //   meta: {
  //     requiresAuth: true,
  //     requiresAdmin: true,
  //   },
  // },
  // {
  //   path: "/admin/create_movie",
  //   name: "admin_create_movie",
  //   component: admin_create_movie,
  //   meta: {
  //     requiresAuth: true,
  //     requiresAdmin: true,
  //   },
  // },
  // {
  //   path: "/admin/user_list",
  //   name: "admin_user_list",
  //   component: admin_user_list,
  //   meta: {
  //     requiresAuth: true,
  //     requiresAdmin: true,
  //   },
  // },
  // {
  //   path: "/admin/record_list",
  //   name: "admin_record_list",
  //   component: admin_record_list,
  //   meta: {
  //     requiresAuth: true,
  //     requiresAdmin: true,
  //   }
  // },
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let loginUser = router.app.$store.getters.loginUser;
  let isLogin = router.app.$store.getters.isLogin;

  // from - Home
  // to - Profile
  // Need to be login, But is not login
  if (to.meta.requiresAuth == true && !isLogin) {
    next({ path: "/" });
  }

  // Need to be login, Need to be admin
  else if (
    to.meta.requiresAuth == true &&
    to.meta.requiresAdmin == true &&
    loginUser.role != "admin"
  ) {
    next({ path: "/" });
  }

  // If All Okay
  else {
    next();
  }
});

export default router;
