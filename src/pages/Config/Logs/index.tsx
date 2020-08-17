/* eslint-disable no-underscore-dangle */
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import moment from 'moment';
import { DATETIME } from '@/constants';
import { LogsItem, LogsParmas } from './data';
import { fetchLogsList } from './server';


interface LogsProps {}

const Logs: React.FC<LogsProps> = () => {

  const columns: ProColumns<LogsItem>[] = [
    {
      title: '用户名称',
      dataIndex: 'userName',
      hideInSearch: true,
    },
    {
      title: '操作类型',
      dataIndex: 'operType',
      hideInSearch: true,
      // width: '20%',
      // render: (val) => val && moment(`${val}`) || '--'
    },
    {
      title: '操作行为',
      dataIndex: 'operAction',
      hideInSearch: true,
    },
    {
      title: '操作时间',
      dataIndex: 'operTime',
      hideInSearch: true,
      render: (val) => val && moment(`${val}`).format(DATETIME)
    },
    {
      title: '操作所属模块',
      dataIndex: 'operModule',
      hideInSearch: true,
    }
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<LogsItem>
        rowKey="id"
        headerTitle="日志列表"
        toolBarRender={false}
        columns={columns}
        search={false}
        // @ts-ignore
        request={(params: {[key: string]: any}) => {
          if (params) {
            const tempParms: LogsParmas = {
              ...params,
              pageIndex: params.pageIndex || 1,
              pageSize: params.pageSize || 10
            }
            delete tempParms.current;
            // @ts-ignore
            delete tempParms._timestamp;
            return fetchLogsList(tempParms)
          }
          return {data: []}
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
      />
    </PageHeaderWrapper>
  )
}

export default Logs;