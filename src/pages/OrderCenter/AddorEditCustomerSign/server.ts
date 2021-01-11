
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