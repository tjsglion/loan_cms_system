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
    title: '协议编号',
    dataIndex: 'protocolNo',
    hideInSearch: true,
    // width: '10%',
    render: (val) => val || '--'
  },
  {
    title: '客户姓名',
    dataIndex: 'customerName',
    hideInSearch: true,
    // width: '8%',
    render: val => val || '--'
  },
  {
    title: '贷款产品',
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
    render: val => {
      if (val && val !== '-') {
        return moment(`${val}`).format(DATETIME);
      }
      return '--';
    }
  },
  {
    title: '签单状态',
    dataIndex: 'status',
    hideInSearch: true,
    render: (val) => maps[`${val || 1}`]
  },
  {
    title: '做单状态',
    dataIndex: 'workStatus',
    hideInSearch: true,
    render: (val) => {
      if (val) {
        // return loanExpect.status === 1 ? '跟进中' : '';
        switch (val) {
          case 1: 
            return '跟进中';
          case 2: 
            return '已面签';
          default:
            return '--';
        }
      }
      return '';
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
    render: (val) => {
      // return val && moment(`${val}`).format(DATETIME) || '--';
      if (val && val !== '-') {
        return moment(`${val}`).format(DATETIME);
      }
      return '--';
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