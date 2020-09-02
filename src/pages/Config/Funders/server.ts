// import request from '@/utils/request';
import HttpClient from '@/core/http.request';

// 获取出资方列表
export async function fetchFundersList (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/base/capital/list', params);
}

// 保存出资方信息
export async function fetchAddOrEditFunders (
  params: {[key: string]: any},
  isEdit: boolean
) {
  return HttpClient.post(
    !isEdit 
      ? '/api/base/capital/create'
      : '/api/base/capital/update',
    params
  );
}

// 根据id获取资方信息
export async function fetchFundersById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/base/capital/getByCapitalId', params);
}