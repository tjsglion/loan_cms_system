import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';
import { Route } from '@/models/connect';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export function transfNumbToFloat (val: number) {
  const x = String(val).indexOf('.') + 1; // 小数点位置
  if (x === 0) {
    return (+val).toFixed(1);
  }
  return val;
}

export function getDateTimes (val: string) {
  return new Date(val).getTime();
} 

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = <T extends Route>(
  router: T[] = [],
  pathname: string,
): T | undefined => {
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};

export const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities: string[] | string | undefined;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      }
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

export function setToken(tokens: string) {
  localStorage.setItem('application-auth-token', tokens);
}

export function token() {
  // eslint-disable-next-line no-shadow
  const token = localStorage.getItem('application-auth-token') || '';
  return { token };
}

export function setLocalUser(user: {[key: string]: any}) {
  localStorage.setItem('application-current-user', JSON.stringify(user));
}

export function getLocalUser(): {[key: string]: any} {
  const localUser = localStorage.getItem('application-current-user') || '{}';
  return JSON.parse(localUser);
}

export function sessionKey(): string | null {
  return localStorage.getItem('application-auth-sessionKey') || null;
}

export function setSessionKey(key: string) {
  localStorage.setItem('application-auth-sessionKey', key);
}

export function uuid() {
  const s = [];
  const hexDigits = '0123456789abcdef';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  // @ts-ignore
  // eslint-disable-next-line no-bitwise
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  // eslint-disable-next-line no-multi-assign
  s[8] = s[13] = s[18] = s[23] = '-';

  return s.join('');
}

export function download(url: string, name: string): any {
  const aLink = document.createElement('a');
  document.body.appendChild(aLink);
  aLink.style.display = 'none';
  aLink.href = url;
  if (name) aLink.download = `${name}`;
  aLink.click();
  document.body.removeChild(aLink);
}

export function filterEmptyFields(obj: {[key: string]: any}) {

  delete obj._timestamp;
  const keys = Object.keys(obj);
  keys.forEach(key => {
    if (!obj[key]) {
      delete obj[key];
    }
  });

  return obj;
}