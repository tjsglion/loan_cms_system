import { encrypt } from '@/utils/encrypt';
import HttpClient from '@/core/http.request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
  userType: nunber;
  type: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  const $params = {
    loginName: params.userName,
    password: encrypt(params.password),
    userType: 1
  }

  return HttpClient.post('/api/user/user/login', $params);
}

// export async function getFakeCaptcha(mobile: string) {
//   return request(`/api/login/captcha?mobile=${mobile}`);
// }
