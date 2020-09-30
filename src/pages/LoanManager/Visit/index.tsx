/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { history } from 'umi';
import { InputNumber, Select } from 'antd';
import numeral from 'numeral';
import { fetchVisitList } from './server';
import { VisitItem } from './data';
import { transfNumbToFloat } from '@/utils/utils';


interface ProductProps {}

const { Option } = Select;

const Product: React.FC<ProductProps> = () => {

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<VisitItem>[] = [
    {
      title: '借款人',
      dataIndex: 'customerName',
      formItemProps: {
        placeholder: '请输入',
        allowClear: true
      },
      render: (_, record) => {
        const {customerName} = record;
        return (<span>
          {customerName || '--'}
        </span>)
      }
    },
    {
      title: '贷款金额',
      dataIndex: 'expectLoanMoney',
      formItemProps: {
        placeholder: '请输入',
        allowClear: true
      },
      // @ts-ignore
      renderFormItem: ( 
        item: ProColumns<VisitItem>,
        config: {
          value?: any,
          onChange: (value: any) => void;
        }) => (
          <InputNumber style={{width: '100%'}} onChange={config.onChange} value={config.value} />
        )
      ,
      render: (_, record) => {
        const {expectLoanMoney} = record;
        if (expectLoanMoney) {
          return numeral(`${expectLoanMoney}`).format('0,0.00')
        }
        return '--'
      }
    },
    {
      title: '放款金额',
      dataIndex: 'loanMoney',
      formItemProps: {
        placeholder: '请输入',
        allowClear: true
      },
      // @ts-ignore
      renderFormItem: ( 
        item: ProColumns<VisitItem>,
        config: {
          value?: any,
          onChange: (value: any) => void;
        }
      ) => (
        <InputNumber style={{width: '100%'}} onChange={config.onChange} value={config.value} />
      ),
      render: (_, record) => {
        const {loanMoney} = record;
        if (loanMoney) {
          return numeral(`${loanMoney}`).format('0,0.00')
        }
        return '--'
      }
    },
    {
      title: '借款类型',
      dataIndex: 'loanType',
      initialValue: -1,
      // @ts-ignore
      renderFormItem: (
        item: ProColumns<VisitItem>,
        config: {
          value?: any;
          onChange: (value: any) => void;
        }
      ) => (
        <Select value={config.value} onChange={config.onChange}>
          <Option key="-1" value={-1}>全部</Option>
          <Option key="1" value={1}>人个贷款</Option>
          <Option key="2" value={2}>企业贷款</Option>
        </Select>
      ),
      render: (_, record) => {
        const {loanType} = record;
        if (loanType) {
          return loanType && +loanType === 1 ? '个人贷款' : '企业贷款';
        }
        return '--';
      }
    },
    {
      title: '贷款产品',
      dataIndex: 'productName',
      render: (_, record) => {
        const {productName} = record;
        if (productName) {
          return productName
        }
        return '--'; 
      }
    },
    // {
    //   title: '剩余还款期',
    //   dataIndex: 'name',
    // },
    {
      title: '跟进专员',
      dataIndex: 'followUserName',
      render: (_, record) => {
        const {followUserName} = record;
        if (followUserName) {
          return followUserName;
        }
        return '--';
      }
    },
    {
      title: '本月回访',
      dataIndex: 'haveReturnVisit',
      formItemProps: {
        placeholder: '请输入',
        allowClear: true
      },
      initialValue: -1,
      // @ts-ignore
      renderFormItem: (
        item: ProColumns<VisitItem>,
        config: {
          value?: any;
          onChange: (value: any) => void;
        }
      ) => (
        <Select value={config.value} onChange={config.onChange}>
          <Option key="-1" value={-1}>全部</Option>
          <Option key="1" value={1}>是</Option>
          <Option key="0" value={0}>否</Option>
        </Select>
      ),
      render: (val) => {
        // havePartnerKnown
        return val === 0 ? '否' : <span style={{color: '#52c41a'}}>是</span>
      }
    },
    {
      title: '操作',
      dataIndex: 'opration',
      valueType: 'option',
      render: (_, record) => {
        const { workNo } = record;
        return (
          <>
            <a onClick={() => {
              history.push(`/loan/record?workNo=${workNo}`);
            }}>详情</a>
          </>
        )
      }
    }
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<VisitItem> 
        rowKey="id"
        actionRef={actionRef}
        headerTitle="出资方列表"
        toolBarRender={false}
        columns={columns}
        // @ts-ignore
        request={(params: {[key: string]: any}) => {
          if (params) {
            // @ts-ignore
            const tempParms: VisitParmas = {
              ...params,
              pageIndex: params.pageIndex || 1,
              pageSize: params.pageSize || 10
            }
            delete tempParms.current;
            if (!tempParms.name) delete tempParms.name;
            if (!tempParms.loanMoney) {
              delete tempParms.loanMoney;
            }
            else {
              tempParms.loanMoney = transfNumbToFloat(tempParms.loanMoney);
            }
            if (!tempParms.expectLoanMoney) {
              delete tempParms.expectLoanMoney;
            } else {
              tempParms.expectLoanMoney = transfNumbToFloat(tempParms.expectLoanMoney);
            }
            if (tempParms.loanType === -1) {
              delete tempParms.loanType;
            }
            if (!tempParms.productName) delete tempParms.productName;
            if (!tempParms.followUserId) delete tempParms.followUserId;
            if (tempParms.haveReturnVisit === -1) delete tempParms.haveReturnVisit;
            // if (tempParms.)
            // @ts-ignore
            delete tempParms._timestamp;
            return fetchVisitList(tempParms)
          }
          return {data: []}
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
      />
    </PageHeaderWrapper>
  )
}

export default Product;