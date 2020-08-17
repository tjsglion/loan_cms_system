export interface LogsItem {
  id: number; // 
  userId: number; // 用户id
  userName: string; // 用户名称
  operType: number; // 操作类型
  operAction: string; // 操作行为
  operTime: string; // 操作时间
  operModule: string; // 操作所属模块
}

export interface LogsPaginagion {
  total: number;
  pageSize: number;
  current: number;
}

export interface LogsData {
  list: LogsItem[];
  pagination: Partial<LogsPaginagion>;
}

export interface LogsParmas {
  pageSize?: number;
  pageIndex?: number;
  current?: number;
  _timestamp?: number;
  currentPage?: number;
}