export interface DepartmentItem {
  id: number;
  name: string;
  pId: number;
  createTime: string;
  updateTime: string;
}

export interface DepartmentPaginagion {
  total: number;
  pageSize: number;
  current: number;
}

export interface DepartmentData {
  list: DepartmentItem[];
  pagination: Partial<DepartmentPaginagion>;
}

export interface DepartmentParmas {
  pageSize?: number;
  pageIndex?: number;
  current?: number;
}