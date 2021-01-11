import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Col, Row, Select } from 'antd';
import CustomerInfo from '../components/CustomerInfo';
import AddOrEditForm from './AddOrEditForm';
import styles from './index.less';
import { COLSPAN } from '@/constants';
import { fetchProductFields, fetchProductList } from '@/pages/Config/Product/server';
import ShowProductExpandField from './ShowProductExpardField';

interface AddOrEditCustomerSignProps {
  location: {
    query: {
      customerId: string;
      companyId: string;
      workNo: string;
    }
  }
}

const AddOrEditCustomerSign: React.FC<AddOrEditCustomerSignProps> = (props) => {

  const {location: { query }} = props;
  const {customerId, workNo, companyId} = query;
  const [products, setProducts] = useState<Array<{[key: string]: any}>>([]);
  // const [priviList, setPriviList] = useState<Array<{[key: string]: any}>>([]);
  const [productId, setProductId] = useState('-1');


  useEffect(() => {
    fetchProductList({
      pageSize: 1000,
      pageIndex: 1,
    }).then(res => {
      const {data = []} = res;
      if (data.length > 0) {
        // @ts-ignore
        setProducts(data);
      } else {
        setProducts([]);
      }
    });

    // // 获取所有产品扩展字段信息
    // fetchAllProductFields({}).then(res => {
    //   const {data} = res;
    //   if (data) {
    //     const {list} = data;
    //     setPriviList(list);
    //   }
    // })
  }, []);

  const handleChange = (value: string) => {
    setProductId(value);
    if (value === '-1') return;
    // 获取产品对应的扩展字段
    fetchProductFields({
      productId: value
    }).then(res => {
      console.log('获取产品字段:', res);
    });
  }

  return (
    <PageHeaderWrapper>
      {/* 基本信息 */}
      <CustomerInfo 
        customerId={customerId}
      />
      <Card>
        <Row gutter={24}>
          <Col {...COLSPAN} className={styles.d_f}>
            <span className={styles.d_f_1}>产品列表</span>
            <Select 
              className={styles.d_f_2} 
              value={productId}
              showSearch
              optionFilterProp="children"
              onChange={handleChange}
            >
              <Select.Option key="-1" value="-1">全部</Select.Option>
              {products.map(d => (
                <Select.Option key={d.productId} value={d.productId}>{d.name}</Select.Option>
              ))}
            </Select> 
          </Col> 
        </Row>
      </Card>
      {
        productId !== '-1' && 
          <ShowProductExpandField 
            productId={productId}
            customerId={customerId}
            companyId={companyId}
          />
      }
      
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
