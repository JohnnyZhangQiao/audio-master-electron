<template>
  <section class="bar-container">
    <ChevronLeftIcon class="back-icon" @click="handlerBack" />
    <slot class="bar-content" name="content" />
    <slot class="option-tools" name="tools" />
  </section>
</template>

<script setup lang="tsx" name="BarTools">
import { ChevronLeftIcon } from 'tdesign-icons-vue-next';
import { useRouter } from 'vue-router';

interface IProps {
  backAction?: Function;
}

const props = withDefaults(defineProps<IProps>(), {
  backAction: () => void 0,
});

const router = useRouter();

function handlerBack() {
  const { backAction } = props;

  if (typeof backAction === 'function') backAction();
  else router.back();
}
</script>

<style lang="less" scoped>
.bar-container {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  line-height: 64px;
  background-color: #fff;
  border-bottom: 1px solid #e7e7e7;
  z-index: 10;
  .back-icon {
    margin: 0 10px;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    padding: 0 5px;
    font-size: 30px;
    &:hover {
      background-color: #f2f2f2;
      cursor: pointer;
    }
  }
  .bar-content {
    width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .option-tools {
  }
}
</style>
