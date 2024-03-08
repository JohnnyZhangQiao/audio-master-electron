import '@renderer/assets/less/common.less';
import 'tdesign-vue-next/es/style/index.css';

import { createApp } from 'vue';

import request from '@renderer/api/request';
import router from '@renderer/router';
import store from '@renderer/store';

import App from './App.vue';

// 构建vue实例
const app = createApp(App);

// 注册pinia状态管理库
app.use(store);
console.trace('pinia状态库已注册...');

// 初始化请求中心
request.initInterceptors();
// 挂载路由
app.use(router);
console.trace('router已挂载...');

app.mount('#App');
