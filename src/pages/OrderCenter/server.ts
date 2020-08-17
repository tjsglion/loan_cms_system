import HttpClient from '@/core/http.request';

// 分页查找用户列表
export async function queryCustomerLists (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/work/base/customer/list', params)
}

// 分页查找做单列表
export async function queryExpectList (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/work/loan/expect/list', params)
}
