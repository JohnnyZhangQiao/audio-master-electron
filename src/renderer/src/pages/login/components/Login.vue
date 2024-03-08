<template>
  <t-form
    ref="form"
    :class="['item-container', `login-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type === 'password'">
      <t-form-item name="user">
        <t-input v-model="formData.user" size="large" placeholder="请输入用户名">
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input
          v-model="formData.password"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          placeholder="请输入密码"
        >
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
          <template #suffix-icon>
            <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
          </template>
        </t-input>
      </t-form-item>

      <div class="check-container remember-pwd">
        <t-checkbox>记住账号</t-checkbox>
        <span class="tip" @click="() => emit('forgetPassword')">忘记密码？</span>
      </div>
    </template>

    <t-form-item class="btn-container">
      <t-button block size="large" type="submit">登录</t-button>
    </t-form-item>
  </t-form>
</template>

<script setup lang="tsx" name="login">
import { useRouter } from 'vue-router';
import { login } from '@renderer/utils/userLogin';
import type { FormInstanceFunctions, FormRule, SubmitContext } from 'tdesign-vue-next';

const FORM_RULES: Record<string, FormRule[]> = {
  user: [{ required: true, type: 'error' }],
  password: [{ required: true, type: 'error' }],
};
const type = ref('password');
const form = ref<FormInstanceFunctions>();
const formData = ref({ user: '', password: '' });
const showPsw = ref(false);
const router = useRouter();
const emit = defineEmits(['forgetPassword']);

/**
 * 登录
 * @param ctx
 */
const onSubmit = async (ctx: SubmitContext) => {
  if (ctx.validateResult === true) {
    login(formData.value.user, formData.value.password)
      .then(() => router.push('tts/creation'))
      .catch((e) => console.log(e));
  }
};
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
