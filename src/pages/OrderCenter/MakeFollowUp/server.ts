import HttpClient from '@/core/http.request';

// 做单跟进列表
export async function fetchFollowLogList (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/work/loan/followLog/list', params);
}