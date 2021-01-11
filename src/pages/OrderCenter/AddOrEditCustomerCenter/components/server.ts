import HttpClient from '@/core/http.request';

// 客户信息
export async function fetchSubmittedInfo (
  params: {[key: string]: any},
  type: string
) {
  return HttpClient.post(type === 'add' 
    ? '/api/work/base/customer/create'
    : '/api/work/base/customer/update', 
    params);
}
export async function fetchInfoById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/customer/getByCustomerId', params);
}
// 基本信息
export async function fetchSubmitBaseInfo (
  params: {[key: string]: any},
  type: string
) {
  return HttpClient.post(
    type === 'add'
      ? '/api/work/loan/expect/create'
      : '/api/work/loan/expect/update',
    params
  );
}

// 获取基本信息
export async function fetchBaseInfoByCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/loan/expect/list', params);
}

// 职业信息
export async function fetchSubmitJobInfo (
  params: {[key: string]: any},
  type: string
) {
  return HttpClient.post(
    type === 'add'
      ? '/api/work/base/customerJob/create'
      : '/api/work/base/customerJob/update',
    params
  );
}

export async function fetchJobInfoByCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/customerJob/getByCustomerId', params);
}

// 企业信息
export async function fetchSubmitCompany (
  params: {[key: string]: any},
  type: string
) {
  return HttpClient.post(
    type === 'add' 
      ? '/api/work/company/company/create'
      : '/api/work/company/company/update', 
    params);
}

// 获取企业信息
export async function fetchCompanyByCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/company/company/list', params);
}

// 股东信息
export async function fetchSubmitPartner (
  params: any,
) {
  return HttpClient.post('/api/work/company/shareholder/batOper', params, true);
}

// 查找股东信息
export async function fetchPartnerByCompanyId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/company/shareholder/list', params);
}

// 删除股东信息
export async function fetchDeletePartnerById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/company/shareholder/delete', params);
}

// 变更记录
export async function fetchSubmitChange (
  params: any,
) {
  return HttpClient.post('/api/work/company/changeLog/batOper', params, true);
}

export async function fetchChangeByCompanyId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/company/changeLog/list', params);
}

export async function fetchDeleteChangeById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/company/changeLog/delete', params);
}

// 法院判决
export async function fetchSubmitCourt (
  params: any,
) {
  return HttpClient.post('/api/work/company/dispute/batOper', params, true);
}

export async function fetchCourtByCompanyId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/company/dispute/list', params);
}

export async function fetchDeleteCourtById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/company/dispute/delete', params);
}

// 信用信息
// 银行信息
export async function fetchSubmitCreditForBand (
  params: any,
) {
  return HttpClient.post('/api/work/base/creditLoanDetails/batOper', params, true);
}

export async function fetchCreditForBandByCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/creditLoanDetails/list', params);
}

export async function fetchDeleteCreditForBandById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/creditLoanDetails/delete', params);
}
// 其它信息
export async function fetchCreditForOtherByCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/creditLoanInfo/getByCustomerId', params);
}
export async function fetchSubmitCreditForOthers (
  params: {[key: string]: any},
  type: string
) {
  return HttpClient.post(
    type === 'add' 
      ? '/api/work/base/creditLoanInfo/create'
      : '/api/work/base/creditLoanInfo/update', 
    params);
}

// 个人信息
// 全款房
export async function fetchSubmitOwnHouse (
  params: any,
) {
  return HttpClient.post('/api/work/base/ownHouse/batOper', params);
}

export async function fetchOwnHouseByCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/ownHouse/list', params);
}

export async function fetchDeleteOwnHouseById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/ownHouse/delete', params);
}
// 按揭房
export async function fetchSubmitLoanHouse (
  params: any,
) {
  return HttpClient.post('/api/work/base/loanHouse/batOper', params);
}

export async function fetchLoanHouseByCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/loanHouse/list', params);
}

export async function fetchDeleteLoanHouseById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/loanHouse/delete', params);
}
// 保单
export async function fetchSubmitInsurance (
  params: any,
) {
  return HttpClient.post('/api/work/base/insurance/batOper', params);
}

export async function fetchInsuranceByCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/insurance/list', params);
}

export async function fetchDeleteInsuranceById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/insurance/delete', params);
}
// 全款车
export async function fetchSubmitOwnCar (
  params: any,
) {
  return HttpClient.post('/api/work/base/ownCar/batOper', params);
}

export async function fetchOwnCarByCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/ownCar/list', params);
}

export async function fetchDeleteOwnCarById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/ownCar/delete', params);
}
// 按揭车
export async function fetchSubmitLoanCar (
  params: any,
) {
  return HttpClient.post('/api/work/base/loanCar/batOper', params);
}

export async function fetchLoanCarByCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/loanCar/list', params);
}

export async function fetchDeleteLoanCarById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/loanCar/delete', params);
}
// 打卡
export async function fetchPunchCardByCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/punchCard/getByCustomerId', params);
}
export async function fetchSubmitPunchCard (
  params: {[key: string]: any},
  type: string
) {
  return HttpClient.post(
    type === 'add' 
      ? '/api/work/base/punchCard/create'
      : '/api/work/base/punchCard/update', 
    params);
}
// 社保
export async function fetchSocialSecurityByCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/socialSecurity/getByCustomerId', params);
}
export async function fetchSubmitSocialSecurity (
  params: {[key: string]: any},
  type: string
) {
  return HttpClient.post(
    type === 'add' 
      ? '/api/work/base/socialSecurity/create'
      : '/api/work/base/socialSecurity/update', 
    params);
}
// 公积金
export async function fetchAccFundByCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/customerAccFund/getByCustomerId', params);
}
export async function fetchSubmitAccFund (
  params: {[key: string]: any},
  type: string
) {
  return HttpClient.post(
    type === 'add' 
      ? '/api/work/base/customerAccFund/create'
      : '/api/work/base/customerAccFund/update', 
    params);
}
// 信用卡
export async function fetchSubmitCreditCard (
  params: any,
) {
  return HttpClient.post('/api/work/base/creditCard/batOper', params);
}

export async function fetchCreditCardByCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/creditCard/list', params);
}

export async function fetchDeleteCreditCardById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/creditCard/delete', params);
}
// 信用卡汇总
export async function fetchCreditCardSummary (
  params: {[key: string]: any},
  type: string
) {
  return HttpClient.post(
    type === 'add'
      ? '/api/work/base/cardSummary/create'
      : '/api/work/base/cardSummary/update', 
    params);
}

export async function fetchCreditCardSummaryByCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/cardSummary/getByCustomerId', params);
}

// 获取影像信息
export async function fetchPicByCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/pic/listByCustomerId', params);
}

// 保存影像信息
export async function fetchSavePicByCustomerId (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/pic/add', params)
}

// 删除影像信息
export async function fetchDelPicById (
  params: {[key: string]: any}
) {
  return HttpClient.post('/api/work/base/pic/delete', params)
}