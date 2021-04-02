import { COLLABEL, COLSPAN2 } from '@/constants';
import { BaseFieldsIProps } from '@/pages/Config/Product/AddOrEditProductExpandFields';
import { fetchProductFieldsHasSelect, fetchProductList } from '@/pages/Config/Product/server';
import { Col, Collapse, Form, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import AddOrEditProductFields from '../../AddorEditCustomerSign/AddOrEditProductFields';
import { queryCustomerProductFieldByWorkNo } from '../../AddorEditCustomerSign/server';

interface AddOrEditProductExpandFieldIProps {
  workNo?: string;
  customerId?: string;
  customerName?: string;
}

const { Panel } = Collapse;

const AddOrEditProductExpandField: React.FC<AddOrEditProductExpandFieldIProps> = (props) => {
  const {customerId = '', workNo, customerName} = props;
  const [products, setProducts] = useState<Array<{[key: string]: any}>>([]);
  const [productFields, setProductFields] = useState<Partial<BaseFieldsIProps[]>>([]);
  const [productId, setProductId] = useState('-1');
  const [productName, setProductName] = useState('');
  const [expandFields, setExpandFields] = useState<{[key: string]: any}>({});
  const [disabled, setDisabled] = useState(false);
  const [type, setType] = useState('add');

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
  }, []);

  const handleProductFields = (list: {[key: string]: any}[]) => {
    const obj = {};
    list.forEach(item => {
      obj[item.fieldId] = item.fieldValue
    });
    setExpandFields(obj);
  }
  useEffect(() => {
    if (workNo) {
      queryCustomerProductFieldByWorkNo({workNo}).then(res => {
        if (res.status === 0) {
          if (res.data && res.data.list) {
            setProductId(res.data.list[0].productId);
            setProductFields(res.data.list);
            handleProductFields(res.data.list);
            setDisabled(true);
          }
        }
      });
    }
  }, [workNo]);

  // @ts-ignore
  const handleChange = (value: string, opts) => {
    setProductId(value);
    if (value === '-1') return;
    setProductName(opts.children);
    // 获取产品对应的扩展字段
    fetchProductFieldsHasSelect({
      productId: value
    }).then(res => {
      if (res.data && res.data.list) {
        setProductFields(res.data.list);
      }
    });
  }

  const handleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setDisabled(false);
    setType('edit');
  }
  return (
    <Collapse
      defaultActiveKey={1}
    >
      <Panel 
        header="产品信息" 
        key="1"
        extra={disabled ? <a onClick={handleEdit}>编辑</a> : ''}
      >
        <Row gutter={24}>
          <Col span={4} {...COLSPAN2}>
            <Form.Item labelCol={COLLABEL} label="产品列表">
              <Select
                disabled={disabled}
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
            </Form.Item>    
          </Col> 
        </Row>

        <AddOrEditProductFields
          type={type}
          disabled={disabled}
          fieldsInfo={expandFields}
          productId={productId}
          customerId={customerId}
          productName={productName}
          customerName={customerName}
          workNo={workNo}
          // @ts-ignore
          items={productFields}
          onOk={() => setDisabled(true)}
          onReload={handleProductFields}
        />
      </Panel>
    </Collapse>
  );
}

export default AddOrEditProductExpandField;