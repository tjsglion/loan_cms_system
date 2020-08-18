/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend, ResponseError } from 'umi-request';
import { notification } from 'antd';
import { history } from 'umi';
import { stringify } from 'qs';
import { getPageQuery, sessionKey } from './utils';
import { prod } from '@/core/http.request';

const crypto = require('crypto');

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};


export function logout() {
  localStorage.clear();
  const { redirect } = getPageQuery();
  // redirect
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: window.location.href,
      }),
    });
  } else {
    // router.replace({
    //   pathname: '/user/login',
    // });
    history.push('/user/login')
  }
}

const checkErrorAndRedirect = (status: number): any => {

  if (status === 401 || status === 403) {
    logout();
    return;
  }
  if (status === 405) {
    history.push('/exception/403');
    return;
  }
  if (status <= 504 && status >= 500) {
    history.push('/exception/500');
    return;
  }
  if (status >= 404 && status < 422) {
    history.push('/exception/404');
  }
};

export function ramdom8Str(): string {
  return `${Math.floor(Math.random() * 100000000)}`;
}

/**
 * 签名
 * @param params 
 */
export function signature(params: { [key: string]: string | number | undefined | Date }) {
  const sessionKeystr: string | null = sessionKey();
  if (!sessionKeystr) {
    return params;
  }
  if (params.startTime) {
    
    if (Object.prototype.toString.call(params.startTime) === "[object Date]") {
      // @ts-ignore
      params.startTime.setHours(0, 0, 0);
    }
  }
  if (params.endTime) {
    if (Object.prototype.toString.call(params.endTime) === "[object Date]") {
      // @ts-ignore
      params.endTime.setHours(23, 59, 59);
    }
  }
  const timestamp = new Date().getTime();

  // params.operAccount = getLocalUser().operAccount;
  const tempParams: {
    nonce: string;
    timestamp: number;
    sessionKey?: string;
    signature?: string;
    [key: string]: string | number | undefined | Date;
  } = JSON.parse(JSON.stringify(params));

  tempParams.nonce = ramdom8Str();
  tempParams.timestamp = timestamp;
  const sha1 = crypto.createHash('sha1');

  // 参数排序 不做转义
  let sortParams = stringify(tempParams, { sort: (a, b) => a.localeCompare(b), encode: false });
  // session key 不参与排序
  sortParams += `&sessionKey=${sessionKeystr}`;

  // console.log('sortParams>', sortParams);
  sha1.update(sortParams);
  tempParams.signature = sha1.digest('hex');

  delete tempParams.sessionKey;
  return tempParams;
}

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  // console.log(codeMessage()[error.response.status]);

  if (error.response.status >= 200 && error.response.status < 300) {
    return error.response;
  }

  // if (error.stack === 'TypeError: Failed to fetch') {
  //   notification.error({
  //     message: `请求错误 1000:`,
  //     description: '跨域错误',
  //   });
  //   return error.response;
  // }

  const { response = {} as Response } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;

  if (status && errortext) {
    checkErrorAndRedirect(status);
    // if (status !== 401)
    notification.error({
      message: `ERROR:${status}: ${url}`,
      description: errortext,
    });
  }

  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  // prefix: prod ? '/api/crm-manage-api' : '/api'
});

request.interceptors.request.use((url, options) => {
  // console.log(url, options);
  let $url = ''
  if (!prod) {
    $url = `/api${url}`;
  } else {
    $url = `/crm-manage-api${url}`
  }
  // console.log($url);
  return {
    url: $url,
    options
  }
})

// 定义全局拦截器: 401 403
request.interceptors.response.use(async (response) => {
  const {status} = response;
  if ([401, 403].includes(status)) {
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
      message: 'ERROR: Authoration Not Passed',
      description: codeMessage[status]
    });
  }
  return response;
});

export default request;
