/* eslint-disable no-underscore-dangle */
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Drawer, Skeleton } from 'antd';
import { history } from 'umi';
import { PlusOutlined } from '@ant-design/icons/lib/icons';
import moment from 'moment';
import { DATETIME } from '@/constants';
import { CustomerAllotItem, CustomerAllotParmas } from './data.d';
import { fetchCustomerAllotList } from './server';
import AddOrEditAllot from './AddOrEditAllot';
import Authorized from '@/components/Authorized/Authorized';


interface CustomerAllotProps {}

const CustomerAllot: React.FC<CustomerAllotProps> = () => {

  const [formValues, setFormValues] = useState({});
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('add');
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<CustomerAllotItem>[] = [
    // {
    //   title: '序号',
    //   dataIndex: 'code',
    //   hideInSearch: true
    // },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      hideInSearch: true
    },
    {
      title: '转移时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      render: (val) => val && moment(`${val}`).format(DATETIME) || '--'
    },
    {
      title: '客户状态',
      dataIndex: 'customerStatus',
      hideInSearch: true
    },
    {
      title: '分配原因',
      dataIndex: 'distributeReason',
      hideInSearch: true,
    },
    {
      title: '转移前销售',
      dataIndex: 'beforeFollowerUser',
      hideInSearch: true
    },
    {
      title: '转移后销售',
      dataIndex: 'afterFollowerUser',
      hideInSearch: true
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
        const {id} = record;
        return (
          <>
            <Authorized authority={['admin', '18']}>
              <Button type="link" onClick={() => history.push(`/order/allot/profile?id=${id}`)}>详情</Button>
            </Authorized>
          </>
        )
      }
    }
  ]
  return (
    <PageHeaderWrapper>
      <ProTable<CustomerAllotItem> 
        rowKey="id"
        headerTitle="分配列表"
        actionRef={actionRef}
        toolBarRender={() => [
          // <Button type="primary">客户分配</Button>
          <Authorized authority={['admin', '17']}>
            <Button type="primary" onClick={() => {
              setVisible(true);
              setType('add')
              setFormValues({})
            }}><PlusOutlined />客户分配</Button>
          </Authorized>
        ]}
        // toolbarRender={false}
        search={false}
        columns={columns}
        // @ts-ignore
        request={(params: {[key: string]: any}) => {
          if (params) {
            const tempParms: CustomerAllotParmas = {
              ...params,
              pageIndex: params.pageIndex || 1,
              pageSize: params.pageSize || 10
            }
            delete tempParms.current;
            // @ts-ignore
            delete tempParms._timestamp;
            return fetchCustomerAllotList(tempParms)
          }
          return {data: []}
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
      />

      <Drawer 
        width={650}
        visible={visible}
        title={type === 'add' ? "添加客户分配" : '编辑客户分配'}
        closable
        maskClosable={false}
        onClose={() => {
          setVisible(false);
        }}
        footer={false}
      >
        {
          visible 
            ? <AddOrEditAllot 
                isEdit={type !== 'add'}
                baseInfo={formValues}
                onSuccess={
                  () => {
                    setVisible(false)
                    if (actionRef.current) {
                      actionRef.current.reload();
                    }
                  }
                }
                // funders={[]}
              /> 
            : <Skeleton avatar paragraph={{ rows: 4 }} />
        }
      </Drawer>
    </PageHeaderWrapper>
  )
}

export default CustomerAllot;
