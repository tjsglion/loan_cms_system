/* eslint-disable no-param-reassign */
import React from 'react';
import { Form, Input, Row, Col, Button, DatePicker, Select, message } from 'antd';
import { COLSPAN, TEXTINFO, RULES, COLLABEL, DATEFORMAT, OPTIONSPLACEHOLDER, FollowMethod } from '@/constants';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { getDateTimes } from '@/utils/utils';
import { history } from 'umi';
import { queryAddFollowLog } from './server';

interface CustomerFollowUpProps {
  customerId: string;
}

const FormItem = Form.Item;
const { Option } = Select;

const CustomerFollowUp: React.FC<CustomerFollowUpProps> = (props) => {

  const {customerId} = props;
  const [form] = Form.useForm();

  const handleFollowFinish = (values: {[key: string]: any}) => {
    if (!customerId) {
      message.info('请先添加客户信息')
      return;
    };

    values.followTime = getDateTimes(values.followTime);
    values.nextFollowTime = getDateTimes(values.nextFollowTime);
    values.customerId = customerId;
    
    queryAddFollowLog(values).then(res => {
      if (res.status === 0) {
        message.success(res.info);
        history.push('/order');
      }
    })
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
          <FormItem label="跟进人名称" name="followUserName" {...RULES}>
            <Input {...TEXTINFO}/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="跟进方式" name="followType" {...RULES}>
            <Select {...OPTIONSPLACEHOLDER}>
              {
                FollowMethod.map(f => <Option key={f.value} value={f.value}>{f.key}</Option>)
              }
            </Select>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="跟进时间" name="followTime" {...RULES}>
            <DatePicker style={{ width: '100%' }} locale={locale} format={DATEFORMAT}/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="下次跟进时间" name="nextFollowTime">
            <DatePicker style={{ width: '100%' }} locale={locale} format={DATEFORMAT}/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="跟进记录详情" name="followDetails" {...RULES}>
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
