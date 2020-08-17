export interface FollowUpItem {
  id: number;
  planTime: string; // 计划时间 
  content: string; // 跟进内容
  customerName: string; // 客户名称
  borrower: string; // 借款人
  finish: boolean; // 是否完成
  finishDate: string; // 完成日期
  followState: string; // 跟进情况
  followPerson: string; // 跟进专员
  customerBase: {[key: string]: any};
  followLog: {[key: string]: any};
}

export interface FollowUpPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface FollowUpData {
  list: FollowUpItem[];
  pagination: Partial<FollowUpPaginagion>;
}

export interface FollowUpParmas {
  pageSize?: number;
  pageIndex?: number;
  current?: number;
  currentPage?: number;
}