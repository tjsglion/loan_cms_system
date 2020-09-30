export interface MakeFollowUpItem {
  id: number; // 主键
  code: string; // 协议编号
  customerName: string; // 客户姓名
  product: string // 贷款产品
  signTime: string; // 签单时间
  signStatus: string; // 签单状态
  signPerson: string; // 资方签约人
  status: string; // 做单状态
  money: number; // 贷款金额
  followUpDate: string; // 跟进日期
  followUpPerson: string; // 跟进专员
  followUpType: string; // 跟进类容
  customerBase: {[key: string]: any};
  followLog: {[key: string]: any};
  signUpDetails: {[key: string]: any};
  loanExpect: {[key: string]: any};
}

export interface MakeFollowUpPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface MakeFollowUpData {
  list: MakeFollowUpItem[];
  pagination: Partial<MakeFollowUpPaginagion>;
}

export interface MakeFollowUpParmas {
  pageSize?: number;
  pageIndex?: number;
  current?: number;
  currentPage?: number;
  rejectReason?: string;
  followUserName?: string;
}