import { userStore } from '@renderer/store';
import request from '@renderer/api';
import { MessagePlugin } from 'tdesign-vue-next';

/**
 * 获取用户信息
 */
export const isLogin = () => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch {}
  if (!user) return false;

  const useUser = userStore();
  useUser.setUser(user);
  return true;
};

/**
 * 用户登录
 * @param name
 * @param password
 */
export const login = async (name: string, password: string): Promise<string> => {
  if (!name || !password) {
    MessagePlugin.error('账号密码不能为空').then();
    return Promise.reject();
  }

  const { list = '' } = await request.login.login({ data: { user: name, password } });
  const useUser = userStore();
  const user = { name, roles: list.split(',').map((item) => Number(item)) };
  useUser.setUser(user);
  localStorage.setItem('user', JSON.stringify(user));
  MessagePlugin.success('登录成功').then();
  return Promise.resolve(list);
};

/**
 * 退出登录
 */
export const logout = () => {
  const useUser = userStore();
  localStorage.removeItem('user');
  useUser.setUser({ name: '', roles: [] });
};
