import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { DATEFORMAT, DATETIME, FollowMethod } from '@/constants';
import moment from 'moment';
import { DatePicker, Button } from 'antd';
import { history } from 'umi';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { FollowUpItem } from './data';
import { fetchCustomerFollowLogList } from './server';
import styles from './index.less';

interface CustomerFollowUpProps {}

const CustomerFollowUp: React.FC<CustomerFollowUpProps> = () => {

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const columns: ProColumns<FollowUpItem>[] = [
    {
      title: '计划时间',
      dataIndex: 'followLog.followTime',
      // width: '12%',
      // @ts-ignore
      renderFormItem: (
        item: ProColumns<FollowUpItem>,
        config: {
          value?: any;
          onChange: (value: any) => void;
        }
      ) => (
        <DatePicker style={{ width: '100%' }} locale={locale} format="YYYY-MM-DD" onChange={config.onChange} />
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
      render: (_, record) => {
        const {customerBase} = record;
        return (<span>{customerBase.name}</span>)
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
      dataIndex: 'finishDate',
      hideInSearch: true,
      width: '12%',
      render: (val) => val && moment(`${val}`).format(DATEFORMAT)
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
            <Button type="link" onClick={() => history.push(`/order/follup/profile?id=${id}&customerId=${customerId}`)}>详情</Button>
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
        
        // @ts-ignore
        request={(params: {[key: string]: any}) => {
          if (params) {
            const tempParms: FollowUpParmas  = {
              ...params,
              pageIndex: params.pageIndex || 1,
              pageSize: params.pageSize || 10
            }
            delete tempParms.current;
            // @ts-ignore
            delete tempParms._timestamp;
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
