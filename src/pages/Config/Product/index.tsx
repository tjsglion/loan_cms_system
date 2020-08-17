/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
// import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Skeleton, Drawer } from 'antd';
// import { DATETIME } from '@/constants';
import { fetchProductList } from './server';
import { ProductItem, ProductParmas } from './data';
import AddOrEditProduct from './AddOrEditProduct';

interface ProductProps {}


const Product: React.FC<ProductProps> = () => {

  const [formValues, setFormValues] = useState({});
  const [type, setType] = useState('add');
  const [visible, setVisible] = useState(false);
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<ProductItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      width: '15%',
    },
    {
      title: '抵押&担保类型',
      dataIndex: 'productType',
      hideInSearch: true,
      // width: '20%',
      // render: (val) => val && moment(`${val}`) || '--'
    },
    {
      title: '额度范围',
      dataIndex: 'minLimitMoney',
      hideInSearch: true,
      align: 'right',
      render: (_, record) => {
        const {minLimitMoney, maxLimitMoney} = record;
        return (
          <>
            {minLimitMoney}~{maxLimitMoney}万
          </>
        )
      }
    },
    {
      title: '贷款期限',
      dataIndex: 'minLimitLoanTime',
      hideInSearch: true,
      align: 'right',
      render: (_, record) => {
        const {minLimitLoanTime, maxLimitLoanTime} = record;
        return (
          <>
            {minLimitLoanTime}~{maxLimitLoanTime}个月
          </>
        )
      }
    },
    {
      title: '月化利率',
      dataIndex: 'minMonthRate',
      hideInSearch: true,
      align: 'right',
      render: (_, record) => {
        const {minMonthRate, maxMonthRate} = record;
        return (
          <>
            {minMonthRate}~{maxMonthRate}%
          </>
        )
      }
    },
    {
      title: '一般放款时间',
      dataIndex: 'averageLoanTime',
      hideInSearch: true,
      align: 'right',
      render: (_, record) => {
        const {averageLoanTime} = record;
        return (
          <>
            {averageLoanTime}天
          </>
        )
      }
    },
    {
      title: '覆盖城市',
      dataIndex: 'coverRegions',
      hideInSearch: true,
      width: '15%',
      render: (_, record) => {
        const {coverRegions} = record;
        return (
          <>
            {Array.isArray(coverRegions) ? coverRegions.join(',') : coverRegions}
          </>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'opration',
      valueType: 'option',
      width: 100,
      align: 'center',
      render: (_, record) => {
        if (record.coverRegions.split) {
          // @ts-ignore
          record.coverRegions = record.coverRegions.split(',')
        }
        return (
          <>
            <a onClick={() => {
              setVisible(true);
              setFormValues(record);
              setType('update');
            }}>
              编辑
            </a>
          </>
      )}
    }
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<ProductItem> 
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
            // @ts-ignore
            const tempParms: ProductParmas = {
              ...params,
              pageIndex: params.pageIndex || 1,
              pageSize: params.pageSize || 10
            }
            delete tempParms.current;
            // @ts-ignore
            delete tempParms._timestamp;
            return fetchProductList(tempParms)
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
        title={type === 'add' ? "添加产品" : '编辑产品'}
        closable
        maskClosable={false}
        onClose={() => {
          setVisible(false);
        }}
        footer={false}
      >
        {
          visible 
            ? <AddOrEditProduct 
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

export default Product;