import React, { useState, useEffect, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Divider, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { USERSTATUS } from '@/constants';
// import Authorized from '@/components/Authorized/Authorized';
import { RoleItem, RoleParmas } from './data';
import { queryLists, /* queryDepLists, rolequeryAddRoles, */  queryUpdateRoles, queryAllPrivis } from './server';

interface RoleProps {

}

const Role: React.FC<RoleProps> = () => {

  // const actionRef = useRef<ActionType>();
  // const [formValues, setFormValues] = useState({});
  // const [visible, setVisible] = useState(false);
  // const [type, setType] = useState('');
  // const [department, setDepartment] = useState<Array<{[key: string]: any}>>([]);
  // const getAllDepartment = () => {
  //   // 获取所有的部门信息
  //   queryDepLists({
  //     pageIndex: 1,
  //     pageSize: 1000
  //   }).then((res: {[key: string]: any}) => {
  //     setDepartment(res.data || []);
  //   });
  // };

  // useEffect(() => {
  //   getAllDepartment();
  // }, []);

  // useEffect(() => {
  //   queryAllPrivis({}).then(res => {
  //     console.log('获取所有权限列表:', res);
  //   })
  // })
  
  const columns: ProColumns<RoleItem>[] = [
    {
      title: '角色名',
      dataIndex: 'name'
    },
    {
      title: '权限范围',
      dataIndex: 'priviScope',
      hideInSearch: true,
    },
    {
      title: '数据查看范围',
      dataIndex: 'dataScope',
      hideInSearch: true,
    },
    {
      title: '状态',
      hideInSearch: true,
      dataIndex: 'status',
      render: (val) => USERSTATUS[`${val}`]
    },
    {
      title: '创建时间',
      hideInSearch: true,
      dataIndex: 'createDate'
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 280,
      render: (_, record) => {
        const {id} = record;
        return (
          <>
            {/* <Authorized authority={['admin']}> */}
              <Button type="link">分配权限</Button>
              <Divider type="vertical" />
              <Button type="link" onClick={() => {
                // setVisible(true);
                // setFormValues(record);
                // setType('update');
              }}>修改</Button>
              <Divider type="vertical" />
              <Button type="link">删除</Button>
            {/* </Authorized> */}
          </>
        );
      }
    }
  ];

  // const handleSubmitRole = (values: {[key: string]: any}) => {
  //   const handleResponse = ((res: {[key: string]: any}) => {
  //     const {status, info} = res;
  //     // setVisible(false);
  //     if (status === 0) {
  //       message.success(info);
  //       if (actionRef.current) {
  //         actionRef.current.reload();
  //         // 重新加载所有的部门信息
  //         // getAllDepartment();
  //       }
  //     }
  //   });
  //   // @ts-ignore
  //   // const params = type === 'add' ? values : ({ ...values, id: formValues.id });
  //   // if (type === 'add') {
  //   //   queryAddRoles(params).then(res => handleResponse(res));
  //   // } else {
  //   //   queryUpdateRoles(params).then(res => handleResponse(res));;
  //   // }
  // }
  return (
    <PageHeaderWrapper>
      <ProTable<RoleItem>
        rowKey="id"
        columns={columns}
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
              return queryLists(tempParams)
            }
            return { data: []}
          }
        }
        toolBarRender={() => [
          <Button type="primary" onClick={() => history.push('/account/role/add')}>
            <PlusOutlined /> 新增角色
          </Button>,
        ]}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
      />

      {/* <Modal
        visible={visible}
        title={`${type === 'add' ? '添加' : '修改'}角色`}
        closable
        onCancel={() => setVisible(false)}
        footer={false}
      >
        {
          visible ? (
            <AddOrEditRole
              // department={department}
              baseInfo={formValues}
              onSubmit={handleSubmitRole}
            />
          ) : <Skeleton avatar paragraph={{ rows: 4 }} />
        }
        
      </Modal> */}
    </PageHeaderWrapper>
  )
}

export default Role;
