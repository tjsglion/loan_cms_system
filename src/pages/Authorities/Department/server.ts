// 权限管理页面公共接口
import HttpClient from '@/core/http.request';

// 分页查找
export async function queryLists (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/user/department/list', params)
}

// 添加Or更新部门信息
// export async function queryAddOrUpdateDepartment (
//   params: {[key: string]: any}
// ) {
//   const { type } = params;
//   // eslint-disable-next-line no-param-reassign
//   delete params.type;
//   return HttpClient.post(type === 'add' ? '/api/user/department/create' :'/user/department/update', params);
// }
export async function queryAddDepartment (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/user/department/create', params)
}

// 更新部门
export async function queryUpdateDepartment (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/user/department/update', params)
}
