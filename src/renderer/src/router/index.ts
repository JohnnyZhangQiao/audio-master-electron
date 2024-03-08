import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

import basicRoutes from './basic';

const moduleRoutes = [];
const modules = import.meta.glob('@renderer/pages/**/router.ts', { eager: true });

for (const path in modules) {
  // @ts-ignore
  const route = modules[path].default;
  moduleRoutes.push(route);
}

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tts',
  },
  ...moduleRoutes,
  ...basicRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      el: '#App',
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
