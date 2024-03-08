<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="title-container">
        <h1 class="title margin-no">欢迎登录到</h1>
        <h1 class="title">TTS</h1>
        <div class="sub-title">
          <p class="tip">{{ type === 'register' ? '已有账号?' : type === 'login' ? '没有账号吗?' : '您可以返回' }}</p>
          <p class="tip" @click="switchType(type === 'register' || type === 'changePassword' ? 'login' : 'register')">
            {{ type === 'register' || type === 'changePassword' ? '登录' : '注册新账号' }}
          </p>
        </div>
      </div>

      <login v-if="type === 'login'" @forget-password="switchType('changePassword')" />
      <register v-else-if="type === 'register'" @register-success="switchType('login')" />
      <ChangePassword v-else-if="type === 'changePassword'" @change-success="switchType('login')" />
    </div>

    <footer class="copyright">Copyright @ 2023-{{ new Date().getFullYear() }} xx. All Rights Reserved</footer>
  </div>
</template>

<script setup lang="tsx" name="Login">
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import ChangePassword from './components/ChangePassword.vue';
import { MessagePlugin } from 'tdesign-vue-next';

const type = ref('login');
const switchType = (val: string) => {
  if (val === 'register') {
    MessagePlugin.info('暂不开放注册');
    return;
  }
  type.value = val;
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
