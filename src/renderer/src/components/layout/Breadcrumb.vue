<template>
  <t-breadcrumb :max-item-width="'150'" class="nav-breadcrumb">
    <t-breadcrumb-item v-for="item in crumbs" :key="item.name" @click="handleRouterTo(item.path)">
      {{ item.meta?.navigation || '...' }}
    </t-breadcrumb-item>
  </t-breadcrumb>
</template>

<script setup lang="tsx" name="breadcrumb">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const crumbs = computed(() => router.currentRoute.value.matched);

const handleRouterTo = (path: string) => {
  if (path.startsWith('/auth/project')) return;
  router.push(path);
};
</script>
<style lang="less" scoped>
.nav-breadcrumb {
  margin: 10px 20px;
}
</style>
