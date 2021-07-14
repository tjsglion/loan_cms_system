/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { Button, Form, Input, Row, Col, message, Radio, InputNumber } from 'antd';
import { COLLABEL, RULES, TEXTINFO, COLSPAN, YESORNO } from '@/constants';
import { connect } from 'umi';
import { transfNumbToFloat } from '@/utils/utils';
import { fetchSubmitCreditForOthers } from '../server';
import { StateType } from '../../model';

interface AddOrEditOtherProps {
  type?: string;
  otherInfo?: {[key: string]: any}
  customerId?: StateType['customerId'];
  isDisabled?: boolean;
  setDisabled?: (flag: boolean) => void;
  onSetType?: (val: string) => void;
}

const FormItem = Form.Item;

const AddOrEditOther: React.FC<AddOrEditOtherProps> = (props) => {

  const { customerId, isDisabled, setDisabled, otherInfo = {}, type = 'add', onSetType } = props;
  const [form] = Form.useForm();
  // const [type, setType] = useState('add');
  
  useEffect(() => {
    if (otherInfo && Object.keys(otherInfo).length > 0) {
      form.resetFields();
      setDisabled && setDisabled(true);
    }
  }, [otherInfo])


  // 重置Or取消
  const handleReset = () => {
    form.resetFields();
    if (Object.keys(otherInfo).length > 0) {
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
    values.currentOverdueAmount = transfNumbToFloat(values.currentOverdueAmount);
    values.totalMoney = transfNumbToFloat(values.totalMoney);

    const params = type === 'add' ? {...values, customerId} : ({...values, id: otherInfo.id, customerId});
    fetchSubmitCreditForOthers(params, type).then(res => {
      const {status, info} = res;
      if (status === 0) {
        message.success(info);
        setDisabled && setDisabled(true);
      }
    });
  } 

  return (
    <Form
      name="courtForm"
      form={form}
      labelCol={COLLABEL}
      initialValues={otherInfo}
      onFinish={handleSubmitOther}
    >
      <Row gutter={24}>
        <Col {...COLSPAN}>
          <FormItem label="提供贷后材料" name="postLoanMaterials">
            <Radio.Group disabled={isDisabled}>
              {
                YESORNO.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
              }
            </Radio.Group>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="征信查询次数" name="creditInvestigationQueryCount">
            <InputNumber disabled={isDisabled} style={{ width: '100%' }} min={0}/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="近3个月网贷次数" name="currentLoanCount">
            <InputNumber disabled={isDisabled} style={{ width: '100%' }} min={0}/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="是否当前逾期" name="haveCurrentOverdue">
            <Radio.Group disabled={isDisabled}>
              {
                YESORNO.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
              }
            </Radio.Group>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="当前逾期金额" name="currentOverdueAmount">
            <InputNumber disabled={isDisabled} style={{ width: '100%' }} min={0}/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="逾期情况" name="overdueInfo">
            <Input disabled={isDisabled} {...TEXTINFO} />
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="总资产金额" name="totalMoney">
            <InputNumber disabled={isDisabled} style={{ width: '100%' }} min={0}/>
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

// export default AddOrEditOther;
export default connect(
  ({
    customerCenter
  }: {
    customerCenter: StateType
  }) => ({
    customerId: customerCenter.customerId
  })
)(
  AddOrEditOther
);