import axios from 'axios';
import { NotifyPlugin } from 'tdesign-vue-next';

import { eventStore } from '@renderer/store/event';
import type { AxiosError, AxiosInstance, AxiosRequestHeaders } from 'axios';
import type { IRequestParams, IRequestResponse } from '@renderer/types/global/request';

interface MyAxiosInstance extends AxiosInstance {
  (config: IRequestParams): Promise<any>;
  (url: string, config?: IRequestParams): Promise<any>;
}

// 创建axios实例
const axiosInstance: MyAxiosInstance = axios.create({
  timeout: 30000,
  withCredentials: true,
  baseURL: `//${ENV.TARGET_URL}`,
});

/**
 * 设置请求头部参数
 * @param config
 */
function setDefaultHeader(config: Partial<AxiosRequestHeaders>) {
  Object.keys(config).forEach((key: string) => {
    axiosInstance.defaults.headers.common[key] = config[key];
  });
}

// 初始化拦截器
function initInterceptors() {
  const useEvent = eventStore();

  // 设置post请求头
  setDefaultHeader({
    ['Content-Type']: 'application/json',
    ['X-Requested-With']: 'XMLHttpRequest',
  });
  /**
   * 请求拦截器
   * 每次请求前，如果存在token则在请求头中携带token
   */
  axiosInstance.interceptors.request.use((config) => {
    useEvent.event.loading = true;

    return config;
  });

  // 响应拦截器
  axiosInstance.interceptors.response.use(
    // 请求成功
    (response: IRequestResponse) => {
      useEvent.event.loading = false;

      const { data } = response;
      const httpConfig: IRequestParams = response.config;

      // 状态码判断
      if (response.status !== 200) {
        errorHandle(response, '请求出错');
        return Promise.reject(data);
      }

      // 非标准化数据
      if (httpConfig.notClassified) return data;

      // server错误码判断
      if (data?.err_no !== 0) {
        errorHandle(response, data?.err_msg || '请求出错');
        return Promise.reject(data);
      }

      return data;
    },
    // 请求失败
    (error: AxiosError): Promise<any> => {
      useEvent.event.loading = false;

      const { response, config } = error;
      if (response) {
        // 请求已发出，但是不在2xx的范围
        errorHandle(response);
      } else {
        !(config as IRequestParams)?.notNotify &&
          NotifyPlugin('error', {
            title: '请求失败',
            content: '网络异常,请刷新页面或稍后重试!',
          }).then();
      }
      return Promise.reject(response?.data);
    },
  );
}

/**
 * http握手错误
 * @param res 响应回调,根据不同响应进行不同操作
 * @param message
 */
function errorHandle(res: IRequestResponse, message?: string) {
  // 状态码判断
  switch (res.status) {
    case 401:
      break;
    case 403:
      break;
    case 404:
      NotifyPlugin('error', {
        title: '请求失败',
        content: '请求的资源不存在',
      }).then();
      break;
    default:
      // 错误信息判断
      NotifyPlugin('error', {
        title: '请求失败',
        content: message,
      }).then();
  }
}

export default {
  axiosInstance,
  setDefaultHeader,
  initInterceptors,
};
