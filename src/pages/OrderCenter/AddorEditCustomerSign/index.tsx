import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import CustomerInfo from '../components/CustomerInfo';
import AddOrEditForm from './AddOrEditForm';

interface AddOrEditCustomerSignProps {
  location: {
    query: {
      customerId: string;
      workNo: string;
    }
  }
}

const AddOrEditCustomerSign: React.FC<AddOrEditCustomerSignProps> = (props) => {

  const {location: { query }} = props;
  const {customerId, workNo} = query;

  return (
    <PageHeaderWrapper>
      {/* 基本信息 */}
      <CustomerInfo 
        customerId={customerId}
      />
      <Card>
        <AddOrEditForm 
          customerId={customerId}
          workNo={workNo}
        />
      </Card>
    </PageHeaderWrapper>
  )
}

export default AddOrEditCustomerSign;
