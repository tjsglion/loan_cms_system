/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { Button, Collapse, Form, Input, Row, Col, DatePicker, InputNumber, message } from 'antd';
import { COLLABEL, RULES, TEXTINFO, COLSPAN, DATEFORMAT } from '@/constants';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { connect, Dispatch } from 'umi';
import { transfNumbToFloat } from '@/utils/utils';
import { fetchSubmitCompany } from './server';
import { StateType } from '../model';

interface AddOrEditCompanyProps {
  companyInfo?: {[key: string]: any}
  customerId?: StateType['customerId'];
  // @ts-ignore
  dispatch: Dispatch<any>;
}

const FormItem = Form.Item;
const { Panel } = Collapse;

const AddOrEditCompany: React.FC<AddOrEditCompanyProps> = (props) => {

  const { companyInfo = {}, customerId, dispatch } = props;
  const [form] = Form.useForm();
  const [type, setType] = useState('add');
  const [isDisabled, setIsDisabled] = useState(false);
  // const [companyInfo, setCompanyInfo] = useState({});
  
  useEffect(() => {
    if (companyInfo && Object.keys(companyInfo).length > 0) {
      form.resetFields();
      setIsDisabled(true);
    }
  }, [companyInfo])

  // 编辑
  const handleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setType('edit');
    setIsDisabled(false);
  }

  // 重置Or取消
  const handleReset = () => {
    form.resetFields();
    if (Object.keys(companyInfo).length > 0) {
      setIsDisabled(true);
      setType('edit');
    }
  }

  // 处理保存
  const handleSubmitBaseInfo = (values: {[key: string]: any}) => {
    if (!customerId) {
      message.info('请先添加客户信息')
      return;
    };
    values.registerTime = new Date(values.registerTime).getTime();
    values.registerMoney = transfNumbToFloat(values.registerMoney)
    const params = type === 'add' ? {...values, customerId} : ({...values, id: companyInfo.id});
    fetchSubmitCompany(params, type).then(res => {
      const {status, info, data} = res;
      if (status === 0) {
        message.success(info);
        // 保存企业id号
        const {id} = data;
        dispatch({
          type: 'customerCenter/addCompanyId',
          payload: {
            companyId: id
          }
        });
      }
    });
  } 

  return (
    <Collapse
      defaultActiveKey={1}
    >
      <Panel 
        header="企业信息" 
        key="1"
        extra={customerId && isDisabled ? <a onClick={handleEdit}>编辑</a> : ''}
      >
        <Form
          name="companyForm"
          form={form}
          labelCol={COLLABEL}
          initialValues={companyInfo}
          onFinish={handleSubmitBaseInfo}
        >
          <Row gutter={24}>
            <Col {...COLSPAN}>
              <FormItem label="企业名称" name="name" {...RULES}>
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col>
            {/* <Col {...COLSPAN}>
              <FormItem label="地区" name="b" {...RULES}>
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col> */}
            <Col {...COLSPAN}>
              <FormItem label="法定代表人" name="legalPerson" {...RULES}>
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col>
            {/* <Col {...COLSPAN}>
              <FormItem label="统一社会信用代码" name="d" {...RULES}>
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col> */}
            <Col {...COLSPAN}>
              <FormItem label="注册资本" name="registerMoney" {...RULES}>
                <InputNumber disabled={isDisabled} step={0.1} style={{width:'100%'}} min={1} {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="成立时间" name="registerTime" {...RULES}>
                <DatePicker disabled={isDisabled} style={{ width: '100%' }} locale={locale} format={DATEFORMAT}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="所需行业" name="industry" {...RULES}>
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="登记机关" name="registerOffice" {...RULES}>
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="企业地址" name="address" {...RULES}>
                <Input disabled={isDisabled} {...TEXTINFO} />
              </FormItem>
            </Col>
            
            <Col span={24} style={{ textAlign: 'right' }}>
              {
                !isDisabled
                  ? (
                    <Col span={24} style={{ textAlign: 'right' }}>
                      <FormItem >
                        <Button htmlType="submit" type="primary" style={{marginRight: '10px'}}>保存</Button>
                        <Button onClick={handleReset}>取消</Button>
                      </FormItem>
                    </Col>
                  )
                  : ''
              }
            </Col>
          </Row>
        </Form> 
      </Panel>
    </Collapse>
  )
}

// export default AddOrEditCompany;
export default connect(
  ({
    customerCenter
  }: {
    customerCenter: StateType
  }) => ({
    customerId: customerCenter.customerId
  })
)(
  AddOrEditCompany
);