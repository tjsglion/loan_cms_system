export interface AdItem {
  id: number; // 
  title: string; // 公告标题
  content: string; // 公告内容
  createTime: string; // 操作类型
}

export interface AdPaginagion {
  total: number;
  pageSize: number;
  current: number;
}

export interface AdData {
  list: AdItem[];
  pagination: Partial<AdPaginagion>;
}

export interface AdParmas {
  pageSize?: number;
  pageIndex?: number;
  current?: number;
  currentPage?: number;
}