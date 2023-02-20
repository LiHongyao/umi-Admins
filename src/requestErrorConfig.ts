/*
 * @Author: Lee
 * @Date: 2023-02-20 11:39:12
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-20 12:24:42
 * @Description:
 */
import type { RequestOptions } from '@@/plugin-request/request';
import { history, RequestConfig } from '@umijs/max';
import { message } from 'antd';

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  timeout: 20 * 1000,
  baseURL: process.env.HOST,
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      console.log(error);
    },
  },

  // 👉 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      if (config.method && /get/i.test(config.method)) {
        config.params = { ...config.params, timeState: Date.now() };
      }
      return {
        ...config,
        headers: {
          ...config.headers,
          'Content-Type': 'application/json',
          token: localStorage.getItem('XXX_TOKEN') || '',
        },
      };
    },
  ],

  // 👉 响应拦截器
  responseInterceptors: [
    (response) => {
      // -- 获取响应头里面的token
      /*const token = response.headers.get('token');
      if (token) {
        Storage.set('XXX_TOKEN', token);
      }*/
      // -- 拦截响应数据，进行个性化处理
      message.destroy();
      const { data } = response as unknown as API.BaseResponse;
      switch (data.code) {
        case 200:
          return response;
        case 401:
          history.push('/login');
          return response;
        default:
          if (!/login/.test(response.config.url || '')) {
            message.error(data.msg);
          }
          return response;
      }
    },
  ],
};
