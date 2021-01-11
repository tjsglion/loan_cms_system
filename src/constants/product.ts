export const ProductFieldsFields = {
  CustomerBase: '客户基础信息',
  CustomerAccumulationFund: '客户公积金信息',
  CustomerCreditCard: '客户信用卡信息',
  CustomerCreditCardSummary: '客户信用卡汇总',
  CustomerCreditLoanDetails: '客户信用贷款详情',
  CustomerCreditLoanInfo: '客户信用贷款信息',
  CustomerInsurance: '客户保险信息',
  CustomerJobInfo: '客户工作信息',
  CustomerLoanCarInfo: '客户贷款车信息',
  CustomerLoanHouseInfo: '客户贷款车信息',
  CustomerOwnCarInfo: '客户全款车信息',
  CustomerOwnHouseInfo: '客户全款房信息',
  CustomerPicInfo: '客户影像资料',
  CustomerPunchCardInfo: '客户打卡信息',
  CustomerSocialSecurity: '客户打卡信息',
  CustomerCompanyInfo: '公司信息',
  CompanyShareholder: '公司股权信息',
  CompanyDisputeInfo: '公司纠纷信息',
  CompanyChangeLog: '公司变更信息',
}

/** 客户基础信息 */
export const CustomerBaseFields = {
  name: '姓名',
  phone: '联系电话',
  sex: '性别',
  idCardNo: '身份证号',
  idCardUrl: '身份证照片',
  age: '年龄',
  address: '地址',
  marriageInfo: '婚姻状态',
  highestEducation: '最高学历',
  sesameCreditScore: '芝麻分',
  wxCreditScore: '微信分',
}

/** 客户公积金信息 */
export const CustomerAccumulationFundFields = {
  storageYear: '缴存年限(年)',
  storageMoney: '共缴金额(元)',
  accumulationFundBase: '公积金基数(元)',
  haveBreakRecord: '是否断缴'
}

/** 客户信用卡信息 */
export const CustomerCreditCardFields = {
  bank: '银行',
  totalMoney: '授信金额(元)',
  withDrawMoney: '可提金额(元)',
  usedRate: '使用比例',
  haveCashOut: '是否套现'
}

/** 客户信用卡汇总  */
export const CustomerCreditCardSummaryFields = {
  cardOrganizationCount:'发卡机构数',
  accountCount:'账户数',
  totalCreditAmount:'授信总额(元)',
  maxSingleCreditAmount:'单机构最高授信额度(元)',
  minSingleCreditAmount:'单机构最低授信额度(元)',
  usedCreditAmount:'当前已用额度(元)',
  averageUsedCreditAmount:'最近六个月平均使用额度(元)',
  usedRate:'使用比例(%)'
};

/** 客户信用贷款详情  */
export const CustomerCreditLoanDetailsFields = {
  loanBank:'贷款银行',
  haveLoan:'是否通过',
  successLoanMoney:'批复金额',
  repayType:'还款方式',
  loanTime:'放款时间',
  loanTerm:'贷款期限',
  loanRemarkInfo:'贷款备注',
  monthlyMoney:'月供金额',
  loanOrganization:'放款机构',
};

/** 客户信用贷款信息 */
export const CustomerCreditLoanInfoFields = {
  postLoanMaterials: '提供贷后材料',
  creditInvestigationQueryCount: '征信查询次数',
  currentLoanCount: '近3个月网贷次数',
  haveCurrentOverdue: '当前是否逾期',
  currentOverdueAmount: '当前逾期金额',
  overdueInfo: '逾期情况', 
  totalMoney: '总资产金额(元)'
};

/** 客户保险信息 */
export const CustomerInsuranceFields = {
  companyName: '保险公司名称',
  payType: '缴费方式',
  paidCount: '缴费次数',
  type: '保单类型',
}

/** 客户工作信息 */
export const CustomerJobInfoFields = {
  companyName: '公司名称',
  companyAddress: '公司地址',
  jobName: '职业身份', 
  cashFlow: '现金流',
  hasLicense: '有无执照',
  registerTime: '注册时间',	
  shareholderRate: '所占股份(%)',
  businessScope: '经营范围',
  companyResidence: '单位下户',	
  companyYearTurnover: '年营业额(万元/年)', 
  companyMonthTurnover: '月营业额(万元/月)',
  needDependCompany: '需挂靠单位', 
  companyPhone: '单位座机',
  taxMoney: '纳税金额(元)',	
  invoiceMoney: '开票金额(元)', 
  administrationPunish: '行政处罚', 	
  punishMoney: '行政处罚金额',
  removeRecord: '移除记录', 
  disputeRecord: '官司记录',	
  movablesMortgage: '动产抵押', 
  shareholderMortgage: '股权抵押',
  hasSideline: '有无副业', 
  sidelineMonthIncome: '副业月收入(元/月)',	
}
/** 客户贷款车信息 */
export const CustomerLoanCarInfoFields = {
  carNo: '车辆牌照',
  totalLoanMoney: '车贷总数(元)',
  paidCount: '还款期数(期)', 
  monthlyMoney: '月供金额(元)',
}
/** 客户贷款车信息 */
export const CustomerLoanHouseInfoFields = {
  propertyRightInfo: '产权情况',
  type: '房型',
  position: '位置', 
  monthlyPayment: '月供金额(元)',	
  paidCount: '已还期数(期)',
  location: '房屋所在地',
}
/** 客户全款车信息 */
export const CustomerOwnCarInfoFields = {
  carNo: '车辆牌照',
  totalMoney: '购买总价(元)',
  usedYear: '已开年限(年)',
  registerTime: '登记时间',
}
/** 客户全款房信息 */
export const CustomerOwnHouseInfoFields = {
  address: '房屋地址',
  propertyRightInfo: '产权情况',
  type: '房型',
  position: '位置',
  area: '房屋面积(M²)',
  buyTotalMoney: '购买总价(万元)',
  assessMoney: '评估总价(万元)',
  haveCert: '是否办证',
  location: '房屋所在地',
}
/** 客户影像资料 */
export const CustomerPicInfoFields = {
  picUrl: '房屋地址',
}
/** 客户打卡信息 */
export const CustomerPunchCardInfoFields = {
  punchTime: '打卡时间',
  punchMoney: '打卡金额(元/月)',
  cashFlow: '现金流',
  fixPunch: '是否固定打卡'
}

/** 客户社保信息 */
export const CustomerSocialSecurityFields = {
  storageYear: '缴存年限(年)',
  storageMoney: '共缴金额(元)',
  socialSecurityBase: '社保基数(元)',
  haveBreakRecord: '是否断缴',
};

/** 公司信息 */
export const CustomerCompanyInfoFields = {
  name: '企业名称',
  legalPerson: '法人',
  registerMoney: '注册资本(元)',
  registerTime: '成立时间',
  industry: '所属行业',
  registerOffice: '登记机关',
  address: '地址',
};

/** 公司股权信息 */
export const CompanyShareholderFields = {
  name: '股东名称',
  position: '股东职位',
  holdRate: '持股比例(%)',
  subscriptionMoney: '认缴金额(元)',
};

/** 公司纠纷信息 */
export const CompanyDisputeInfoFields = {
  judgeTime: '发布日期',
  caseReason: '案由',
  title: '判决标题',
  identity: '案件身份',
  judgeNo: '案号',
  involveMoney: '涉案金额(元)',
  courtName: '法院名称',	
};

/** 公司变更信息 */
export const CompanyChangeLogFields = {
  changeTime: '变更日期',
  changeItem: '变更项目',
  beforeChange: '变更前',
  afterChange: '变更后',
};