
import HttpClient from '@/core/http.request';

// 分页查找用户列表
export async function queryAddFollowLog (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/followLog/create', params)
}
