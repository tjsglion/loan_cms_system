/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { Button, Collapse, Form, Input, Row, Col, Select, Radio, DatePicker, InputNumber, message } from 'antd';
import { COLLABEL, COLSPAN, TEXTINFO, RULES, YESORNO, DATEFORMAT, YESORNO2, OPTIONSPLACEHOLDER } from '@/constants';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { connect } from 'umi';
import { transfNumbToFloat, getDateTimes } from '@/utils/utils';
import { StateType } from '../model';
import { fetchSubmitJobInfo } from './server';

interface AddOrEditJobProps {
  jobInfo?: {[key: string]: any};
  customerId?: StateType['customerId'];
}

const FormItem = Form.Item;
const { Panel } = Collapse;
const { Option } = Select;

const AddOrEditJob: React.FC<AddOrEditJobProps> = (props) => {

  const { jobInfo = {}, customerId } = props;
  const [form] = Form.useForm();
  const [type, setType] = useState('add');
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (jobInfo && Object.keys(jobInfo).length > 0) {
      form.resetFields();
      setIsDisabled(true);
    }
  }, [jobInfo])

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
    if (Object.keys(jobInfo).length > 0) {
      setIsDisabled(true);
      setType('edit');
    }
  }

  const handleSubmitjobInfo = (values: {[key: string]: any}) => {
    if (!customerId) {
      message.info('请先添加客户信息')
      return;
    };
    values.cashFlow = transfNumbToFloat(values.cashFlow);
    values.shareholderRate = transfNumbToFloat(values.shareholderRate);
    values.companyYearTurnover = transfNumbToFloat(values.companyYearTurnover);
    values.companyMonthTurnover = transfNumbToFloat(values.companyMonthTurnover);
    values.taxMoney = transfNumbToFloat(values.taxMoney);
    values.invoiceMoney = transfNumbToFloat(values.invoiceMoney);
    values.punishMoney = transfNumbToFloat(values.punishMoney);
    values.sidelineMonthIncome = transfNumbToFloat(values.sidelineMonthIncome);
    values.registerTime = getDateTimes(values.registerTime);
    
    const params = type === 'add' ? {...values, customerId} : {...values, id: jobInfo.id, customerId};
    fetchSubmitJobInfo(params, type).then(res => {
      const {status, info} = res;
      if (status === 0) {
        message.success(info);
        setIsDisabled(true);
      }
    })
  }

  return (
    <Collapse
      defaultActiveKey={1}
    >
      <Panel 
        header="职业信息" 
        key="1"
        extra={customerId && isDisabled ? <a onClick={handleEdit}>编辑</a> : ''}
      >
        <Form
          name="baseInfoForm"
          form={form}
          labelCol={COLLABEL}
          initialValues={jobInfo}
          onFinish={handleSubmitjobInfo}
        >
          <Row gutter={24}>
            <Col {...COLSPAN}>
              <FormItem label="公司名称" name="companyName" {...RULES}>
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="公司地址" name="companyAddress" {...RULES}>
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="职业身份" name="jobName" {...RULES}>
                <Select disabled={isDisabled} {...OPTIONSPLACEHOLDER}>
                  <Option key="1" value={1}>经理</Option>
                  <Option key="2" value={2}>销售</Option>
                  <Option key="3" value={3}>老板</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="现金流" name="cashFlow" {...RULES}>
                <InputNumber disabled={isDisabled} style={{ width: '100%' }} min={1} {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="有无执照" name="hasLicense" {...RULES}>
                <Radio.Group disabled={isDisabled}>
                  {
                    YESORNO.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="注册时间" name="registerTime" {...RULES}>
                <DatePicker disabled={isDisabled} style={{ width: '100%' }} locale={locale} format={DATEFORMAT}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="所占股份" name="shareholderRate" {...RULES}>
                <Input disabled={isDisabled} type="number" {...TEXTINFO} addonAfter="%"/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="经营范围" name="businessScope" {...RULES}>
                <Input.TextArea disabled={isDisabled} {...TEXTINFO}  autoSize={{minRows: 1, maxRows: 2}}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="单位下户" name="companyResidence" {...RULES}>
                <Radio.Group disabled={isDisabled}>
                  {
                    YESORNO2.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="年营业额" name="companyYearTurnover" {...RULES}>
                <Input disabled={isDisabled} type="number" {...TEXTINFO} addonAfter="万元/年"/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="月营业额" name="companyMonthTurnover" {...RULES}>
                <Input disabled={isDisabled} type="number" {...TEXTINFO} addonAfter="万元/月"/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="需挂靠单位" name="needDependCompany" {...RULES}>
                <Radio.Group disabled={isDisabled}>
                  {
                    YESORNO.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="单位座机" name="companyPhone" {...RULES}>
                <Radio.Group disabled={isDisabled}>
                  {
                    YESORNO2.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="纳税金额" name="taxMoney" {...RULES}>
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="开票金额" name="invoiceMoney" {...RULES}>
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="行政处罚" name="administrationPunish" {...RULES}>
                <Radio.Group disabled={isDisabled}>
                  {
                    YESORNO2.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="行政处罚金额" name="punishMoney" {...RULES}>
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="移除记录" name="removeRecord" {...RULES}>
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="官司记录" name="disputeRecord" {...RULES}>
                <Radio.Group disabled={isDisabled}>
                  {
                    YESORNO2.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="动产抵押" name="movablesMortgage" {...RULES}>
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="股权抵押" name="shareholderMortgage" {...RULES}>
                <Input disabled={isDisabled}  {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="有无副业" name="hasSideline" {...RULES}>
                <Radio.Group disabled={isDisabled}>
                  {
                    YESORNO2.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="副业收入" name="sidelineMonthIncome" {...RULES}>
                <Input disabled={isDisabled} type="number" {...TEXTINFO} addonAfter="元/月"/>
              </FormItem>
            </Col>
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
          </Row>
        </Form>
      </Panel>
    </Collapse>
  )
}

// export default AddOrEditJob;
export default connect(
  ({
    customerCenter
  }: {
    customerCenter: StateType
  }) => ({
    customerId: customerCenter.customerId
  })
)(
  AddOrEditJob
);