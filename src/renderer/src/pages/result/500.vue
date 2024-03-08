<template>
  <result title="500 Internal Server Error" type="500" tip="抱歉，服务器出错啦">
    <t-button @click="() => router.push('/')">返回首页</t-button>
  </result>
</template>

<script setup lang="tsx" name="Result500">
import { useRouter } from 'vue-router';

import result from '@renderer/components/result/index.vue';

const router = useRouter();
</script>
