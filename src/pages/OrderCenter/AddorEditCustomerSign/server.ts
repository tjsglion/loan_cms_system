
import HttpClient from '@/core/http.request';

// 分页查找用户列表
export async function queryAddSignUpBase (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/loan/signUpBase/create', params)
}

