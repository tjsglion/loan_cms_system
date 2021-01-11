import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { DATETIME, FollowMethod } from '@/constants';
import moment from 'moment';
import { DatePicker, Button, Select } from 'antd';
import { history } from 'umi';
import Authorized from '@/components/Authorized/Authorized';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { queryDepLists } from '@/pages/Authorities/Role/server';
import { DepartmentItem } from '@/pages/Authorities/Department/data';
import { FollowUpItem, FollowUpParmas } from './data';
import { fetchCustomerFollowLogList } from './server';
import styles from './index.less';
import { filterEmptyFields } from '@/utils/utils';


interface CustomerFollowUpProps {}
const { RangePicker } = DatePicker;
const { Option } = Select;
const CustomerFollowUp: React.FC<CustomerFollowUpProps> = () => {

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [department, setDepartment] = useState<DepartmentItem[]>();

  useEffect(() => {
    // 查看所有的部门信息
    queryDepLists({
      pageIndex: 1,
      pageSize: 1000
    }).then(res => {
      if (res.data.length) {
        // @ts-ignore
        setDepartment(res.data);
      }
    });
  }, []);

  const columns: ProColumns<FollowUpItem>[] = [
    {
      title: '计划时间',
      dataIndex: 'followTime',
      // width: '12%',
      // @ts-ignore
      renderFormItem: (
        item: ProColumns<FollowUpItem>,
        config: {
          value?: any;
          onChange: (value: any) => void;
        }
      ) => (
        <RangePicker style={{ width: '100%' }} locale={locale} format="YYYY-MM-DD" onChange={config.onChange} />
      ),
      render: (_, record) => {
        const {followLog} = record;
        return followLog.followTime && moment(`${followLog.followTime}`).format(DATETIME) || '--';
        // return val && moment(`${val}`).format(DATEFORMAT)
      }
    },
    {
      title: '跟进内容',
      dataIndex: 'followLog.followDetails',
      hideInSearch: true,
      render: (_, record) => {
        const {followLog} = record;
        console.log(record)
        return (
        <div
          className={styles['table-col-wrapper']}
          style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
          // @ts-ignore
          onClick={() => setActiveIndex(activeIndex === id ? '' : id)}
        >
          <span
            className={
              activeIndex !== followLog.id
                ? styles['table-col-show-one']
                : 'table-col-show-normal'
            }
          >
            {followLog.followDetails}
          </span>
        </div>
      )}
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      formItemProps: {
        placeholder: '请输入',
        allowClear: true
      },
      render: (_, record) => {
        const {customerBase} = record;
        return (<span>{customerBase.name}</span>)
      }
    },
    // {
    //   title: '公司名称',
    //   dataIndex: 'companyName',
    //   hideInTable: true,
    //   formItemProps: {
    //     placeholder: '请输入',
    //     allowClear: true
    //   },
    // },
    {
      title: '客户经理',
      dataIndex: 'followUserName',
      hideInTable: true,
      formItemProps: {
        placeholder: '请输入',
        allowClear: true
      },
    },
    {
      title: '部门',
      dataIndex: 'followDepartId',
      initialValue: '-1',
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        return (
          <Select {...rest}>
            <Option value="-1" key="-1">全部</Option>
            {
              department.length && department.map(d => (
                <Option key={d.id} value={d.id}>{d.name}</Option>
              ))
            }
          </Select>
        )
      }
    },
    // {
    //   title: '借款人',
    //   dataIndex: 'borrower',
    //   hideInSearch: true,
    //   width: '10%',
    // },
    {
      title: '是否完成',
      dataIndex: 'finish',
      width: '8%', 
      hideInSearch: true,
      render: (val) => val ? '已完成' : '未完成'
    },
    {
      title: '完成日期',
      dataIndex: 'followTime',
      hideInSearch: true,
      width: '12%',
      render: (_, record) => {
        const {followLog} = record;
        return followLog.followTime && moment(followLog.followTime).format(DATETIME) || '--'
      }
    },
    {
      title: '跟进情况',
      dataIndex: 'followState',
      hideInSearch: true,
      render: (_, record) => {
        const {followLog} = record;
        return (<span>{FollowMethod.filter(f => f.value === +followLog.followType)[0].key}</span>)
      }
    },
    {
      title: '跟进专员',
      dataIndex: 'followPerson',
      hideInSearch: true,
      render: (_, record) => {
        const {followLog} = record;
      return (<span>{followLog.followUserName}</span>)
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      fixed: 'right',
      align: 'center',
      hideInSearch: true,
      width: 80,
      // @ts-ignore
      render: (_, record) => {
        const { followLog: {id, customerId} } = record;
        return (
          <>
            <Authorized authority={['admin', '10']}>
              <Button type="link" onClick={() => history.push(`/customer/followup/profile?id=${id}&customerId=${customerId}`)}>详情</Button>
            </Authorized>
          </>
        )
      }
    }
  ]
  return (
    <PageHeaderWrapper>
      <ProTable<FollowUpItem> 
        rowKey="id"
        toolBarRender={false}
        columns={columns}
        beforeSearchSubmit={params => {
          if (params.followTime) {
            const startTime = params.followTime[0];
            const endTime = params.followTime[1];
            params.startTime = moment(startTime).format('YYYY-MM-DD HH:mm:ss');
            params.endTime = moment(endTime).format('YYYY-MM-DD HH:mm:ss');
          }
          delete params.followTime;
          return params;
        }}
        // @ts-ignore
        request={(params: {[key: string]: any}) => {
          if (params) {
            const tempParms: FollowUpParmas  = {
              ...params,
              pageIndex: params.pageIndex || 1,
              pageSize: params.pageSize || 10
            }
            delete tempParms.current;
            if (!tempParms.customerName) delete tempParms.customerName;
            if (!tempParms.startTime) delete tempParms.startTime;
            if (!tempParms.endTime) delete tempParms.endTime;
            // if ()
            // @ts-ignore
            delete tempParms._timestamp;
            if (tempParms.followDepartId === '-1') delete tempParms.followDepartId;
            filterEmptyFields(tempParms);
            return fetchCustomerFollowLogList(tempParms)
          }
          return {data: []}
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          // showTotal: (t) => `${formatMessage({ id: 'pages.total' })}: ${t}`,
        }}
      />
    </PageHeaderWrapper>
  )
}

export default CustomerFollowUp;
