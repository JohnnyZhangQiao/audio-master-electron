<template>
  <result title="403 Forbidden" tip="抱歉，您无权限访问此页面" type="403">
    <t-button @click="() => router.push('/')">返回首页</t-button>
  </result>
</template>

<script setup lang="tsx" name="Result403">
import { useRouter } from 'vue-router';

import result from '@renderer/components/result/index.vue';

const router = useRouter();
</script>
