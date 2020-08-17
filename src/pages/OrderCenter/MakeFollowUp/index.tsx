import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import { history } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { MakeFollowUpItem, MakeFollowUpParmas } from './data';
import { fetchFollowLogList } from './server';

interface MakeFollowUpProps {}

const MakeFollowUp: React.FC<MakeFollowUpProps> = () => {

  const columns: ProColumns<MakeFollowUpItem>[] = [
    {
      title: '协议编号',
      dataIndex: 'code',
      hideInSearch: true,
      width: '10%'
    },
    {
      title: '客户姓名',
      dataIndex: 'customerName',
      hideInSearch: true,
      width: '8%'
    },
    {
      title: '贷款产品',
      dataIndex: 'product',
      hideInSearch: true,
    },
    {
      title: '签单时间',
      dataIndex: 'signTime',
      hideInSearch: true,
      width: '10%'
    },
    {
      title: '签单状态',
      dataIndex: 'signStatus',
      hideInSearch: true,
      width: '8%'
    },
    {
      title: '资方签约人',
      dataIndex: 'signPerson',
      hideInSearch: true,
      width: '8%'
    },
    {
      title: '做单状态',
      dataIndex: 'status',
      hideInSearch: true,
      width: '8%'
    },
    {
      title: '贷款金额',
      dataIndex: 'money',
      hideInSearch: true,
      width: '8%'
    },
    {
      title: '跟进日期',
      dataIndex: 'followUpDate',
      hideInSearch: true,
      width: '10%'
    },
    {
      title: '跟进专员',
      dataIndex: 'followUpPerson',
      // hideInSearch: true,
      width: '8%'
    },
    {
      title: '跟进类容',
      dataIndex: 'followUpType',
      hideInSearch: true,
      width: '8%'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      fixed: 'right',
      align: 'center',
      hideInSearch: true,
      width: 80,
      // @ts-ignore
      render: (_, record) => {
        // const { customerId } = record;
        return (
          <>
            <Button type="link" onClick={() => history.push(`/order/make/follup/profile`)}>详情</Button>
          </>
        )
      }
    }
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<MakeFollowUpItem> 
        rowKey="id"
        headerTitle="做单列表"
        toolBarRender={() => [
          <Button type="primary"><PlusOutlined />新增做单</Button>
        ]}
        columns={columns}
         // @ts-ignore
         request={(params: {[key: string]: any}) => {
          if (params) {
            const tempParms: MakeFollowUpParmas = {
              ...params,
              pageIndex: params.pageIndex || 1,
              pageSize: params.pageSize || 10
            }
            delete tempParms.current;
            // @ts-ignore
            delete tempParms._timestamp;
            return fetchFollowLogList(tempParms)
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

export default MakeFollowUp;
