import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Drawer, Skeleton, Divider } from 'antd';
import { history } from 'umi';
import numeral from 'numeral';
import { PlusOutlined } from '@ant-design/icons';
import Authorized from '@/components/Authorized/Authorized';
import { DATETIME } from '@/constants';
import moment from 'moment';
import { MakeFollowUpItem, MakeFollowUpParmas } from './data';
import { fetchFollowLogList } from './server';
import AddOrEditFollowUp from './AddOrEditFollowUp';

interface MakeFollowUpProps {}

const statusMaps = {
  1: '跟进中',
  2: '已面签',
  3: '已放款'
}
const MakeFollowUp: React.FC<MakeFollowUpProps> = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('add');
  const [formValue, setFormValues] = useState({});
  const [loanId, setLoanId] = useState('');
  
  const columns: ProColumns<MakeFollowUpItem>[] = [
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
        // const { customerId } = record;
        // const {customerBase: {customerId}, followLog: {workNo}, loanExpect = {}, signUpDetails } = record;
        const {customerId, workNo, protocolNo} = record;
        return (
          <>
            <Authorized authority={['admin']}>
              <a onClick={() => {
                setVisible(true);
                setFormValues(record.signUpDetails);
                // setLoanId(loanExpect.id)
                setType('update');
              }}>
                编辑
              </a>
            </Authorized>
            {/* {
              record.
            } */}
            <Authorized authority={['admin']}>
              <Divider type="vertical" />
              {
                protocolNo ? (
                  <a onClick={() => history.push(`/order/make/follup/editSign?customerId=${customerId}&workNo=${workNo}&type=edit`)}>
                    编辑签单
                  </a>
                ) : (
                  <a onClick={() => history.push(`/order/make/follup/sign?customerId=${customerId}&workNo=${workNo}&type=add`)}>
                    签单
                  </a>
                )
              }
              
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

  return (
    <PageHeaderWrapper>
      <ProTable<MakeFollowUpItem> 
        rowKey="id"
        actionRef={actionRef}
        headerTitle="做单列表"
        toolBarRender={() => [
          <Authorized authority={['admin', '13']}>
            <Button type="primary" onClick={() => {
              setVisible(true);
              setType('add')
              setFormValues({})
              setLoanId('');
            }}><PlusOutlined />新增做单</Button>
          </Authorized>
        ]}
        columns={columns}
        // @ts-ignore
        request={(params: {[key: string]: any}) => {
          if (params) {
            const tempParms: MakeFollowUpParmas = {
              ...params,
              pageIndex: params.pageIndex || 1,
              pageSize: params.pageSize || 10
            }
            delete tempParms.current;
            if (!tempParms.rejectReason) delete tempParms.rejectReason;
            if (!tempParms.followUserName) delete tempParms.followUserName;
            // @ts-ignore
            delete tempParms._timestamp;
            return fetchFollowLogList(tempParms)
          }
          return {data: []}
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
}

export default MakeFollowUp;
