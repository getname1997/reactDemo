import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import commonStorage from '@/utils/commonStorage';
import { message } from 'antd';
const service = axios.create({
  baseURL: process.env.FLUTTER_STORAGE_BASE_URL,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});
// 请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log('config', config);
    if (config.url === '/auth/login') {
      return config;
    }
    // 添加token
    if (commonStorage.get('token')) {
      (config.headers as AxiosRequestHeaders).Authorization = commonStorage.get(
        'token',
      ) as string;
    } else {
      // 返回登入页 + 报错
      message.error('没有携带token');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      commonStorage.remove('token');
      message.warn('token过期');
    }
    return Promise.reject(error);
  },
);

export default service;
