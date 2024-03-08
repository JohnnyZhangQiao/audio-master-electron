import { defineStore } from 'pinia';

type TUser = { name: string; roles: number[] };

// 用户store
export const userStore = defineStore('userStore', () => {
  const state = reactive<TUser>({
    name: '',
    roles: [],
  });

  /**
   * 设置user
   * @param data
   */
  function setUser(data: Partial<TUser>) {
    if (typeof data === 'object') {
      Object.keys(data).forEach((key: string) => {
        if (key in state) {
          state[key] = data[key];
        }
      });
    }
  }

  return { state, setUser };
});
