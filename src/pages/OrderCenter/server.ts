import HttpClient from '@/core/http.request';

// 分页查找用户列表
export async function queryCustomerLists (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/work/base/customer/list', params)
}

// 根据id获取用户信息
export async function queryCustomerById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/customer/getByCustomerId', params);
}

// 根据 id 获取做单信息
export async function queryCustomerLoanExpectById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/loan/expect/getById', params);
}

// 分页查找做单列表
export async function queryExpectList (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/work/loan/expect/list', params)
}
