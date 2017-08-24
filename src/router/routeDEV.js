import layout from '../pages/dev/layout.vue';

import login from '../pages/dev/login.vue';

import financeindex from '../pages/dev/finance/index.vue';

import financeupdate from '../pages/dev/finance/config/update.vue';

import sdkapi from '../pages/dev/sdkapi/sdkapi.vue';

import totalindex from '../pages/dev/total/index.vue';

import appindex from '../pages/dev/app/index.vue';

import appaddslot from '../pages/dev/app/config/addslot.vue';

import appupdate from '../pages/dev/app/config/update.vue';

import addapp from '../pages/dev/app/config/addapp.vue';

import dataindex from '../pages/dev/data/index.vue';

import userindex from '../pages/dev/user/index.vue';

import userupdate from '../pages/dev/user/config/update.vue';

import userupdatepsd from '../pages/dev/user/config/updatepsd.vue';

import config from '../config.js';

const routes = [{
  path: '/',
  redirect: config.index
}, {
  path: '/dev/login',
  component: login
}, {
  path: '/dev/',
  component: layout,
  children: [{
    path: 'index',
    component: totalindex
  }, {
    path: 'app/index',
    component: appindex
  }, {
    path: 'app/index/addslot',
    component: appaddslot
  }, {
    path: 'app/index/update',
    component: appupdate
  }, {
    path: 'app/index/addapp',
    component: addapp
  }, {
    path: 'data/index',
    component: dataindex
  }, {
    path: 'user/index',
    component: userindex
  }, {
    path: 'user/index/update',
    component: userupdate
  }, {
    path: 'user/index/updatepsd',
    component: userupdatepsd
  }, {
    path: 'finance/index',
    component: financeindex
  }, {
    path: 'finance/index/update',
    component: financeupdate
  }, {
    path: 'sdkapi',
    component: sdkapi
  }]
}];

export default routes;
