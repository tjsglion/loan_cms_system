// import request from '@/utils/request';
import HttpClient from '@/core/http.request';

// 获取产品列表
export async function fetchLogsList (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/base/operLog/list', params);
}

