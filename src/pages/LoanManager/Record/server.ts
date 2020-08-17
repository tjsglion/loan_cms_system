import HttpClient from '@/core/http.request';

// 获取产品列表
export async function fetchRecordList (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/work/maintain/visitRecord/list', params);
}