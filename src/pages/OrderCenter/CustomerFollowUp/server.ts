import HttpClient from '@/core/http.request';

// 客户跟进
export async function fetchCustomerFollowLogList (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/work/base/followLog/list', params);
}

// 获取用户详情
export async function fetchFollowById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/followLog/getById', params);
}

// 添加点评
export async function fetchAddComments (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/followLogComment/create', params);
}
