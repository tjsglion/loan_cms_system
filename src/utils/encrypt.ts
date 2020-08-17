import { JSEncrypt } from 'jsencrypt';
import md5 from 'md5';

export const pubKey =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmnNbhtW85I8qqSK/4d/NOl3wfUtJc3pCO4shvzbT+v2JqUG26OJnWFMrxhKwOjjAaoHETLSKimzfRB8yE5sgmwb+ZyEsBtXA4WK3BH856Gqp3WPONeWQqeji3bd23/Vlu2kNlrOThjIvgMDYzCojX/oy/mTLnBGn/PazW0i1eXvyeMEYw+hhaMqmljKpi1zKnbdbs7nftf2JMUSjUP3JqTvgYIDCfWMrTb7X8lpmM5H1DKcVtjSQ2mbDVRUnjHq41sNQjmSHh4+DdFdXxbJquoLpZlMJqOfE/Ct74HXcJDnyn9KzcGVObgDdskin0eKvxz4PZX+edDxdXNdfruMnJQIDAQAB';

export function encrypt(values: string): string {
  // md5加密
  const md5Encode = md5(values);

  const valueEncrypted = new Date().getTime() + md5Encode;
  // 加密
  const encdrypt = new JSEncrypt();
  encdrypt.setPublicKey(pubKey);
  return encdrypt.encrypt(valueEncrypted);
}

export function b64DecodeUnicode(str: string): string {
  let uni = '';
  try {
    uni = decodeURIComponent(
      atob(str)
        .split('')
        .map((c) => `%${  (`00${  c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join(''),
    );
  } catch (e) {
    //
  }
  return uni;
}