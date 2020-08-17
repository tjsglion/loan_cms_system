export interface RecordItem {
  id: number;
  customerId: number;
  workNo: string;
  returnVisitUserId: string;
  planReturnVisitTime: string;
  reallyReturnVisitTime: string;
  returnVisitClassical: number;
  returnVisitType: number;
  returnVisitContent: string;
}

export interface RecordPaginagion {
  total: number;
  pageSize: number;
  pageIndex: number;
}

export interface RecordData {
  list: RecordItem[];
  pagination: Partial<RecordPaginagion>;
}

export interface RecordParmas {
  pageSize?: number;
  pageIndex?: number;
}