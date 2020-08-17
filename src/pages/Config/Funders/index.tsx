/* eslint-disable no-underscore-dangle */
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Skeleton } from 'antd';
import { DATETIME } from '@/constants';
import { fetchFundersList } from './server';
import { FundersItem, FundersParmas } from './data';
import AddOrEditFunders from './AddOrEditFunders';

interface ProductProps {}

const Product: React.FC<ProductProps> = () => {

  const [formValues, setFormValues] = useState({});
  const [type, setType] = useState('add');
  const [visible, setVisible] = useState(false);
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<FundersItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      render: (val) => val && moment(`${val}`).format(DATETIME) || '-'
      // render: (val) => val && moment(`${val}`) || '--'
    },
    {
      title: '备注',
      dataIndex: 'remarkInfo',
      hideInSearch: true
    },
    {
      title: '操作',
      dataIndex: 'opration',
      valueType: 'option',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <>
          <a onClick={() => {
            setVisible(true);
            setFormValues(record);
            setType('update');
          }}>
            编辑
          </a>
        </>
      )
    }
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<FundersItem> 
        rowKey="id"
        actionRef={actionRef}
        headerTitle="出资方列表"
        toolBarRender={() => [
          <Button type="primary" onClick={() => {
            setVisible(true);
            setType('add')
            setFormValues({})
          }}><PlusOutlined />新增</Button>
        ]}
        columns={columns}
        // @ts-ignore
        request={(params: {[key: string]: any}) => {
          if (params) {
            const tempParms: FundersParmas = {
              ...params,
              pageIndex: params.pageIndex || 1,
              pageSize: params.pageSize || 10
            }
            delete tempParms.current;
            // @ts-ignore
            delete tempParms._timestamp;
            
            return fetchFundersList(tempParms)
          }
          return {data: []}
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
      />
      <Modal 
        visible={visible}
        title={type === 'add' ? "添加" : '编辑'}
        closable
        onCancel={() => {
          setVisible(false);
        }}
        footer={false}
      >
        {
          visible 
            ? <AddOrEditFunders 
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
            /> 
            : <Skeleton avatar paragraph={{ rows: 4 }} />
        }
      </Modal>
    </PageHeaderWrapper>
  )
}

export default Product;