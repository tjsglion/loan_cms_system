import HttpClient from '@/core/http.request';

// 客户分配列表
export async function fetchCustomerAllotList (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/work/base/distribute/list', params);
}

// 添加或修改客户分配
export async function fetchAddOrEditAllot (
  params: {[key: string]: any},
  isEdit: boolean
) {
  return HttpClient.post(
    !isEdit 
      ? '/api/work/base/distribute/create'
      : '/api/base/creditProduct/update',
    params
  )
}

// 根据 id 获取详情
export async function fetchAllotById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/distribute/getById', params);
}