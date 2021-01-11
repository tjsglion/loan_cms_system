export interface ProductItem {
  id: number; // 
  productId: string; // 产品id
  name: string; // 产品名称
  secondTitle: string; // 产品副标题
  productType: number; // 产品类型
  funderType: string; // 出资方类型
  capitalId: number; // 资方id
  minLimitMoney: number; // 最小贷款额度
  maxLimitMoney: number; // 最大贷款额度
  minLimitLoanTime: number; // 最小贷款期限
  maxLimitLoanTime: number; // 最大贷款期限
  averageLoanTime: number; // 平均放款时间
  minMonthRate: number; // 最小月化利率
  maxMonthRate: number; // 最大月化利率
  coverRegions: string; // 覆盖区域
  productDesc: string; // 产品描述
  status: number; // 状态
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
  fieldStr: string;
  createTime: string;
  updateTime: string;
}

export interface ProductPaginagion {
  total: number;
  pageSize: number;
  current: number;
}

export interface ProductData {
  list: ProductItem[];
  pagination: Partial<ProductPaginagion>;
}

export interface ProductParmas {
  pageSize?: number;
  pageIndex?: number;
  name?: string;
  current?: number;
  currentPage?: number;
}