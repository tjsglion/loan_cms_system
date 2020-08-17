export interface CustomerAllotItem {
  id: number; // id
  code: string; // 序号
  company: string; // 客户名称
  transformTime: string; // 转移时间
  status: string; // 客户状态
  reason: string; // 分配原因
  transformBefore: string; // 转移前销售
  transformAfter: string; // 转移后销售
}

export interface CustomerAllotPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface CustomerAllotData {
  list: CustomerAllotItem[];
  pagination: Partial<CustomerAllotPaginagion>;
}

export interface CustomerAllotParmas {
  pageSize?: number;
  pageIndex?: number;
  current?: number;
  currentPage?: number;
}