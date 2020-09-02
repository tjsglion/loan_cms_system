/* eslint-disable prefer-object-spread */
import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi';
import moment from 'moment';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Divider, Popconfirm, message } from 'antd';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { USERSTATUS, DATETIME } from '@/constants';
import Authorized from '@/components/Authorized/Authorized';
import { RoleItem, RoleParmas } from './data';
import { queryRoleLists, queryAddRoles } from './server';

interface RoleProps {

}

const Role: React.FC<RoleProps> = () => {
  
  const actionRef = useRef<ActionType>();
  const startOrStopRole = (record: {[key: string]: any}, type: string) => {

    const params = Object.assign({...record}, {status: type === 'start' ? 1 : 2});
    // console.log(params);
    delete params.createTime;
    delete params.updateTime;

    queryAddRoles(params, 'edit').then(res => {
      // console.log('更新成功:', res);
      if (res.status === 0) {
        message.success(res.info);
        // actionRef.reload();
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }
    })
  }
  
  const columns: ProColumns<RoleItem>[] = [
    {
      title: '角色名',
      dataIndex: 'name'
    },
    {
      title: '状态',
      hideInSearch: true,
      dataIndex: 'status',
      width: '20%',
      render: (val) => USERSTATUS[`${val}`]
    },
    {
      title: '创建时间',
      hideInSearch: true,
      dataIndex: 'createTime',
      render: (val) => val && moment(`${val}`).format(DATETIME) || '--'
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      width: 200,
      render: (_, record) => {
        // const {id} = record;
        return (
          <>
            <Authorized authority={['admin', '36']}>
              {/* <Button type="link">分配权限</Button> */}
              {/* <Divider type="vertical" /> */}
              <Button type="link" onClick={() => {
                // history.push(`/account/role/add?id=${id}`);
                history.push({
                  pathname: '/account/role/edit',
                  // query: {
                  //   state: record
                  // }
                  state: record
                });
              }}>修改</Button>
            </Authorized>
            {
              record.status === 1 ? (
                <Authorized authority={['admin', '37']}>
                  <Divider type="vertical" />
                  <Popconfirm title="确定要停用吗"
                    placement="topRight"
                    okText="确定"
                    cancelText="取消"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={() => startOrStopRole(record, 'stop')}
                  >
                    <Button type="link">停用</Button>
                  </Popconfirm>
                </Authorized>
              ) : (
                <Authorized authority={['admin', '38']}>
                  <Divider type="vertical" />
                  <Popconfirm title="确定要启用吗"
                    placement="topRight"
                    okText="确定"
                    cancelText="取消"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={() => startOrStopRole(record, 'start')}
                  >
                    <Button type="link">启用</Button>
                  </Popconfirm>
                </Authorized>
              )
            }
          </>
        );
      }
    }
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<RoleItem>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        // @ts-ignore
        request={
          (params: {[key: string]: any}) => {
            if (params) {
              const tempParams: RoleParmas = {
                ...params,
                pageIndex: params.current || 1,
                pageSize: params.pageSize || 10
              };
              // @ts-ignore
              // eslint-disable-next-line no-underscore-dangle
              delete tempParams._timestamp;
              delete tempParams.current;
              return queryRoleLists(tempParams)
            }
            return { data: []}
          }
        }
        toolBarRender={() => [
          <Authorized authority={['admin', '35']}>
            <Button type="primary" onClick={() => history.push('/account/role/add')}>
              <PlusOutlined /> 新增角色
            </Button>
          </Authorized>
        ]}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
      />

    </PageHeaderWrapper>
  )
}

export default Role;
