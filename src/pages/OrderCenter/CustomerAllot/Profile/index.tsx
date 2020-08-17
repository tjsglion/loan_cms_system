import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Descriptions, Card } from 'antd';
import { fetchAllotById } from '../server';

interface CustomerAllotProfileProps {
  location: {
    query: {
      id: number;
    }
  }
}

const CustomerAllotProfile: React.FC<CustomerAllotProfileProps> = (props) => {

  const {location: { query }} = props;
  const {id} = query;
  const [allotInfo, setAllotInfo] = useState<{[key: string]: any}>({});
  
  useEffect(() => {
    if (id) {
      // 获取详情
      fetchAllotById({id}).then(res => {
        if (res.status === 0) {
          setAllotInfo(res.data);
        }
      })
    }
  }, [id])
  return (
    <PageHeaderWrapper>
      <Card>
        <Descriptions title="客户分配" bordered>
          <Descriptions.Item label="客户名称">
            {allotInfo.customerName}
          </Descriptions.Item>
          <Descriptions.Item label="客户状态">
            {allotInfo.customerStatus}
          </Descriptions.Item>
          <Descriptions.Item label="分配前销售">
            {allotInfo.beforeFollowerUser}
          </Descriptions.Item>
          <Descriptions.Item label="分配后销售">
            {allotInfo.afterFollowerUser}
          </Descriptions.Item>
          <Descriptions.Item label="分配原因">
            {allotInfo.distributeReason}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </PageHeaderWrapper>
  )
}

export default CustomerAllotProfile;
