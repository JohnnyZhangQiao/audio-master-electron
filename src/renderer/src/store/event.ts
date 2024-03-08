import { defineStore } from 'pinia';

import type { IEvent } from '@renderer/types/event/paasEvent';

// 事件store
export const eventStore = defineStore('eventStore', () => {
  const event = reactive<IEvent>({
    loading: false,
  });

  /**
   * 设置event通用值
   * @param data
   */
  function setItem(data: Partial<IEvent>) {
    if (typeof data === 'object') {
      Object.keys(data).forEach((key: string) => {
        if (event.hasOwnProperty(key)) {
          // @ts-ignore
          event[key] = data[key];
        }
      });
    }
  }

  return { event, setItem };
});
