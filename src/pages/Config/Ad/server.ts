// import request from '@/utils/request';
import HttpClient from '@/core/http.request';

// 获取产品列表
export async function fetchAdList (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/base/news/list', params);
}

// 保存产品信息
export async function fetchAddOrEditAd (
  params: {[key: string]: any},
  isEdit: boolean
) {
  return HttpClient.post(
    !isEdit 
      ? '/api/base/news/create'
      : '/api/base/news/update',
    params
  );
}
