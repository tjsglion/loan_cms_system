// 权限管理页面公共接口
import request from '@/utils/request';

// 分页查找
export async function queryLists (
  params: {[key: string]: any}
) {
  return request('/api/config/product/getListInfo', {
    params
  })
}
