<template>
  <t-layout class="app-container">
    <Header />
    <t-layout class="app-body">
      <Aside :menu="props.menu" :default-expanded="props.defaultExpanded" />
      <t-content class="app-content">
        <Breadcrumb />
        <div class="content-body" :style="props.styles">
          <slot />
        </div>
      </t-content>
    </t-layout>
  </t-layout>
</template>

<script setup lang="tsx" name="App">
import type { CSSProperties } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import Aside from '@renderer/components/layout/Aside.vue';
import Breadcrumb from '@renderer/components/layout/Breadcrumb.vue';
import Header from '@renderer/components/layout/Header.vue';

interface IProps {
  styles?: CSSProperties;
  menu?: Array<RouteRecordRaw>;
  defaultExpanded?: string[];
}

const props = withDefaults(defineProps<IProps>(), {
  styles: () => ({}),
  menu: () => [],
  defaultExpanded: () => [],
});
</script>

<style lang="less" scoped>
.app-container {
  width: 100%;
  height: 100%;
  .app-body {
    display: flex;
    flex-flow: row;
    height: 1%;
    overflow: auto;
    .app-content {
      position: relative;
      flex: auto;
      min-width: 900px;
      height: 100%;
      overflow: auto;
      .content-body {
        margin: 0 20px;
        height: calc(100% - 42px - 20px);
        border-radius: 5px;
        overflow: auto;
      }
    }
  }
}
</style>
