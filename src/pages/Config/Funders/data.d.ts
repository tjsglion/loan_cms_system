export interface FundersItem {
  id: number;
  capitalId: string;
  name: string;
  remarkInfo: string;
  createTime: string;
}

export interface FundersPaginagion {
  total: number;
  pageSize: number;
  current: number;
}

export interface FundersData {
  list: FundersItem[];
  pagination: Partial<FundersPaginagion>;
}

export interface FundersParmas {
  pageSize?: number;
  pageIndex?: number;
  current?: number;
  currentPage?: number;
}