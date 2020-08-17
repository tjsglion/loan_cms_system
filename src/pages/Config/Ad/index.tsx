/* eslint-disable no-underscore-dangle */
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { /* Button, */ Modal, Skeleton } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
import { DATETIME } from '@/constants';
import moment from 'moment';
import { AdItem } from './data';
import { fetchAdList } from './server';
import AddOrEditAd from './AddOrEditAd';


interface AdProps {}

const Ad: React.FC<AdProps> = () => {

  const [formValues, setFormValues] = useState({});
  const [type, setType] = useState('add');
  const [visible, setVisible] = useState(false);
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<AdItem>[] = [
    {
      title: '公告标题',
      dataIndex: 'title',
      width:"10%"
    },
    {
      title: '公告内容',
      dataIndex: 'content',
      hideInSearch: true,
      // width: '20%',
      // render: (val) => val && moment(`${val}`) || '--'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      width:"20%",
      render: (val) => val && moment(`${val}`).format(DATETIME)
    },
    // {
    //   title: '操作',
    //   dataIndex: 'opration',
    //   valueType: 'option',
    //   width: 100,
    //   align: 'center',
    //   render: (_, record) => (
    //     <>
    //       <a onClick={() => {
    //         setVisible(true);
    //         setFormValues(record);
    //         setType('update');
    //       }}>
    //         编辑
    //       </a>
    //     </>
    //   )
    // }
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<AdItem>
        rowKey="id"
        actionRef={actionRef}
        headerTitle="日志列表"
        // toolBarRender={() => [
        //   <Button type="primary" onClick={() => {
        //     setVisible(true);
        //     setType('add')
        //     setFormValues({})
        //   }}><PlusOutlined />新增</Button>
        // ]}
        toolBarRender={false}
        search={false}
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
            return fetchAdList(tempParms)
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
            ? <AddOrEditAd 
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

export default Ad;