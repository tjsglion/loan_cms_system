/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { Button, Form, Input, Row, Col, message, Radio, DatePicker } from 'antd';
import { COLLABEL, RULES, TEXTINFO, COLSPAN, YESORNO } from '@/constants';
import { connect } from 'umi';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { transfNumbToFloat, getDateTimes } from '@/utils/utils';
import { fetchSubmitPunchCard } from '../server';
import { StateType } from '../../model';

interface PunchCardInfoProps {
  type?: string;
  punchInfo?: {[key: string]: any}
  customerId?: StateType['customerId'];
  isDisabled?: boolean;
  setDisabled?: (flag: boolean) => void;
  onSetType?: (val: string) => void;
}

const FormItem = Form.Item;

const PunchCardInfo: React.FC<PunchCardInfoProps> = (props) => {

  const { customerId, isDisabled, setDisabled, punchInfo = {}, type = 'add', onSetType } = props;
  const [form] = Form.useForm();
  // const [type, setType] = useState('add');
  
  useEffect(() => {
    if (punchInfo && Object.keys(punchInfo).length > 0) {
      form.resetFields();
      setDisabled && setDisabled(true);
    }
  }, [punchInfo])


  // 重置Or取消
  const handleReset = () => {
    form.resetFields();
    if (Object.keys(punchInfo).length > 0) {
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
    values.punchMoney = transfNumbToFloat(values.punchMoney);
    values.cashFlow = transfNumbToFloat(values.cashFlow);
    values.punchTime = getDateTimes(values.punchTime);

    const params = type === 'add' ? {...values, customerId} : ({...values, id: punchInfo.id, customerId});
    fetchSubmitPunchCard(params, type).then(res => {
      const {status, info} = res;
      if (status === 0) {
        message.success(info);
        setDisabled && setDisabled(true);
      }
    });
  } 

  return (
    <Form
      name="puncnForm"
      form={form}
      labelCol={COLLABEL}
      initialValues={punchInfo}
      onFinish={handleSubmitOther}
    >
      <Row gutter={24}>
        <Col {...COLSPAN}>
          <FormItem label="打卡时间" name="punchTime" rules={[{required: true, message: '必填字段'}]}>
          <DatePicker disabled={isDisabled} locale={locale} style={{ width: '100%' }} {...TEXTINFO}/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="打卡金额" name="punchMoney" rules={[{required: true, message: '必填字段'}]}>
            <Input type="number" disabled={isDisabled} style={{ width: '100%' }} min={0}  {...TEXTINFO} addonAfter="元/月"/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="现金流" name="cashFlow" rules={[{required: true, message: '必填字段'}]}>
            <Input type="number" disabled={isDisabled} style={{ width: '100%' }} min={0}  {...TEXTINFO} />
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="是否固定打卡" name="fixPunch" rules={[{required: true, message: '必填字段'}]}>
            <Radio.Group disabled={isDisabled}>
              {
                YESORNO.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
              }
            </Radio.Group>
          </FormItem>
        </Col>
        {/* <Col {...COLSPAN}>
          <FormItem label="总资产金额" name="totalMoney" rules={[{required: true, message: '必填字段'}]}>
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

// export default PunchCardInfo;
export default connect(
  ({
    customerCenter
  }: {
    customerCenter: StateType
  }) => ({
    customerId: customerCenter.customerId
  })
)(
  PunchCardInfo
);