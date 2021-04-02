import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card} from 'antd';
// import { COLSPAN } from '@/constants';
// import { fetchProductFieldsHasSelect, fetchProductList } from '@/pages/Config/Product/server';
// import { BaseFieldsIProps } from '@/pages/Config/Product/AddOrEditProductExpandFields';
// import { BaseFieldsIProps } from '@/pages/Config/Product/AddOrEditProductExpandFields';
import CustomerInfo from '../components/CustomerInfo';
import AddOrEditForm from './AddOrEditForm';
import ShowProductFields from './ShowProductFields';
// import AddOrEditProductFields from './AddOrEditProductFields';
// import styles from './index.less';

interface AddOrEditCustomerSignProps {
  location: {
    query: {
      customerId: string;
      companyId: string;
      workNo: string;
      productName: string;
    }
  }
}

const AddOrEditCustomerSign: React.FC<AddOrEditCustomerSignProps> = (props) => {

  const {location: { query }} = props;
  const {customerId, workNo} = query;
  // const [priviList, setPriviList] = useState<Array<{[key: string]: any}>>([]);
  

  return (
    <PageHeaderWrapper>
      {/* 基本信息 */}
      <CustomerInfo 
        customerId={customerId}
      />
      
      <ShowProductFields 
        workNo={workNo}
        productName={query.productName}
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
