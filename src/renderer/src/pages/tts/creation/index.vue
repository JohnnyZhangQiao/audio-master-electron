<template>
  <section>
    <t-textarea
      v-model="text"
      :maxlength="500"
      :autosize="{ minRows: 10, maxRows: 10 }"
      placeholder="请输入文本"
      @change="() => (isEdited = true)"
    />
    <t-row :gutter="[10, 0]" align="center" style="height: 52px">
      <t-col :span="2">
        <t-select v-model="voiceType" :options="filterTimbre" @change="() => (isEdited = true)" />
      </t-col>
      <t-col :span="1">
        <t-button :loading="loading" :disabled="!text || !isEdited" @click="gene">合成</t-button>
      </t-col>
      <t-col :span="9">
        <AudioPlayer :url="url" />
      </t-col>
    </t-row>
  </section>
</template>

<script setup lang="tsx" name="creation">
import request from '@renderer/api';
import AudioPlayer from '@renderer/components/audioPlayer/AudioPlayer.vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { userStore } from '@renderer/store';

const text = ref('');
const loading = ref(false);
const url = ref('');
const isEdited = ref(false);
const useUser = userStore();
const TIMBRE_MAPPER = [
  {
    value: 1,
    label: '英语_女声',
  },
  {
    value: 2,
    label: '英语_男声',
  },
  {
    value: 3,
    label: '音色3-晓慧',
  },
  {
    value: 4,
    label: '音色4-鹏哥',
  },
  {
    value: 5,
    label: '音色5-派萌',
  },
  {
    value: 6,
    label: '音色6-晓莉',
  },
  {
    value: 7,
    label: '音色7-诺艾尔',
  },
  {
    value: 8,
    label: '音色8',
  },
  {
    value: 9,
    label: '德刚',
  },
  {
    value: 10,
    label: '德华',
  },
  {
    value: 11,
    label: '包老师',
  },
  {
    value: 12,
    label: '阿乐',
  },
];
const filterTimbre = computed(() =>
  [
    {
      value: 0,
      label: '请选择',
    },
  ].concat(TIMBRE_MAPPER.filter((item) => useUser.state.roles.includes(item.value))),
);
const voiceType = ref(filterTimbre.value[0].value);

const geneAudio = () => {
  if (loading.value) return;

  loading.value = true;
  request.tts
    .getPcmBuffer({
      params: {
        codec: 'mp3',
        pid: 123,
        key: 'tencent',
        voice_type: voiceType.value,
        text: encodeURIComponent('<speak>' + text.value + '</speak>'),
      },
    })
    .then((res) => {
      url.value = 'https://tts.woa.com/portal/assets/media/combine01.84aeaf0d.mp3';
    })
    .finally(() => {
      loading.value = false;
    });
};

const gene = () => {
  if (!voiceType.value) {
    MessagePlugin.warning('请选择音色');
    return;
  }
  isEdited.value = false;
  url.value = `http://${ENV.TARGET_URL}/tts?codec=mp3&pid=123&key=tencent&voice_type=${
    voiceType.value
  }&text=${encodeURIComponent('<speak>' + text.value + '</speak>')}`;
};
</script>

<style lang="less" scoped></style>
