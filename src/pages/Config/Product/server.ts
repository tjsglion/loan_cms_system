// import request from '@/utils/request';
import HttpClient from '@/core/http.request';

// 获取产品列表
export async function fetchProductList (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/base/creditProduct/list', params);
}

// 保存产品信息
export async function fetchAddOrEditProduct (
  params: {[key: string]: any},
  isEdit: boolean
) {
  return HttpClient.post(
    !isEdit 
      ? '/api/base/creditProduct/create'
      : '/api/base/creditProduct/update',
    params
  );
}

export async function fetchProductById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/base/creditProduct/getByProductId', params);
}

// 获取所有产品字段
export async function fetchAllProductFields (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api//base/productField/listAll', params)
}

// 根据产品id获取产品字段信息
export async function fetchProductFields (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/base/productField/listByProductId', params);
}