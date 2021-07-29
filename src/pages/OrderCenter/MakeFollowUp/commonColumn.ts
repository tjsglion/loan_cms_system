import { DATETIME } from "@/constants";
import { ProColumns } from "@ant-design/pro-table";
import moment from "moment";
import numeral from 'numeral';
import { MakeFollowUpItem } from "./data";

const maps = {
  1: '待接订单',
  2: '进行中',
  3: '暂停',
  4: '已完成',
  5: '未完成',
  6: '已过期'
}
export const Columns: ProColumns<MakeFollowUpItem>[] = [
  {
    title: '创建时间',
    dataIndex: 'createTime',
    hideInSearch: true,
    render: (_, record) => {
      return record.createTime && moment(+record.createTime).format('YYYY-MM-DD HH:mm:ss') || '--'
    }
  },
  {
    title: '公司名称',
    dataIndex: 'companyName',
    // hideInSearch: true,
    // width: '8%',
    render: val => val || '--'
  },
  {
    title: '客户姓名',
    dataIndex: 'customerName',
    // hideInSearch: true,
    // width: '8%',
    render: val => val || '--'
  },
  {
    title: '产品名称',
    dataIndex: 'productName',
    hideInSearch: true,
    // width: '8%',
    render: val => val || '--'
  },
  {
    title: '签单时间',
    dataIndex: 'signUpTime',
    hideInSearch: true,
    // width: '10%',
    render: (_, record) => {
      // if (val && val !== '-') {
      //   return moment(`${val}`).format(DATETIME);
      // }
      try {
        return record.signUpTime ? moment(record.signUpTime).format(DATETIME) : '--'
      } catch (e) {
        return record.signUpTime && moment(+record.signUpTime).format('YYYY-MM-DD HH:mm:ss') || '--'
      }
    }
  },
  {
    title: '做单状态',
    dataIndex: 'workStatus',
    hideInSearch: true,
    render: (val) => maps[`${val || 1}`]
  },
  {
    title: '签单状态',
    dataIndex: 'signUpStatus',
    hideInSearch: true,
    render: (val) => {
      
      return val === 1 ? '已签单' : '未签单';
    }
  },
  {
    title: '贷款金额',
    dataIndex: 'expectLoanMoney',
    hideInSearch: true,
    render: (val) => {
      return val ? numeral(val).format('0,0.00') : '--'
    }
  },
  {
    title: '跟进日期',
    dataIndex: 'followTime',
    hideInSearch: true,
    render: (_, record) => {
      // return val && moment(`${val}`).format(DATETIME) || '--';
      try {
        return record.followTime ? moment(record.followTime).format(DATETIME) : '--'
      } catch (e) {
        return record.followTime && moment(+record.followTime).format('YYYY-MM-DD HH:mm:ss') || '--'
      }
    }
  },
  {
    title: '跟进专员',
    dataIndex: 'followUserName',
    formItemProps: {
      placeholder: '请输入',
      allowClear: true
    },
    render: val => val || '--'
  },
  {
    title: '被拒原因',
    dataIndex: 'rejectReason',
    formItemProps: {
      placeholder: '请输入',
      allowClear: true
    },
    hideInSearch: true,
    render: val => val || '--'
  },
  {
    title: '跟进内容',
    dataIndex: 'followDetails',
    hideInSearch: true,
    width: '8%',
    render: val => val || '--'
    // customerExpect
    
  },
];