export interface CustomerInfoItem {
  id: number; //
  code: string; // 序号
  name: string; // 客户名称
  borrower: string; // 借款人
  sex: string; // 客户性别
  expect: number; // 期望额度
  phone: string; // 联系电话
  age: number; // 客户年龄
  address: string; // 客户地址
  userType: string; // 客户类型
  department: string; // 做单
  commissioner: string; // 跟进专员
  customerId: string;
  workNo: string;
}

export interface CustomerInfoPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface CustomerInfoData {
  list: CustomerInfoItem[];
  pagination: Partial<CustomerInfoPaginagion>;
}

export interface CustomerInfoParmas {
  pageSize?: number;
  pageIndex?: number;
  current?: number;
}