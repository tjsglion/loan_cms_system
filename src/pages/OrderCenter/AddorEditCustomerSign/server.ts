
import HttpClient from '@/core/http.request';

// 分页查找用户列表
export async function queryAddSignUpBase (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/loan/signUpBase/create', params)
}

export async function queryProductExpandInfoByProductIdAndCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/loan/signUpBase/getProductField', params);
}

// 根据 cutomerId 获取公司信息
export async function queryCompanyBuCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/company/company/list', params);
}

// 新增产品字段
export async function queryCustomerProductField (
  params: {[key: string]: any}, 
  type: string
) {
  return HttpClient.post(type === 'add' ? '/api/work/loan/customerProductField/add' : '/api/work/loan/customerProductField/update', params);
}

// 获取用户产品字段信息
export async function queryCustomerProductFieldByWorkNo (
  params: {workNo: string}
) {
  return HttpClient.post('/api/work/loan/customerProductField/getById', params);
}