import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { USERSTATUS, DATETIME } from '@/constants';
import moment from 'moment';
import { Button, Drawer, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { queryLists } from './server';
import AddOrEditUser from './Components/user/AddOrEditUser';
import { UserManagerItem } from './data';

const Authority: React.FC<{}> = (props) => {

  const [visible, setVisible] = useState(false);
  const [formValue, setFormValues] = useState({});
  const [type, setType] = useState('add');

  const columns: ProColumns<UserManagerItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      hideInSearch: true
    },
    {
      title: '手机号',
      dataIndex: 'phone'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (val) => USERSTATUS[`${val}`]
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (val) => val && moment(`${val}`).format(DATETIME) || '--'
    }, 
    {
      title: '操作',
      dataIndex: 'opration',
      valueType: 'option',
      render: (_, record) => {

        return <>
          <a onClick={() => {
            setVisible(true);
            setFormValues(record);
            setType('update');
          }}>
            编辑
          </a>
        </>
      }
    }
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<UserManagerItem>
        rowKey="id"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button type="primary" onClick={() => {
            setVisible(true);
            setType('add')
            setFormValues({})
          }}><PlusOutlined />新增用户</Button>
        ]}
        columns={columns}
        request={(params) => queryLists(params)}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
      />

      <Drawer 
        width={650}
        visible={visible}
        title={type === 'add' ? "添加用户" : '编辑用户'}
        closable
        maskClosable={false}
        onClose={() => {
          setVisible(false);
        }}
        footer={false}
      >
        {
          visible 
            ? <AddOrEditUser baseInfo={formValue}/> 
            : <Skeleton avatar paragraph={{ rows: 4 }} />
        }
      </Drawer>
    </PageHeaderWrapper>
  )
}

export default Authority;
