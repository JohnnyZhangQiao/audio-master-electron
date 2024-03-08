<template>
  <t-form
    ref="form"
    :class="['item-container', `register-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type === 'phone'">
      <t-form-item name="phone">
        <t-input v-model="formData.phone" :maxlength="11" size="large" placeholder="请输入您的手机号">
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>
    </template>

    <template v-if="type === 'name'">
      <t-form-item name="name">
        <t-input v-model="formData.name" type="text" size="large" placeholder="请输入您的账号">
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>
    </template>

    <t-form-item name="password">
      <t-input
        v-model="formData.password"
        size="large"
        :type="showPsw ? 'text' : 'password'"
        clearable
        placeholder="请输入登录密码"
      >
        <template #prefix-icon>
          <t-icon name="lock-on" />
        </template>
        <template #suffix-icon>
          <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
        </template>
      </t-input>
    </t-form-item>

    <t-form-item class="check-container" name="checked">
      <t-checkbox v-model="formData.checked">我已阅读并同意 </t-checkbox> <span>服务协议</span> 和
      <span>隐私声明</span>
    </t-form-item>

    <t-form-item>
      <t-button block size="large" type="submit"> 注册 </t-button>
    </t-form-item>
  </t-form>
</template>

<script setup lang="tsx">
import type { FormRule, SubmitContext } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

const INITIAL_DATA = {
  phone: '',
  name: '',
  password: '',
  verifyCode: '',
  checked: false,
};

const FORM_RULES: Record<string, FormRule[]> = {
  phone: [{ required: true, message: '手机号必填', type: 'error' }],
  name: [
    { required: true, message: '账号必填', type: 'error' },
    { pattern: /^[a-zA-Z0-9]+$/, message: '账号不包含中文和标点符号', type: 'error' },
  ],
  password: [{ required: true, message: '密码必填', type: 'error' }],
  verifyCode: [{ required: true, message: '验证码必填', type: 'error' }],
  checked: [
    {
      validator: (val) => {
        if (!val) return { result: false, message: '请先勾选同意协议', type: 'error' };
        return { result: true, message: '', type: 'success' };
      },
    },
  ],
};

const type = ref('name');

const form = ref();
const formData = ref({ ...INITIAL_DATA });

const showPsw = ref(false);

const emit = defineEmits(['registerSuccess']);

const onSubmit = (ctx: SubmitContext) => {
  if (ctx.validateResult === true) {
    MessagePlugin.success('注册成功');
    emit('registerSuccess');
  }
};

const switchType = (val: string) => {
  form.value.reset();
  type.value = val;
};
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
