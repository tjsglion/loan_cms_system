/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { history } from 'umi';
import numeral from 'numeral';
import { fetchVisitList } from './server';
import { VisitItem } from './data';


interface ProductProps {}


const Product: React.FC<ProductProps> = () => {

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<VisitItem>[] = [
    {
      title: '借款人',
      dataIndex: 'customerBase.name',
      render: (_, record) => {
        const {customerBase} = record;
        return (<span>
          {customerBase.name}
        </span>)
      }
    },
    {
      title: '贷款金额',
      dataIndex: 'signUpBaseInfo.loanMoney',
      render: (_, record) => {
        const {signUpBaseInfo} = record;
        if (signUpBaseInfo) {
          return numeral(`${signUpBaseInfo.loanMoney}`).format('0,0.00')
        }
        return '--'
      }
    },
    {
      title: '放款金额',
      dataIndex: 'loanExpect.expectLoanMoney',
      render: (_, record) => {
        const {loanExpect} = record;
        if (loanExpect) {
          return numeral(`${loanExpect.expectLoanMoney}`).format('0,0.00')
        }
        return '--'
      }
    },
    {
      title: '借款类型',
      dataIndex: 'name',
    },
    {
      title: '贷款产品',
      dataIndex: 'signUpBaseInfo.productName',
      render: (_, record) => {
        const {signUpBaseInfo} = record;
        if (signUpBaseInfo) {
          return signUpBaseInfo.productName
        }
        return '--'; 
      }
    },
    {
      title: '剩余还款期',
      dataIndex: 'name',
    },
    {
      title: '跟进专员',
      dataIndex: 'signUpBaseInfo.followUserId',
      render: (_, record) => {
        const {signUpBaseInfo} = record;
        if (signUpBaseInfo) {
          return signUpBaseInfo.followUserId;
        }
        return '--';
      }
    },
    {
      title: '本月回访',
      dataIndex: 'name',
    },
    {
      title: '操作',
      dataIndex: 'opration',
      valueType: 'option',
      render: (_, record) => {
        const { loanExpect: { workNo } } = record;
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