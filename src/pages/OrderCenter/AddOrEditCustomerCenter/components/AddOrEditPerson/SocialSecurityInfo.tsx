/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { Button, Form, Input, Row, Col, message, Radio } from 'antd';
import { COLLABEL, RULES, TEXTINFO, COLSPAN, YESORNO } from '@/constants';
import { connect } from 'umi';
import { transfNumbToFloat } from '@/utils/utils';
import { fetchSubmitSocialSecurity } from '../server';
import { StateType } from '../../model';

interface SocialSecurityInfoProps {
  type?: string;
  socialInfo?: {[key: string]: any}
  customerId?: StateType['customerId'];
  isDisabled?: boolean;
  setDisabled?: (flag: boolean) => void;
  onSetType?: (val: string) => void;
}

const FormItem = Form.Item;

const SocialSecurityInfo: React.FC<SocialSecurityInfoProps> = (props) => {

  const { customerId, isDisabled, setDisabled, socialInfo = {}, type = 'add', onSetType } = props;
  const [form] = Form.useForm();
  // const [type, setType] = useState('add');
  
  useEffect(() => {
    if (socialInfo && Object.keys(socialInfo).length > 0) {
      form.resetFields();
      setDisabled && setDisabled(true);
    }
  }, [socialInfo])


  // 重置Or取消
  const handleReset = () => {
    form.resetFields();
    if (Object.keys(socialInfo).length > 0) {
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
    values.storageYear = transfNumbToFloat(values.storageYear);
    values.storageMoney = transfNumbToFloat(values.storageMoney);
    values.socialSecurityBase = transfNumbToFloat(values.socialSecurityBase);

    const params = type === 'add' ? {...values, customerId} : ({...values, id: socialInfo.id, customerId});
    fetchSubmitSocialSecurity(params, type).then(res => {
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
      initialValues={socialInfo}
      onFinish={handleSubmitOther}
    >
      <Row gutter={24}>
        <Col {...COLSPAN}>
          <FormItem label="缴存年限" name="storageYear">
            <Input type="number" disabled={isDisabled} {...TEXTINFO} addonAfter="年"/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="共缴金额" name="storageMoney">
            <Input type="number" disabled={isDisabled} style={{ width: '100%' }} min={0}  {...TEXTINFO} addonAfter="元"/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="社保基数" name="socialSecurityBase">
            <Input type="number" disabled={isDisabled} style={{ width: '100%' }} min={0}  {...TEXTINFO} addonAfter="元"/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="是否断缴" name="haveBreakRecord">
            <Radio.Group disabled={isDisabled}>
              {
                YESORNO.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
              }
            </Radio.Group>
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

// export default SocialSecurityInfo;
export default connect(
  ({
    customerCenter
  }: {
    customerCenter: StateType
  }) => ({
    customerId: customerCenter.customerId
  })
)(
  SocialSecurityInfo
);