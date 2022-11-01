import request from '@/request/request';
import type { Config } from './type';

const server = (url: string, param?: any, method = 'get') => {
  let config: Config = {
    url,
    method,
  };
  if (method === 'get') {
    config.params = param;
  } else {
    config.data = param;
  }
  return request(config);
};

export default server;
