import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Divider, Modal, Form, Upload, InputNumber } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { history, connect } from 'umi';
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons/lib/icons';
import Authorized from '@/components/Authorized/Authorized';
import { headers, prod } from '@/core/http.request';
// import CustomerCenterSearch from './components/CustomerCenterSearch';
import { queryCustomerLists } from './server';
import { CustomerInfoItem, CustomerInfoParmas } from './data';
import { StateType } from './AddOrEditCustomerCenter/model';

const FormItem = Form.Item;

const CustomerInfo: React.FC<{
  // @ts-ignore
  dispatch: Dispatch<any>
}> = (props) => {

  const { dispatch } = props;
  const [form] = Form.useForm();
  const [visible] = useState(false);
  const columns: ProColumns<CustomerInfoItem>[] = [
    {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
      formItemProps: {
        placeholder: '请输入',
        allowClear: true
      }
      // width: '8%'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80,
      formItemProps: {
        placeholder: '请输入',
        allowClear: true
      },
      // @ts-ignore
      renderFormItem: ( 
        item: ProColumns<CustomerInfoItem>,
        config: {
          value?: any,
          onChange: (value: any) => void;
        }) => (
          <InputNumber style={{width: '100%'}} onChange={config.onChange} value={config.value} />
        )
      ,
      // hideInSearch: true,
      render: (_, record) => {
        return record.age ? `${record.age}岁` : '--'
      }
    },
    {
      title: '客户经理',
      dataIndex: 'followUserName',
      key: 'followUserName',
      formItemProps: {
        placeholder: '请输入',
        allowClear: true
      },
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      // width: '8%'
    },
    {
      title: '公司名称',
      dataIndex: 'companyName',
      key: 'companyName',
      // width: '8%'
    },
    {
      title: '地区',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      // width: '8%'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      fixed: 'right',
      align: 'center',
      hideInSearch: true,
      width: 300,
      // fixed: 'right',
      // @ts-ignore
      render: (_, record) => {
        const { customerId, workNo } = record;
        return (
          <>
            <Authorized authority={['admin', '4']}>
              <Button type="link" onClick={() => history.push(`/order/customer/profile?customerId=${customerId}`)}>编辑</Button>
            </Authorized>
            <Authorized authority={['admin', '6']}>
              <Divider type="vertical"/>
              <Button type="link" onClick={() => history.push(`/order/customer/followup?customerId=${customerId}`)}>客户跟进</Button>
            </Authorized>
            <Authorized authority={['admin', '8']}>
              <Divider type="vertical"/>
              <Button type="link" onClick={() => {
                if (workNo) {
                  history.push(`/order/customer/sign?customerId=${customerId}&workNo=${workNo}`)
                }
              }}>签单</Button>
            </Authorized>
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
          <Authorized authority={['admin', '3']}>
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
          </Authorized>,
          // <Authorized authority={['admin', '3']}>
          //   <Button icon={<UploadOutlined />} type="primary" onClick={() => setVisible(true)}>
          //     批量导入
          //   </Button>
          // </Authorized>
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
              if (!tempParms.name) delete tempParms.name;
              if (!tempParms.age) delete tempParms.age;
              if (!tempParms.followUserName) delete tempParms.followUserName;
              if (!tempParms.phone) delete tempParms.phone;
              if (!tempParms.companyName) delete tempParms.companyName;
              if (!tempParms.area) delete tempParms.area;
              if (!tempParms.productName) delete tempParms.productName;
              // @ts-ignore
              delete tempParms._timestamp;
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
        <Modal
          title="批量导入客户信息"
          visible={visible}
          footer={false}
        >
          <Form
            form={form}
          >
            <FormItem label="选择文件">
              {/* <Upload /> */}
              <FormItem noStyle>
                <Upload 
                  name="file"
                  multiple={false}
                  showUploadList={false}
                  headers={headers()}
                  action={
                    prod
                      ? '/api/api/base/file/upload' 
                      : '/api/api/base/file/upload'
                  }
                />
              </FormItem>
              <a href="" download="import_customer_template.xlsx">
                <DownloadOutlined /> 下载模板
              </a>
            </FormItem>
          </Form>
        </Modal>
      
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