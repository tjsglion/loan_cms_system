import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Divider, Select } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { history, connect } from 'umi';
import { PlusOutlined } from '@ant-design/icons/lib/icons';
// import CustomerCenterSearch from './components/CustomerCenterSearch';
import { queryCustomerLists } from './server';
import { CustomerInfoItem, CustomerInfoParmas } from './data';
import { StateType } from './AddOrEditCustomerCenter/model';

const { Option } = Select;
const CustomerInfo: React.FC<{
  // @ts-ignore
  dispatch: Dispatch<any>
}> = (props) => {
  const { dispatch } = props;
  const columns: ProColumns<CustomerInfoItem>[] = [
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      // width: '8%'
    },
    // {
    //   title: '借款人',
    //   dataIndex: 'borrower',
    //   key: 'borrower',
    //   // width: '8%'
    // },
    {
      title: '客户性别',
      dataIndex: 'sex',
      key: 'sex',
      initialValue: -1,
      // @ts-ignore
      render: (val: number) => {
        return val === 1 ? '男' : '女'
      },
      renderFormItem: (
        item: ProColumns<CustomerInfoItem>,
        config: {
          value?: any;
          onChange?: (value: any) => void;
        },
      ) => (
        <Select value={config.value} onChange={config.onChange}>
          <Option value={-1} key="-1">全部</Option>
          <Option value={1} key="1">男</Option>
          <Option value={2} key="2">女</Option>
        </Select>
      )
    },
    // {
    //   title: '期望额度',
    //   dataIndex: 'expect',
    //   key: 'expect',
    //   // width: '8%'
    // },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      hideInSearch: true
      // width: '8%'
    },
    {
      title: '客户年龄',
      dataIndex: 'age',
      key: 'age',
      hideInSearch: true
      // width: '8%'
    },
    {
      title: '客户地址',
      dataIndex: 'address',
      key: 'address',
      width: '8%',
      hideInSearch: true
    },
    // {
    //   title: '客户类型',
    //   dataIndex: 'userType',
    //   key: 'userType',
    //   // width: '8%'
    // },
    // {
    //   title: '做单',
    //   dataIndex: 'department',
    //   key: 'department',
    // },
    // {
    //   title: '跟进专员',
    //   dataIndex: 'commissioner',
    //   key: 'commissioner',
    //   // width: '8%'
    // },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      fixed: 'right',
      align: 'center',
      hideInSearch: true,
      width: 300,
      // @ts-ignore
      render: (_, record) => {
        const { customerId, workNo } = record;
        return (
          <>
            <Button type="link" onClick={() => history.push(`/order/customer/profile?customerId=${customerId}`)}>编辑</Button>
            <Divider type="vertical"/>
            <Button type="link" onClick={() => history.push(`/order/customer/followup?customerId=${customerId}`)}>客户跟进</Button>
            <Divider type="vertical"/>
            <Button type="link" onClick={() => {
              if (workNo) {
                history.push(`/order/customer/sign?customerId=${customerId}&workNo=${workNo}`)
              }
            }}>签单</Button>
            {/* <Divider type="vertical"/> */}
            {/* <Button type="link">转入贷后</Button> */}
          </>
        )
      }
    }
  ]

  return (
    <PageHeaderWrapper>
      <ProTable<CustomerInfoItem> 
        rowKey="id"
        toolBarRender={() => [
          // <Upload
          //   name="file"
          //   accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          //   showUploadList={false}
          //   beforeUpload={handleBeforeUpload}
          //   onChange={handleUploadChange}
          // >
          //   <Button
          //     type="primary"
          //     loading={loading}
          //     style={{ marginRight: '10px' }}
          //     icon={<UploadOutlined />}
          //   >批量导入</Button>
          //   </Upload>,
          <Button icon={<PlusOutlined />} type="primary" onClick={() => {
            dispatch({
              type: 'customerCenter/addCustomerId',
              payload: {
                customerId: ''
              }
            });
            dispatch({
              type: 'customerCenter/addCompanyId',
              payload: {
                companyId: ''
              }
            });
            history.push('/order/customer/profile');
          }}>新增客户</Button>
        ]}
        columns={columns}
        // @ts-ignore
        request={
          (params: {[key: string]: any}) => {

            if (params) {
              const tempParms: CustomerInfoParmas = {
                ...params,
                pageIndex: params.pageIndex || 1,
                pageSize: params.pageSize || 10
              }
              delete tempParms.current;
              return queryCustomerLists(tempParms)
            }
            return {data: []}
          }
        }
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          // showTotal: (t) => `${formatMessage({ id: 'pages.total' })}: ${t}`,
        }}
      />
    </PageHeaderWrapper>
  )
}

// export default CustomerInfo;
export default connect(
  ({
    customerCenter
  }: {
    customerCenter: StateType
  }) => ({
    customerId: customerCenter.customerId
  })
)(
  CustomerInfo
);