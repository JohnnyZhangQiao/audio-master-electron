import { AudioIcon, ChartBubbleIcon } from 'tdesign-icons-vue-next';
import TTS from './Index.vue';
import { isLogin } from '@renderer/utils/userLogin';
import type { RouteRecordRaw } from 'vue-router';

const ttsRoutes: RouteRecordRaw = {
  path: '/tts',
  name: 'tts',
  component: TTS,
  redirect: '/tts/creation',
  meta: {
    navigation: 'TTS',
    icon: ChartBubbleIcon,
    requireAuth: true,
  },
  beforeEnter: (_to, _from, next) => {
    /**
     * 这里定义控制台单页应用进入前的导航守卫逻辑
     */
    isLogin() ? next() : next('/login');
  },
  children: [
    {
      path: '/tts/creation',
      name: 'creation',
      component: () => import('@renderer/pages/tts/creation/index.vue'),
      meta: {
        navigation: '语音合成',
        icon: AudioIcon,
        requireAuth: true,
      },
    },
  ],
};

export default ttsRoutes;
