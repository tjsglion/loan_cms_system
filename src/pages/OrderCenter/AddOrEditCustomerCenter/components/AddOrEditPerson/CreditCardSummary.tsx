/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { Button, Form, Input, Row, Col, message } from 'antd';
import { RULES, TEXTINFO, COLLABEL1, COLSPAN1 } from '@/constants';
import { connect } from 'umi';
import { transfNumbToFloat } from '@/utils/utils';
import { fetchCreditCardSummary } from '../server';
import { StateType } from '../../model';

interface CreditCardSummaryProps {
  type?: string;
  creditCardSummary?: {[key: string]: any}
  customerId?: StateType['customerId'];
  isDisabled?: boolean;
  setDisabled?: (flag: boolean) => void;
  onSetType?: (val: string) => void;
}

const FormItem = Form.Item;

const CreditCardSummary: React.FC<CreditCardSummaryProps> = (props) => {

  const { customerId, isDisabled, setDisabled, creditCardSummary = {}, type = 'add', onSetType } = props;
  const [form] = Form.useForm();
  // const [type, setType] = useState('add');
  
  useEffect(() => {
    if (creditCardSummary && Object.keys(creditCardSummary).length > 0) {
      form.resetFields();
      setDisabled && setDisabled(true);
    }
  }, [creditCardSummary])


  // 重置Or取消
  const handleReset = () => {
    form.resetFields();
    if (Object.keys(creditCardSummary).length > 0) {
      setDisabled && setDisabled(true);
      // setType('edit');
      onSetType && onSetType('edit');
    }
  }

  // 处理保存
  const handleSubmitOther = (values: {[key: string]: any}) => {
    if (!customerId) {
      message.info('请先添加客户信息')
      return;
    };
    // values.registerMoney = transfNumbToFloat(values.registerMoney)
    values.totalCreditAmount = transfNumbToFloat(values.totalCreditAmount);
    values.maxSingleCreditAmount = transfNumbToFloat(values.maxSingleCreditAmount);
    values.minSingleCreditAmount = transfNumbToFloat(values.minSingleCreditAmount);
    values.usedCreditAmount = transfNumbToFloat(values.usedCreditAmount);
    values.averageUsedCreditAmount = transfNumbToFloat(values.averageUsedCreditAmount);
    values.usedRate = transfNumbToFloat(values.usedRate);
    values.cardOrganizationCount = +values.cardOrganizationCount;
    values.accountCount = +values.accountCount;

    const params = type === 'add' ? {...values, customerId} : ({...values, id: creditCardSummary.id, customerId});
    fetchCreditCardSummary(params, type).then(res => {
      const {status, info} = res;
      if (status === 0) {
        message.success(info);
        setDisabled && setDisabled(true);
      }
    });
  } 

  return (
    <Form
      name="creditCardSummaryForm"
      form={form}
      labelCol={COLLABEL1}
      initialValues={creditCardSummary}
      onFinish={handleSubmitOther}
    >
      <Row gutter={24}>
        <Col {...COLSPAN1}>
          <FormItem label="发卡机构数" name="cardOrganizationCount">
            <Input type="number" disabled={isDisabled} {...TEXTINFO}/>
          </FormItem>
        </Col>
        <Col {...COLSPAN1}>
          <FormItem label="账户数" name="accountCount">
            <Input type="number" disabled={isDisabled} style={{ width: '100%' }} min={0}  {...TEXTINFO}/>
          </FormItem>
        </Col>
        <Col {...COLSPAN1}>
          <FormItem label="授信总额" name="totalCreditAmount">
            <Input type="number" disabled={isDisabled} style={{ width: '100%' }} min={0}  {...TEXTINFO} addonAfter="元"/>
          </FormItem>
        </Col>
        <Col {...COLSPAN1}>
          <FormItem label="单卡机构最高授信额" name="maxSingleCreditAmount">
            <Input type="number" disabled={isDisabled} style={{ width: '100%' }} min={0}  {...TEXTINFO} addonAfter="元"/>
          </FormItem>
        </Col>
        <Col {...COLSPAN1}>
          <FormItem label="单卡机构最低授信额"  name="minSingleCreditAmount">
            <Input type="number" disabled={isDisabled} style={{ width: '100%' }} min={0}  {...TEXTINFO} addonAfter="元"/>
          </FormItem>
        </Col>
        <Col {...COLSPAN1}>
          <FormItem label="已用额度" name="usedCreditAmount">
            <Input type="number" disabled={isDisabled} style={{ width: '100%' }} min={0}  {...TEXTINFO} addonAfter="元"/>
          </FormItem>
        </Col>
        <Col {...COLSPAN1}>
          <FormItem label="最近六个月平均使用额度" name="averageUsedCreditAmount">
            <Input type="number" disabled={isDisabled} style={{ width: '100%' }} min={0}  {...TEXTINFO} addonAfter="元"/>
          </FormItem>
        </Col>
        <Col {...COLSPAN1}>
          <FormItem label="使用比例" name="usedRate">
            <Input type="number" disabled={isDisabled} style={{ width: '100%' }} min={0}  {...TEXTINFO} addonAfter="%"/>
          </FormItem>
        </Col>
        {/* <Col {...COLSPAN}>
          <FormItem label="总资产金额" name="totalMoney">
            <InputNumber disabled={isDisabled} style={{ width: '100%' }} min={0}/>
          </FormItem>
        </Col> */}
      </Row>
      {
          !isDisabled ? (
            <FormItem style={{textAlign: 'right'}}>
              <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>保存</Button>
              <Button onClick={handleReset}>取消</Button>
            </FormItem>
          ) : ''
        }
    </Form>
  )
}

// export default CreditCardSummary;
export default connect(
  ({
    customerCenter
  }: {
    customerCenter: StateType
  }) => ({
    customerId: customerCenter.customerId
  })
)(
  CreditCardSummary
);