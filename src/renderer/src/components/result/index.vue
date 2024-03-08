<template>
  <div class="result-container">
    <div class="result-bg-img">
      <img :src="dynamicComponent" alt="" />
    </div>
    <div class="result-title">{{ props.title }}</div>
    <div class="result-tip">{{ props.tip }}</div>
    <slot />
  </div>
</template>

<script setup lang="tsx" name="Result">
import Result403Icon from '@renderer/assets/images/result/assets-result-403.png';
import Result404Icon from '@renderer/assets/images/result/assets-result-404.png';
import Result500Icon from '@renderer/assets/images/result/assets-result-500.png';
import ResultWifiIcon from '@renderer/assets/images/result/assets-result-wifi.png';

interface IProps {
  title: string;
  tip: string;
  type: string;
}

const props = withDefaults(defineProps<IProps>(), {
  title: () => '',
  tip: () => '',
});

const dynamicComponent = computed(() => {
  switch (props.type) {
    case '403':
      return Result403Icon;
    case '404':
      return Result404Icon;
    case '500':
      return Result500Icon;
    case 'wifi':
      return ResultWifiIcon;
    default:
      return '';
  }
});
</script>

<style lang="less" scoped>
.result-container {
  margin: 0 auto;
  width: 400px;
  font-size: 20px;
  text-align: center;
  .result-bg-img {
    padding: 200px 0 20px 0;
    > img {
      width: 100%;
    }
  }
  .result-title {
    font-size: 30px;
    line-height: 50px;
  }
  .result-tip {
    margin-bottom: 20px;
    color: #7b7b7b;
  }
}
</style>
