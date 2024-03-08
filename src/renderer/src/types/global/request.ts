import { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * 请求参数类型
 */
export interface IRequestParams extends AxiosRequestConfig {
  desc?: string;
  isJSON?: boolean;
  // 返回格式是否遵循标准结构 false | null: 遵守
  notClassified?: boolean;
  // 异常时是否自动弹出错误消息，为true时不弹，让业务方自己处理
  notNotify?: boolean;
}

/**
 * 请求响应类型
 */
export interface IRequestResponse<T = any> extends AxiosResponse {
  data: { err_no: number; err_msg?: string } & T;
}
