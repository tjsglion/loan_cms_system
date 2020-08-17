import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import CustomerInfo from '../components/CustomerInfo';
import CustomerFollowUp from './CustomerFollowUp';

interface AddOrEditCustomerFollowUpProps {
  location: {
    query: {
      customerId: string;
    }
  }
}

const AddOrEditCustomerFollowUp: React.FC<AddOrEditCustomerFollowUpProps> = (props) => {

  const {location: { query }} = props;
  const {customerId} = query;

  return (
    <PageHeaderWrapper>
      {/* 基本信息 */}
      <CustomerInfo 
        customerId={customerId}
      />
      {/* 客户跟进 */}
      <Card title="客户跟进">
        <CustomerFollowUp 
          customerId={customerId}
        />
      </Card>
    </PageHeaderWrapper>
  )
}

export default AddOrEditCustomerFollowUp;
