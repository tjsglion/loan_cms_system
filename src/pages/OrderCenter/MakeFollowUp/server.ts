import HttpClient from '@/core/http.request';

// 做单跟进列表
export async function fetchFollowLogList (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/work/loan/followLog/list', params);
}

// 新增/编辑做单信息
export async function queryAddOrEditFollupUp (
  params: {[key: string]: any},
  type: string
) {
  return HttpClient.post(
    type === 'add'
      ? '/api/work/loan/expect/create'
      : '/api/work/loan/expect/update',
    params
  );
}

// 添加签单信息
export async function queryAddOrEditSign (
  params: {[key: string]: any},
  type: string
) {
  return HttpClient.post(
    type === 'add'
      ? '/api/work/loan/signUpDetails/create'
      : '/api/work/loan/signUpDetails/update',
    params
  );
}

// 获取签单信息
export async function queryCustomerSignUpDetailsByWorkNo (
  params: {[key: string]: any}
) {
  return HttpClient.post(
    '/api/work/loan/signUpDetails/getByWorkNo',
    params
  );
}

// 下载
export async function fetchOrderDownload (
  params: {[key: string]: any}
) {
  return HttpClient.post(
    '/api/work/loan/followLog/download',
    params
  )
}