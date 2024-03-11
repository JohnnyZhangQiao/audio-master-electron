import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

import basicRoutes from './basic';

const moduleRoutes = [];
const modules = import.meta.glob('@renderer/pages/**/router.ts', { eager: true });

for (const path in modules) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const route: never = modules[path].default;
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
  history: createWebHashHistory(),
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
