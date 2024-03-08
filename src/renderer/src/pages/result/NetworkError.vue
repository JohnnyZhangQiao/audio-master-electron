<template>
  <result title="网络异常" tip="网络异常，请稍后再试" type="wifi">
    <t-button theme="default" @click="() => router.push('/')">返回首页</t-button>
  </result>
</template>

<script setup lang="tsx" name="ResultNetworkError">
import { useRouter } from 'vue-router';

import result from '@renderer/components/result/index.vue';

const router = useRouter();
</script>
