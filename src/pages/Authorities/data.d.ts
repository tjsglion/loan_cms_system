export interface UserManagerItem {
  id: number; //
  operAccount: string; // 运营账号
  departmentId: number; // 部门id
  password: string; // 密码
  name: string; // 姓名
  phone: number; // 手机号
  email: string; // 邮箱
  role: number; // 用户角色集合
  status: number; // 状态;1-正常 2-停用 3-删除
  createdBy: string; // 创建人
  createdTime: string; // 创建时间
  lastLoginTime: string; // 上次登录ip
  createTime: string;
}

export interface UserManagerPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface UserManagerData {
  list: UserManagerItem[];
  pagination: Partial<UserManagerPaginagion>;
}

export interface UserManagerParmas {
  pageSize?: number;
  pageIndex?: number;
  current?: number;
  currentPage?: number;
  operAccount?: string;
  name?: string;
}