import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import LoginPage from './pages/login_page.vue';
import UserProfilePage from './pages/user_profile_page.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfilePage,
      meta: {
        authRequired: true,
      },
    },
  ],
});

export default router;
