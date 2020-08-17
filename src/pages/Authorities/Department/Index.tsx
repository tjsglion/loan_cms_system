import React, { useRef, useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { DATETIME } from '@/constants';
import moment from 'moment';
import { Modal, Button, Skeleton, message } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import AddOrEditDepartment from '../Components/department/AddOrEditorDepartment';
import { DepartmentItem, DepartmentParmas } from './data';
import { queryLists, queryAddDepartment, queryUpdateDepartment } from './server';

const Department: React.FC<{}> = () => {
  
  const actionRef = useRef<ActionType>();
  const [formValues, setFormValues] = useState({});
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('');
  const [department, setDepartment] = useState<Array<{[key: string]: any}>>([]);
  const columns: ProColumns<DepartmentItem>[] = [
    {
      title: '部门名称',
      dataIndex: 'name'
    },
    {
      title: '上级部门',
      hideInSearch: true,
      dataIndex: 'parentId',
      render: (val) => {
        const deps = department.filter(dep => dep.id === val)[0];
        if (deps) {
          return deps.name
        }
        return '--'
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      renderText: (val: string | Date) => {
        return val && moment(`${val}`).format(DATETIME) || '--';
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => {
            setFormValues(record);
            setType('update');
            setVisible(true)
          }}>
            编辑
          </a>
        </>
      )
    }
  ];

  const getAllDepartment = () => {
    // 获取所有的部门信息
    queryLists({
      pageIndex: 1,
      pageSize: 1000
    }).then((res: {[key: string]: any}) => {
      setDepartment(res.data || []);
    });
  };

  useEffect(() => {
    getAllDepartment();
  }, []);

  // 提交表单
  const handleSubmitForm = (values: {[key: string]: any}) => {
    const handleResponse = ((res: {[key: string]: any}) => {
      const {status, info} = res;
      setVisible(false);
      if (status === 0) {
        message.success(info);
        if (actionRef.current) {
          actionRef.current.reload();
          // 重新加载所有的部门信息
          getAllDepartment();
        }
      }
    });
    // @ts-ignore
    const params = type === 'add' ? values : ({ ...values, id: formValues.id });
    if (type === 'add') {
      queryAddDepartment(params).then(res => handleResponse(res));
    } else {
      queryUpdateDepartment(params).then(res => handleResponse(res));;
    }

  }

  return (
    <PageHeaderWrapper>
      <ProTable<DepartmentItem>
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        // @ts-ignore
        request={
          (params: {[key: string]: any}) => {
            if (params) {
              const tempParams: DepartmentParmas = {
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
          <Button type="primary" onClick={() => { 
            setVisible(true); 
            setType('add');
            setFormValues({});
          }}>
            <PlusOutlined /> 新增部门
          </Button>,
        ]}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
      />

      <Modal
        visible={visible}
        title={`${type === 'add' ? '添加' : '修改'}部门`}
        closable
        onCancel={() => setVisible(false)}
        footer={false}
      >
        {
          visible ? (
            <AddOrEditDepartment
              baseInfo={formValues}
              department={department}
              onSubmit={handleSubmitForm}
            />
          ) : <Skeleton avatar paragraph={{ rows: 4 }} />
        }
        
      </Modal>
    </PageHeaderWrapper>
  )
}

export default Department;