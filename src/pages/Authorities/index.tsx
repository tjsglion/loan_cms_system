import React, { useState, useEffect, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { USERSTATUS, DATETIME } from '@/constants';
import moment from 'moment';
import { Button, Drawer, Skeleton, Popconfirm, Divider, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Authorized from '@/components/Authorized/Authorized';

import { queryLists, queryResetPwd } from './server';
import AddOrEditUser from './Components/user/AddOrEditUser';
import { UserManagerItem, UserManagerParmas } from './data';
import { queryRoleLists } from './Role/server';
import { queryDepLists } from './Department/server';
import { queryAddAccount } from './Components/user/server';

const Authority: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  const [formValue, setFormValues] = useState({});
  const [type, setType] = useState('add');
  const [roles, setRoles] = useState<Array<{[key: string]: any}>>([]);
  const [deps, setDeps] = useState<Array<{[key: string]: any}>>([])

  useEffect(() => {
    // 获取所有的角色
    queryRoleLists({
      pageSize: 100,
      pageIndex: 1
    }).then(res => {
      const {data = []} = res;
      // @ts-ignore
      setRoles(data);
    })

    // 获取部门信息
    queryDepLists({
      pageSize: 100,
      pageIndex: 1
    }).then(res => {
      const {data = []} = res;
      // @ts-ignore
      setDeps(data)
    })
  }, []);

  const handleFinish = () => {
    setVisible(false);
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }

  const handleConfirm = (record: {[key: string]: any}) => {
    // @ts-ignore
    record.status = record.status === 1 ? 2 : 1;
    delete record.createTime;
    delete record.updateTime;
    queryAddAccount(record, 'edit').then(res => {
      if (res.status === 0) {
        handleFinish();
      }
    });
  }
  // 重置密码
  const handlePwdConfirm = (record: {[key: string]: any}) => {
    // @ts-ignore
    record.status = record.status === 1 ? 2 : 1;
    delete record.createTime;
    delete record.updateTime;
    queryResetPwd(record).then(res => {
      console.log('重围密码成功:', res);
      if (res.status === 0) {
        message.success('重置密码成功, 新密码: 123456');
        handleFinish();
      }
    })
  }

  const columns: ProColumns<UserManagerItem>[] = [
    {
      title: '账号',
      dataIndex: 'operAccount'
    },
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      hideInSearch: true,
      render: val => {
        if (val) {
          const role = roles.find(r => r.id === +val) || {};
          return role.name;
        }
        return '--';
      }
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      hideInSearch: true
    },
    {
      title: '部门',
      dataIndex: 'status',
      hideInSearch: true,
      render: val => {
        if (val) {
          const dep = deps.find(d => d.id === +val) || {};
          return dep.name;
        }
        return '--';
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      render: (val) => USERSTATUS[`${val}`]
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      render: (val) => val && moment(`${val}`).format(DATETIME) || '--'
    }, 
    {
      title: '操作',
      dataIndex: 'opration',
      valueType: 'option',
      width: 180,
      render: (_, record) => {

        return <>
          <Authorized authority={['admin', '42']}>
            <a onClick={() => {
              setVisible(true);
              setFormValues(record);
              setType('update');
            }}>
              编辑
            </a>
          </Authorized>
          <Authorized authority={['admin', '43', '44']}>
            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              title="确定吗?"
              okText="确定"
              cancelText="取消"
              onConfirm={() => handleConfirm(record)}
            >
              <a>
                {record.status === 1 ? '停用' : '启用'}
              </a>
            </Popconfirm>
          </Authorized>
          <Authorized authority={['admin', '46']}>
            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              title="确定吗?"
              okText="确定"
              cancelText="取消"
              onConfirm={() => handlePwdConfirm(record)}
            >
              <a>
                重置密码
              </a>
            </Popconfirm>
          </Authorized>
        </>
      }
    }
  ];


  return (
    <PageHeaderWrapper>
      <ProTable<UserManagerItem>
        rowKey="id"
        headerTitle="用户列表"
        actionRef={actionRef}
        toolBarRender={() => [
          <Authorized authority={['admin', '41']}>
            <Button type="primary" onClick={() => {
              setVisible(true);
              setType('add')
              setFormValues({})
            }}><PlusOutlined />新增用户</Button>
          </Authorized>
          
        ]}
        columns={columns}
        // request={(params) => queryLists(params)}
        // @ts-ignore
        request={(params: {[key: string]: any}) => {
            if (params) {
              const tempParams: UserManagerParmas = {
                ...params,
                pageIndex: params.current || 1,
                pageSize: params.pageSize || 10
              };
              // @ts-ignore
              // eslint-disable-next-line no-underscore-dangle
              delete tempParams._timestamp;
              delete tempParams.current;
              return queryLists(tempParams)
            }
            return { data: []}
          }
        }
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
            ? <AddOrEditUser 
              baseInfo={formValue}
              roles={roles}
              deps={deps}
              onFinish={handleFinish}
            /> 
            : <Skeleton avatar paragraph={{ rows: 4 }} />
        }
      </Drawer>
    </PageHeaderWrapper>
  )
}

export default Authority;
