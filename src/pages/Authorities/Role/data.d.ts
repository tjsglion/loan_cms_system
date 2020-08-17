export interface RoleItem {
  id: number; //
  name: string; // 角色名称
  priviStr: string; // 权限集合字符串
  priviScope: string; // 权限范围
  dataScope: string; // 数据查看范围
  status: number; // 期望状态;1-正常 2-停用 3-删除额度
  createBy: string; // 创建人
  createTime: string; // 创建时间
}

export interface RolePagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface RoleData {
  list: RoleItem[];
  pagination: Partial<RolePaginagion>;
}

export interface RoleParmas {
  pageSize?: number;
  pageIndex?: number;
  current?: number;
}