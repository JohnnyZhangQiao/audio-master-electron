<template>
  <t-header>
    <t-head-menu :style="props.style">
      <template #logo>
        <div class="logo-style">
          <a :href="portalSite"><img src="@renderer/assets/images/title.png" alt="" /></a>
        </div>
      </template>
      <template #operations>
        <div v-show="useEvent.event.loading" class="icon-style">
          <t-icon name="loading" />
        </div>
        <t-dropdown :options="options" :min-column-width="150">
          <div class="user-style">
            <t-icon class="avatar-style" name="user-circle" />
            <span>{{ useUser.state.name }}</span>
          </div>
        </t-dropdown>
      </template>
    </t-head-menu>
  </t-header>
</template>

<script setup lang="tsx" name="LayoutHeader">
import { useRouter } from 'vue-router';
import { eventStore, userStore } from '@renderer/store';
import { logout } from '@renderer/utils/userLogin';
import type { CSSProperties } from 'vue';

interface IProps {
  /**
   * 要隐藏的工具栏，默认空数组「全展示」
   * notification：通知
   * loading：全局加载锁
   */
  toolsHidden?: Array<'notification' | 'loading'>;
  style?: CSSProperties;
}

const props = withDefaults(defineProps<IProps>(), {
  toolsHidden: () => [],
  style: () => ({}),
});
const router = useRouter();
const useUser = userStore();
const useEvent = eventStore();
const options = computed(() => {
  return [
    {
      content: '退出登录',
      value: 1,
      onClick: () => {
        logout();
        router.push('/login');
      },
    },
  ];
});
const portalSite = `${location.origin}${location.pathname}`;
</script>

<style lang="less" scoped>
.logo-style {
  position: relative;
  width: 165px;
  height: 100%;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  img {
    height: 30px;
    position: absolute;
    top: 50%;
    transform: translate(10px, -50%);
  }
}
.icon-style {
  padding: 8px;
  line-height: 0;
  font-size: 20px;
  border-radius: 3px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }
}
.user-style {
  padding: 3px 10px;
  line-height: 0;
  border-radius: 3px;
  .avatar-style {
    margin: 3px 10px 3px 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    vertical-align: middle;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }
}
</style>
