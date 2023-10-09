import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/index';

import HomeView from '../views/HomeView';
import AppView from '../views/AppView';
import ProductView from '../views/ProductView';
import CompanyView from '../views/CompanyView';
import AccountView from '../views/AccountView';
import AuthView from '../views/AuthView';
import UpdatePasswordView from '../views/UpdatePasswordView';
import AGBView from '../views/AGBView';
//import CompanyDetailView from '../views/CompanyDetailView';
import ProductDetailView from '../views/ProductDetailView';

const routes = [
  {
    path: '/',
    alias: ['/start'],
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/app',
    name: 'AppView',
    component: AppView,
  },
  {
    path: '/angebote',
    name: 'ProductView',
    component: ProductView,
  },
  {
    path: '/unternehmen',
    name: 'CompanyView',
    component: CompanyView,
  },
  {
    path: '/account',
    name: 'AccountView',
    component: AccountView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/auth',
    name: 'AuthView',
    component: AuthView,
    meta: {
      footer: false,
    },
  },
  {
    path: '/update-password',
    name: 'UpdatePasswordView',
    component: UpdatePasswordView,
    meta: {
      footer: false,
    },
  },
  {
    path: '/agb',
    name: 'AGBView',
    component: AGBView,
  },
  {
    path: '/qr:id',
  },
  {
    path: '/:companyalias',
    component: CompanyView,
    meta: {
      footer: false,
    },
  },
  {
    path: '/:company/:productid',
    component: ProductDetailView,
    meta: {
      footer: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('navbarToggler').classList.remove('show');
  },
});

router.beforeEach((to, from, next) => {
  // get current user info
  const user = store.getters.getUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (to.path.startsWith('/qr')) {
    const paths = ['/', '/account', '/'];
    let id = parseInt(to.path.slice(3));
    store.dispatch('addQRCodeCount', id);
    next({ path: paths[id - 1] });
  } else if (to.query.source !== undefined) {
    let query = to.query;
    store.dispatch('addQRCodeCount', to.query.source);
    delete query.source;
    next({ query: query });
  } else if (to.path === '/' && user !== null) {
    //Logged in users get 'products' page as start-page
    next({ path: 'angebote' });
  } else if (requiresAuth && user === null) {
    //If a page requires the user to be logged in, he will be get the auth page
    next({ name: 'AuthView', query: { redirect: to.fullPath } });
  } else if (
    to.query.redirect &&
    to.name === 'AuthView' &&
    user !== null &&
    to.query.redirect.split('_')[0] === 'ext'
  ) {
    store.dispatch('externLoginCallback', to.query.redirect.split('_')[1]);
  } else if (
    to.query.redirect &&
    to.name === 'AuthView' &&
    user !== null &&
    to.query.redirect.split('_')[0] === 'int'
  ) {
    store.dispatch('internLoginCallback', to.query.redirect.split('_')[1]);
  } else if (to.name === 'AuthView' && user !== null) {
    next({ path: 'account' });
  } else next();
});

export default router;
