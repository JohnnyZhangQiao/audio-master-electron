import { resolve } from 'path';
import { type ConfigEnv, loadEnv } from 'vite';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { visualizer } from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import { fetchEnv } from './src/main/nodeProxy';

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, __dirname);
  const { targetUrl } = fetchEnv(env.VITE_NODE_ENV); // 设置域名和端口
  return {
    main: {
      plugins: [externalizeDepsPlugin()],
    },
    preload: {
      plugins: [externalizeDepsPlugin()],
    },
    renderer: {
      base: '/',
      define: {
        ENV: {
          TARGET_URL: targetUrl,
          NODE_ENV: env.VITE_NODE_ENV,
        },
      },
      server: {
        strictPort: true,
        port: 5173,
        hmr: {
          protocol: 'ws',
          host: 'localhost', // 只能填 local 地址，不能填远程服务器的 ip
          clientPort: 5173,
        },
      },
      plugins: [
        vue(),
        vueJsx(),
        //自动按需引入组件库
        AutoImport({
          resolvers: [
            TDesignResolver({
              library: 'vue-next',
            }),
          ],
          include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
          ],
          imports: ['vue'], //自动import vue hook
          dts: 'src/auto-imports.d.ts',
        }),
        Components({
          resolvers: [
            TDesignResolver({
              library: 'vue-next',
              resolveIcons: true, //自动import图标
            }),
          ],
          dts: 'src/components.d.ts',
        }),
        // script setup语法糖增强插件
        VueSetupExtend(),
        process.env.REPORT
          ? visualizer({
              open: true,
              gzipSize: true,
              filename: resolve(__dirname, './stats.html'),
            })
          : null,
      ],
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src'),
        },
      },
      css: {
        // css预处理器
        preprocessorOptions: {
          less: {
            charset: false,
            // additionalData: '@import "./src/assets/less/common.less";'
          },
        },
      },
      build: {
        rollupOptions: {
          onwarn: (warning, warn) => {
            if (warning.code === 'INVALID_ANNOTATION') {
              return;
            }
            warn(warning);
          },
        },
      },
    },
  };
});
