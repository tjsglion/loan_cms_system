// 权限管理页面公共接口
import HttpClient from '@/core/http.request';

// 分页查找
export async function queryLists (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/user/opRole/list', params);
}

export async function queryDepLists (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/user/department/list', params);
}

// 新增
export async function queryAddRoles (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/user/opRole/create', params)
}

// 更新
export async function queryUpdateRoles (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/user/opRole/update', params)
}

// 根据id获取角色详情
export async function queryRoleById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/user/opRole/getById', params)
}

// 获取所有权限列表
export async function queryAllPrivis (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/user/opPrivi/listAllPrivis', params)
}