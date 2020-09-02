export const DATETIME = 'YYYY-MM-DD HH:mm:ss';
export const DATEFORMAT = 'YYYY-MM-DD';

export const formItemLayout = {
  labelCol: {
    xs: { span: 18 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 12 },
    md: { span: 12 },
  }
};

export const formItemLayout2 = {
  labelCol: {
    xs: { span: 18 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 16 },
    md: { span: 16 },
  }
};

 // 提交按钮
export const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 6 },
  },
};

export const COLSPAN = {
  md: 8, lg: 8, sm: 12, xl: 8, xxl: 6,
}

export const COLLABEL = {
  sm: {span: 12}, md: {span: 10}, lg: {span: 8}
}

export const TEXTINFO = {
  placeholder: '请输入'
}

export const OPTIONSPLACEHOLDER = {
  placeholder: '请选择'
}

export const USERSTATUS = {
  '1': '正常',
  '2': '停用',
  '3': '删除'
};

export const RADIOIDENTITY = [
  { key: '优质精英', value: 0 },
  { key: '中等受薪', value: 2 },
  { key: '普通受薪', value: 3 },
]

export const YESORNO = [
  { key: '是', value: 1 },
  { key: '否', value: 0 }
]

export const YESORNO2 = [
  { key: '是', value: 1 },
  { key: '无', value: 0 }
]

export const LENDER = [
  { key: '银行', value: 0 },
  { key: '非银', value: 1 }
]

export const Repayment = [
  { key: '等额本息', value: 1 },
  { key: '先息后本', value: 2 },
  { key: '一次性还息归本', value: 3 },
]


export const RULES = {
  rules: [
    { required: true, message: '必填字段' }
  ]
}

// 客户中心查询条件
export const SearchParams = {
  category: [
    { key: '全部客户', value: 0, type: 'category' },
    { key: '我的客户', value: 1, type: 'category' },
    { key: '下属客户', value: 2, type: 'category' },
    { key: '重点客户', value: 3, type: 'category' },
    { key: '今日新增', value: 4, type: 'category' },
    { key: '公海客户', value: 5, type: 'category' }
  ],
  status: [
    { key: '潜在客户', value: 0, type: 'status'},
    { key: '意向客户', value: 1, type: 'status'},
    { key: '需求客户', value: 2, type: 'status'},
    { key: '签单客户', value: 3, type: 'status'},
    { key: '放款客户', value: 4, type: 'status'}
  ],
  follow: [
    { key: '本周跟进', value: 0, type: 'follow'},
    { key: '下周跟进', value: 1, type: 'follow'},
    { key: '本月跟进', value: 2, type: 'follow'},
    { key: '下月跟进', value: 3, type: 'follow'},
    { key: '自定义日期', value: 4, type: 'follow'}
  ]
}

// 婚姻状态
export const MarriageInfo = [
  { value: 0, key: '未婚' },
  { value: 1, key: '已婚' },
  { value: 2, key: '离异' },
  { value: 3, key: '再婚' }
]

// 最高学历
export const HightEducation = [
  { value: 1, key: '高中以下' },
  { value: 2, key: '高中' },
  { value: 3, key: '专科' },
  { value: 4, key: '本科' },
  { value: 5, key: '研究生' },
  { value: 6, key: '博士' },
  { value: 7, key: '博士后' }
]

export const PayType = [
  { key: '年缴', value: 1 },
  { key: '月缴', value: 2 }
]

export const InsuranceType = [
  { key: '传统', value: 1 },
  { key: '分红', value: 2 },
  { key: '万能', value: 3 },
];

export const Locations = [
  { key: '本地', value: 1 },
  { key: '外地', value: 0 }
];

export const FollowMethod = [
  { key: '电话跟进', value: 1 },
  { key: '邀约来访', value: 2 },
  { key: '上门拜访', value: 3 },
];