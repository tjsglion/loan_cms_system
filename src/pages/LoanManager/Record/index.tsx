import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { fetchRecordList } from './server';
import { RecordItem } from './data';
import moment from 'moment';
import { DATETIME } from '@/constants';

interface LoanRecordProps {
  location: {
    query: {
      workNo: string
    }
  }
}

const LoanRecord: React.FC<LoanRecordProps> = (props) => {

  const { location: { query } } = props;
  const { workNo } = query;

  const columns: ProColumns<RecordItem>[] = [
    {
      title: '回访人员',
      dataIndex: 'returnVisitUserName',
      hideInSearch: true,
    },
    {
      title: '计划时间',
      dataIndex: 'planReturnVisitTime',
      hideInSearch: true,
      render: (val) => val && moment(`${val}`).format(DATETIME)
    },
    {
      title: '回访时间',
      dataIndex: 'reallyReturnVisitTime',
      hideInSearch: true,
      render: (val) => val && moment(`${val}`).format(DATETIME)
    },
    {
      title: '回访类型',
      dataIndex: 'returnVisitType',
      hideInSearch: true,
    },
    {
      title: '回访内容',
      dataIndex: 'returnVisitContent',
      hideInSearch: true,
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<RecordItem> 
        rowKey="id"
        // actionRef={actionRef}
        headerTitle="出资方列表"
        // toolBarRender={() => [
        //   <Button type="primary" onClick={() => {
        //     setVisible(true);
        //     setType('add')
        //     setFormValues({})
        //   }}><PlusOutlined />新增</Button>
        // ]}
        toolBarRender={false}
        columns={columns}
        search={false}
        // @ts-ignore
        request={(params: {[key: string]: any}) => {
          if (!workNo) return { data: [] };
          if (params) {
            // @ts-ignore
            const tempParms: ProductParmas = {
              ...params,
              // pageIndex: params.pageIndex || 1,
              // pageSize: params.pageSize || 10,
              workNo
            }
            delete tempParms.current;
            // @ts-ignore
            delete tempParms._timestamp;
            delete tempParms.pageSize;

            return fetchRecordList(tempParms)
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

export default LoanRecord;
