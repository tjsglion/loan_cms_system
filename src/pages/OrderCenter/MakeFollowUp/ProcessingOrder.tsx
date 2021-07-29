import React, { useEffect, useRef, useState } from 'react';

import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Authorized from '@/components/Authorized/Authorized';
import { history } from 'umi';
import { Button, DatePicker, Drawer, message, Select, Skeleton } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { fetchProductList } from '@/pages/Config/Product/server';
import moment from 'moment';
import { MakeFollowUpItem, MakeFollowUpParmas } from './data';
import { fetchFollowLogList, fetchOrderDownload } from './server';
import AddOrEditFollowUp from './AddOrEditFollowUp';
import { Columns } from './commonColumn';
import { download, filterEmptyFields } from '@/utils/utils';


interface ProcessingOrderIProps {}

const { RangePicker } = DatePicker;
const { Option } = Select;

const ProcessingOrder: React.FC<ProcessingOrderIProps> = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('add');
  const [formValue, setFormValues] = useState({});
  const [loanId, setLoanId] = useState('');
  const [products, setProducts] = useState([]);

  const formRef = useRef();

  const path = history.location.pathname;

  useEffect(() => {
    fetchProductList({
      pageSize: 1000,
      pageIndex: 1,
    }).then(res => {
      const {data = []} = res;
      if (data.length > 0) {
        // @ts-ignore
        setProducts(data);
        const fir = data[0];
        formRef.current?.setFieldsValue({
          productId: fir.productId
        })
        setTimeout(() => {
          actionRef.current?.reload();
        }, 0);
      } else {
        setProducts([]);
      }
    });
  }, []);
  
  const columns: ProColumns<MakeFollowUpItem>[] = [
    {
      title: '创建时间',
      dataIndex: 'times',
      initialValue: [moment(new Date()).add(-7, 'days'), moment(new Date())],
      hideInTable: true,
      // @ts-ignore
      valueType: 'dateRange',
    },
    {
      title: '产品名称',
      dataIndex: 'productId',
      hideInTable: true,
      renderFormItem: (_, { ...rest }) => {
        return (
          <Select {...rest}>
            {
              products.length && products.map(d => (
                <Option key={d.productId} value={d.productId}>{d.name}</Option>
              ))
            }
          </Select>
        )
      }
    },
    ...Columns,
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      fixed: 'right',
      // align: 'center',
      hideInSearch: true,
      width: 150,
      // @ts-ignore
      render: (_, record) => {
        const {customerId, workNo} = record;
        return (
          <>
            <Authorized authority={['admin']}>
              <a onClick={() => history.push(`/order/processing/editSign?customerId=${customerId}&workNo=${workNo}&type=edit&parentPath=${path}`)}>
                编辑签单
              </a>
              
            </Authorized>
          </>
        )
      }
    }
  ];

  const handleFinish = () => {
    setVisible(false);
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }

  const filterParams = (params?: Partial<MakeFollowUpParmas>) => {
    let tempParams = formRef.current?.getFieldsValue();
    if (!tempParams.productId) return {data: [], total: 0};
    if (tempParams.times) {
      const [start, end] = tempParams.times;
      tempParams.startTime = `${moment(start).format('YYYY-MM-DD')} 00:00:00`;
      tempParams.endTime = `${moment(end).format('YYYY-MM-DD')} 23:59:59`;
      
    }
    
    if (params) {
      tempParams = { ...tempParams, ...params,
        pageIndex: params.pageIndex || 1,
        pageSize: params.pageSize || 10
      }
    }
    

    delete tempParams.times;
    delete tempParams.current;
    tempParams.status = 2;
    filterEmptyFields(tempParams);
    return tempParams;
  }

  const handleDownload = () => {
    fetchOrderDownload(filterParams()).then(res => {
      // console.log('下载返回的数据:', res);
      if (res.status !== 0) {
        message.error(res.info);
        return;
      }
      message.success('数据导出成功，稍后弹窗下载框，请保存');
      // console.log(res);
      download(res.data.url, '');
    })
  }

  return (
    <PageHeaderWrapper>
      <ProTable<MakeFollowUpItem> 
        rowKey="id"
        actionRef={actionRef}
        formRef={formRef}
        headerTitle="进行中的订单"
        toolBarRender={() => [
          <Button type="primary" onClick={handleDownload}>下载</Button>
        ]}
        search={{
          collapsed: false,
          collapseRender: () => ''
        }}
        columns={columns}
        // @ts-ignore
        request={(params: {[key: string]: any}) => {
          if (params) {
          //   const tempParms: MakeFollowUpParmas = {
          //     ...params,
          //     pageIndex: params.pageIndex || 1,
          //     pageSize: params.pageSize || 10
          //   }
          //   delete tempParms.current;
          //   if (!tempParms.rejectReason) delete tempParms.rejectReason;
          //   if (!tempParms.followUserName) delete tempParms.followUserName;
          //   // @ts-ignore
          //   delete tempParms.timestamp;
          //   tempParms.status = 2;
          //   return fetchFollowLogList(tempParms)
          // }
          // return {data: []}
          // return fetchFollowLogList(filterParams(params))
          const tmpParams = filterParams(params);
            if (!tmpParams) return { data: [], total: 0 };
            return fetchFollowLogList(tmpParams);
          }
          return {data: [], total: 0};
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
      />

      <Drawer 
        width={650}
        visible={visible}
        title={type === 'add' ? "添加做单" : '编辑做单'}
        closable
        maskClosable={false}
        onClose={() => {
          setVisible(false);
        }}
        footer={false}
      >
        {
          visible
            ? <AddOrEditFollowUp
                id={loanId}
                baseInfo={formValue}
                onFinish={handleFinish}
                onClose={() => setVisible(false)}
            />
            : <Skeleton avatar paragraph={{ rows: 4 }} />
        }
      </Drawer>
    </PageHeaderWrapper>
  )
};

export default ProcessingOrder;