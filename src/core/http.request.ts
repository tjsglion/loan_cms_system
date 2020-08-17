import { message, notification } from 'antd';
import request from 'umi-request';
import { history } from 'umi';
import { Moment } from 'moment';
import { stringify } from 'qs';
import { token, getPageQuery } from '@/utils/utils';
import { signature } from '@/utils/request';
import { Options } from './model/options.models';

export const prod = process.env.NODE_ENV === 'production';

export interface ResponseData<T> {
  data: {[key: string]: any};
  status: number;
  info: string;
}

export interface RequestData<T> {
  data: T[];
  success?: boolean;
  total?: number;
  count?: number;
}

export function headers() {
  return {
    ...token(),
  };
}


function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      // @ts-ignore
      resolve(e.target.result);
    };
    fileReader.readAsDataURL(blob);
    fileReader.onerror = () => {
      reject(new Error('文件流异常'));
    };
  });
}

// 接口异步处理
function checkErrorAndRedirect(status: number): any {
  if ([401, 403, 2000, 2003].includes(status)) {
    localStorage.clear();
    const { redirect } = getPageQuery();
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: window.location.href,
        }),
      });
    }
    notification.error({
      message: 'Authoration Not Passed',
      description: status === 2000 ? 'token invalidation' : 'Authoration Not Passed',
    });
    return true;
  }
  return false;
}

const HttpClient = {
  // 处理请求头
  createHeaders(
    url: string,
    method: string,
    body: { [key: string]: string | number | Date | Moment | undefined } | FormData,
    isSignature?: boolean
  ): Options {
    const options: Options = {
      method,
      body,
      url,
      headers: {},
      isSignature: isSignature || false
    };

    const tokenStr = localStorage.getItem('application-auth-token') || '';
    // const lang: string = localStorage.getItem('umi_locale') || 'zh-CN';
    const timeZoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (options.method === 'POST' || options.method === 'PUT' || options.method === 'DELETE') {
      if (options.body instanceof FormData) {
        options.headers = {
          Accept: 'application/json',
          ...options.headers,
        };
      } else {
        options.headers = {
          Accept: 'application/json',
          'Content-Type':'application/json; charset=utf-8',
          token: tokenStr,
          timeZoneId,
        };
        // options.body = JSON.stringify(signature(options.body));
        options.body = !options.isSignature ? JSON.stringify(signature(options.body)) : JSON.stringify(options.body);
      }
    }

    if (options.method === 'GET') {
      options.url = `${url}?${stringify(options.body)}`;
    }

    if (token()) {
      options.headers = {
        token,
        ...options.headers,
      };
    }
    return options;
  },
  // 获取图片验证码
  blob(
    path: string,
    params: {
      [key: string]: any;
    },
  ): Promise<string> {
    // const { url, body, headers } = this.createHeaders(path, 'POST', params, reqType);
    const $h= this.createHeaders(path, 'POST', params);
    return new Promise((resolve) => {
      request
        .post($h.url, {
          data: { ...$h.body },
          headers: $h.headers,
          responseType: 'blob',
        })
        .then((res) => {
          if (checkErrorAndRedirect(res.status)) {
            return;
          }
          if (res) {
            blobToBase64(res).then((d) => resolve(d));
          } else {
            message.error('error');
          }
        });
    });
  },
  // 处理POST请求
  post<T>(
    path: string,
    params: { [key: string]: string | number | Date | Moment | undefined } | FormData,
    isSignature?: boolean
    // option: ResponseOption = {returnData: true, showErrorToast: true},
  ): Promise<ResponseData<T>> {
    const $h= this.createHeaders(path, 'POST', params, isSignature);
    return new Promise((resolve) => {
      request
        .post($h.url, {
          data: $h.body,
          headers: $h.headers,
        })
        .then((res: ResponseData<T>) => {
          const { status, info } = res;
          if (checkErrorAndRedirect(status)) {
            return;
          }
          if (status === -1) {
            message.error(`${info}`);
          } else if (status !== 0) {
            message.warning(info);
          }
          resolve(res);
        });
    });
  },
  get<T>(
    path: string,
    params: { [key: string]: string | number | Date | Moment | undefined } | FormData,
  ): Promise<ResponseData<T>> {
    const $h= this.createHeaders(path, 'POST', params);
    return new Promise((resolve) => {
      request
        .get($h.url, {
          headers: $h.headers,
        })
        .then((res: ResponseData<T>) => {
          const { status, info } = res;
          if (checkErrorAndRedirect(status)) {
            return;
          }
          if (status === -1) {
            message.error(`${info}`);
          } else if (status !== 0) {
            message.warning(info);
          }
          resolve(res);
        });
    });
  },
  list<T>(
    path: string,
    params: {[key: string]: any},
  ): Promise<RequestData<T>> {
    // const options = this.createHeaders(url, 'POST', params);
    // const { url, body, headers } = this.createHeaders(path, 'POST', params, reqType);
    const $h= this.createHeaders(path, 'POST', params);
    return new Promise((resolve) => {
      request
        .post($h.url, {
          data: $h.body,
          headers: $h.headers,
        })
        .then((res: ResponseData<{ data: Array<T>; count: number }>) => {
          // @ts-ignore
          const { status, data, info } = res;
          if (checkErrorAndRedirect(res.status)) {
            return;
          }

          if (status === 0) {
            resolve({
              // @ts-ignore
              data: data.list,
              total: data.totalCount,
              success: true,
            });
          } else if (status === -1) {
            message.error(`${info}`);
          } else {
            message.warning(info);
          }
          resolve({
            data: [],
            total: 0,
            success: true,
          });
        });
    });
  },
};

export default HttpClient;
