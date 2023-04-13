import request from '@/request/request';
import type { Config } from './type';
import api from '@/request/api';
const server = (url: string, param?: any, method = 'get') => {
  let config: Config = {
    url,
    method,
  };
  if (method === 'get' || method === 'DELETE') {
    config.params = param;
  } else {
    config.data = param;
  }
  return request(config);
};

export { server, api };
