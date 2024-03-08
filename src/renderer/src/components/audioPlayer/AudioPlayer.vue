<template>
  <section style="height: 52px">
    <Player ref="playerRef" class="audio-player" :volume="props.volume" :style="props.styles">
      <Audio>
        <source :data-src="props.url" />
      </Audio>
      <Ui no-controls>
        <Controls class="controller">
          <PlaybackControl hide-tooltip class="player-icon" />
          <TimeProgress class="time-progress" separator="/" />
          <ScrubberControl class="player-bar" />
          <img class="download-icon" :src="downloadIcon" alt="" @click="downloadWav" />
          <VolumeControl class="player-volume" hide-tooltip />
        </Controls>
      </Ui>
    </Player>
  </section>
</template>

<script setup lang="tsx" name="audio-player">
// VimeJs API https://vimejs.com/
import '@vime/core/themes/default.css';
import downloadIcon from '@renderer/assets/images/download.svg';
import {
  Audio,
  Controls,
  PlaybackControl,
  Player,
  ScrubberControl,
  TimeProgress,
  Ui,
  VolumeControl,
} from '@vime/vue-next';
import type { StyleValue } from 'vue';

interface IProps {
  // 样式覆盖
  styles?: StyleValue;
  // 音频url
  url: string;
  // 音频音量
  volume?: number;
  //是否自动播放
  autoplay?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  styles: () => ({}),
  url: () => '',
  volume: () => 100,
  autoplay: () => false,
});

const playerRef = ref<typeof Player>();
const isPaused = ref(!props.autoplay);
watch(
  () => props.url,
  () => {
    setTimeout(() => {
      playerRef.value?.canPlay().then(() => {
        playerRef.value?.play();
      });
    }, 200);
  },
);

function download(href: string, filename = '') {
  console.log(href);
  const a = document.createElement('a');
  a.download = filename;
  a.href = href;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function downloadFile(url: string, filename = '') {
  fetch(url, {
    headers: new Headers({
      Origin: window.location.origin,
    }),
    mode: 'cors',
  })
    .then((res) => res.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      download(blobUrl, filename);
      window.URL.revokeObjectURL(blobUrl);
    });
}

const downloadWav = () => {
  downloadFile(props.url, `音频_${Date.now()}`);
};
</script>

<style lang="less" scoped>
.audio-player {
  width: 100%;
  --vm-color-white-200: rgba(0, 0, 0, 0.4);
  .controller {
    --vm-controls-bg: #fafafa;

    //icon
    .player-icon,
    .player-volume {
      --vm-icon-fill: #0052d9;
      transform: scale(0.8);
      --vm-icon-transform: scale(1.2);
      --vm-control-focus-bg: #ececec;
    }

    //时间
    .time-progress {
      --vm-time-color: #5a5a5a;
    }

    //进度条
    .player-bar {
      flex: calc(100% - 320px);
      margin: 0 20px;
      --vm-slider-value-color: #0052d9;
      --vm-slider-thumb-bg: #0052d9;
      --vm-slider-track-height: 5px;
    }

    //下载
    .download-icon {
      margin: 0 5px;
      width: 24px;
      height: 24px;
      cursor: pointer;
      &:hover {
        background-color: #ececec;
        box-shadow: 0 0 0 3px #ececec;
        border-radius: 1px;
      }
    }

    //音量
    .player-volume {
      --vm-slider-value-color: #0052d9;
      --vm-slider-thumb-bg: #0052d9;
    }
  }
  :deep(.player-bar) {
    pointer-events: none;
  }
}
</style>
