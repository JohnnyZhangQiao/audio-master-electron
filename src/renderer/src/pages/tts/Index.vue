<template>
  <Layout :styles="{ padding: '20px', backgroundColor: '#fff' }" :menu="[routes]">
    <router-view />
  </Layout>
</template>

<script setup lang="tsx" name="tts">
import Layout from '@renderer/components/layout/Layout.vue';

import routes from './router';
</script>
