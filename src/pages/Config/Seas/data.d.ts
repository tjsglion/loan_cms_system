export interface SeasItem {
  id: number; // 
  requireCustomerWaitTime: number; // 需求客户转入公海时间
  intentCustomerWaitTime: number; // 意向客户转入公海时间
  potentialCustomerWaitTime: number; // 潜在客户转入公海时间
}

export interface SeasPaginagion {
  total: number;
  pageSize: number;
  current: number;
}

export interface SeasData {
  list: SeasItem[];
  pagination: Partial<SeasPaginagion>;
}

export interface SeasParmas {
  pageSize?: number;
  currentPage?: number;
}