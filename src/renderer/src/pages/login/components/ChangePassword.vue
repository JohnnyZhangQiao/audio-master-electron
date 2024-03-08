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
          placeholder="请输入旧密码"
        >
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
          <template #suffix-icon>
            <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="new_password">
        <t-input
          v-model="formData.new_password"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          placeholder="请输入新密码"
        >
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
          <template #suffix-icon>
            <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="rePassword">
        <t-input
          v-model="formData.rePassword"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          placeholder="请再次输入"
        >
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
          <template #suffix-icon>
            <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
          </template>
        </t-input>
      </t-form-item>
    </template>

    <t-form-item class="btn-container">
      <t-button block size="large" type="submit">确认修改</t-button>
    </t-form-item>
  </t-form>
</template>

<script setup lang="tsx" name="changePassword">
import { FormInstanceFunctions, FormRule, MessagePlugin, SubmitContext } from 'tdesign-vue-next';
import request from '@renderer/api';

const type = ref('password');
const form = ref<FormInstanceFunctions>();
const formData = ref({ user: '', password: '', new_password: '', rePassword: '' });
const showPsw = ref(false);
const emit = defineEmits(['changeSuccess']);

const rePassword = (val: string) => {
  if (formData.value.new_password !== val) {
    return { result: false, message: '两次密码不一致', type: 'error' };
  } else return { result: true, message: '', type: 'success' };
};

const FORM_RULES: Record<string, FormRule[]> = {
  user: [{ required: true, type: 'error' }],
  password: [{ required: true, type: 'error' }],
  new_password: [{ required: true, type: 'error' }],
  rePassword: [{ required: true, type: 'error' }, { validator: rePassword }],
};

/**
 * 登录
 * @param ctx
 */
const onSubmit = async (ctx: SubmitContext) => {
  if (ctx.validateResult === true) {
    request.login.changePassword({ data: formData.value }).then(() => {
      MessagePlugin.success('修改成功');
      emit('changeSuccess');
    });
  }
};
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
