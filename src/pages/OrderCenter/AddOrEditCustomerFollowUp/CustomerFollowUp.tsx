/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Button, DatePicker, Select, message } from 'antd';
import { TEXTINFO, RULES, COLLABEL, DATEFORMAT, OPTIONSPLACEHOLDER, FollowMethod, COLSPAN, RULES1 } from '@/constants';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { fetchProductList } from '@/pages/Config/Product/server';

import { getDateTimes } from '@/utils/utils';
import { history } from 'umi';
import { ProductItem } from '@/pages/Config/Product/data';
import { queryAddFollowLog } from './server';

interface CustomerFollowUpProps {
  customerId: string;
}

const FormItem = Form.Item;
const { Option } = Select;

const CustomerFollowUp: React.FC<CustomerFollowUpProps> = (props) => {

  const {customerId} = props;
  const [form] = Form.useForm();
  const [products, setProducts] = useState<Array<ProductItem>>([]);
  const [productId, setProductId] = useState<string>('');
  const [productName, setProductName] = useState<string>('');

  useEffect(() => {
    // 获取产品列表
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
    });;
  }, []);

  const handleFollowFinish = (values: {[key: string]: any}) => {
    if (!customerId) {
      message.info('请先添加客户信息')
      return;
    };

    values.followTime = getDateTimes(values.followTime);
    values.nextFollowTime = getDateTimes(values.nextFollowTime);
    values.customerId = customerId;
    values.productName = productName;
    
    queryAddFollowLog(values).then(res => {
      if (res.status === 0) {
        message.success(res.info);
        history.push('/customer/followup');
      }
    })
  }

  const handleChange = (value: string, config: {[key: string]: any}) => {
    setProductId(value);
    setProductName(config.children);
  }

  return (
    // <h2>客户跟进</h2>
    <Form
      name="followForm"
      form={form}
      labelCol={COLLABEL}
      onFinish={handleFollowFinish}
    >
      <Row gutter={24}>
        <Col {...COLSPAN}>
          <FormItem label="跟进人名称" name="followUserName" rules={[
            {
              required: true, message: '必填字段'
            }
          ]}>
            <Input {...TEXTINFO}/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="跟进方式" name="followType" rules={[
            {
              required: true, message: '必填字段'
            }
          ]}>
            <Select {...OPTIONSPLACEHOLDER}>
              {
                FollowMethod.map(f => <Option key={f.value} value={f.value}>{f.key}</Option>)
              }
            </Select>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="跟进时间" name="followTime" rules={[
            {
              required: true, message: '必填字段'
            }
          ]}>
            <DatePicker style={{ width: '100%' }} locale={locale} format={DATEFORMAT}/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="下次跟进时间" name="nextFollowTime" rules={[
            {
              required: true, message: '必填字段'
            }
          ]}>
            <DatePicker style={{ width: '100%' }} locale={locale} format={DATEFORMAT}/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="跟进产品" name="productId" rules={[
            {
              required: true, message: '必填字段'
            }
          ]}>
            <Select 
              value={productId}
              showSearch
              optionFilterProp="children"
              onChange={handleChange}
            >
              <Select.Option key="-1" value="">全部</Select.Option>
              {products.map(d => (
                <Select.Option key={d.productId} value={d.productId}>{d.name}</Select.Option>
              ))}
            </Select> 
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="跟进记录详情" name="followDetails">
            <Input.TextArea {...TEXTINFO}/>
          </FormItem>
        </Col>
        <Col span={24} style={{ textAlign: 'right' }}>
          <FormItem >
            <Button htmlType="submit" type="primary" style={{marginRight: '10px'}}>保存</Button>
            <Button onClick={() => form.resetFields()}>取消</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  )
}

export default CustomerFollowUp;
