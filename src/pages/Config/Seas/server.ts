// import request from '@/utils/request';
import HttpClient from '@/core/http.request';

// 获取参数详情
export async function fetchConfigForProductId (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/base/publicConfig/getByProductId', params);
}

// 更新配置
export async function fetchUpdateConfig (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/base/publicConfig/update', params);
}
