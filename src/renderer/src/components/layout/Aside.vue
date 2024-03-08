<template>
  <t-menu
    class="aside-style"
    width="200px"
    :collapsed="collapsed"
    :default-expanded="defaultExpanded.length ? defaultExpanded : router.currentRoute.value.matched.map((r) => r.path)"
    :value="menuActiveValue"
  >
    <template #logo>
      <t-input v-show="!collapsed" v-model="searchValue" class="search-input">
        <template #label>
          <SearchIcon />
        </template>
      </t-input>
    </template>
    <div v-for="(item, key) in menu.filter((m) => !m.meta?.hideInMenu)" :key="key">
      <SubMenuRender :item="item" />
    </div>

    <template #operations>
      <t-icon class="t-menu__operations-icon" name="view-list" @click="collapseChange" />
    </template>
  </t-menu>
</template>

<script setup lang="tsx" name="LayoutAside">
import { InternetIcon, SearchIcon } from 'tdesign-icons-vue-next';
import { MenuItem, Submenu } from 'tdesign-vue-next';
import { useRouter } from 'vue-router';

import type { TRouter } from '@renderer/types/global/router';

interface IProps {
  menu?: Array<TRouter>;
  defaultExpanded?: string[];
}

const props = withDefaults(defineProps<IProps>(), {
  menu: () => [],
  defaultExpanded: () => [],
});

const collapsed = ref<boolean>(false);
const router = useRouter();
const searchValue = ref<string>('');
const menuActiveValue = computed(() => {
  return router.currentRoute.value.meta?.activeMatched || router.currentRoute.value.path;
}); // 侧边栏高亮项

function collapseChange() {
  collapsed.value = !collapsed.value;
}

/**
 * 菜单项render
 * @param item
 * @constructor
 */
const MenuItemRender = ({ item }: { item: TRouter }) => {
  const IconJsx = item.meta?.icon || InternetIcon;
  return (
    item.meta?.navigation?.includes(searchValue.value) && (
      <MenuItem value={item.path} icon={() => <IconJsx />} content={item.meta?.navigation || '功能组'} to={item.path} />
    )
  );
};

/**
 * 菜单组render
 * @param item
 * @constructor
 */
const SubMenuRender = ({ item }: { item: TRouter }) => {
  const IconJsx = item.meta?.icon || InternetIcon;

  return (
    !item.meta?.hideInMenu && (
      <>
        {item.children && item.children.length > 0 ? (
          <Submenu title={item.meta?.navigation || '功能组'} value={item.path} icon={() => <IconJsx />}>
            {item.children?.map((child) => <SubMenuRender item={child} />)}
          </Submenu>
        ) : (
          <MenuItemRender key={item.path} item={item} />
        )}
      </>
    )
  );
};
</script>

<style lang="less" scoped>
@import '@renderer/assets/less/globalVar.less';

.aside-style {
  border-top: 1px solid var(--td-component-stroke);
  flex-shrink: 0;
  .search-input {
    margin: 0 7px;
  }
  .icon-style {
    font-size: 20px;
  }
  .avatar-style {
    margin: 0 10px;
    width: 30px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
</style>
