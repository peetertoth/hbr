import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import LoginPage from './pages/login_page.vue';
import UserProfilePage from './pages/user_profile_page.vue';
import GroupListPage from './pages/group_list_page.vue';
import GroupDetailsPage from './pages/group_details_page.vue';
import StudentListPage from './pages/student_list_page.vue';
import StudentDetailsPage from './pages/student_details_page.vue';
import ImportStudentsPage from './pages/import_students_page.vue';
import VisitListPage from './pages/visit_list_page.vue';

import store from './store';

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
    {
      path: '/group',
      name: 'group',
      component: GroupListPage,
      meta: {
        authRequired: true,
      },
    },
    {
      path: '/group/:id',
      name: 'group-details',
      component: GroupDetailsPage,
      meta: {
        authRequired: true,
      },
    },
    {
      path: '/student',
      name: 'student',
      component: StudentListPage,
      meta: {
        authRequired: true,
      },
    },
    {
      path: '/student/:id',
      name: 'student-details',
      component: StudentDetailsPage,
      meta: {
        authRequired: true,
      },
    },
    {
      path: '/import-students',
      name: 'import-students',
      component: ImportStudentsPage,
      meta: {
        authRequired: true,
      },
    },
    {
      path: '/visit',
      name: 'visit',
      component: VisitListPage,
      meta: {
        authRequired: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  store.dispatch('common/startLoading', null, { root: true });
  next();
});

router.afterEach(() => {
  store.dispatch('common/stopLoading', null, { root: true });
});

export default router;
