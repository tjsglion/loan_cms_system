export interface VisitItem {
  Id: number;
  customerId: string;
  workNo: string;
  marketerId: string;
  followerId: string;
  haveReturnVisit: number;
  customerBase: {[key: string]: any};
  loanExpect: {[key: string]: any};
}

export interface VisitPaginagion {
  total: number;
  pageSize: number;
  pageIndex: number;
}

export interface VisitData {
  list: VisitItem[];
  pagination: Partial<VisitPaginagion>;
}

export interface VisitParmas {
  pageSize?: number;
  pageIndex?: number;
}