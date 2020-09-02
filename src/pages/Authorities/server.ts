// 权限管理页面公共接口
import HttpClient from '@/core/http.request';

// 分页查找
export async function queryLists (
  params: {[key: string]: any}
) {
  return HttpClient.list('/api/user/opAccount/list', params)
}

// 重置密码
export async function queryResetPwd (
  params: {[key: string]: any} 
) {
  return HttpClient.post('/api/user/opAccount/resetPassword', params);
}
