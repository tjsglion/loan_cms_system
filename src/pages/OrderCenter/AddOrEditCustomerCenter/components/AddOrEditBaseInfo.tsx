/* eslint-disable no-param-reassign */
import React, {useState, useEffect} from 'react';
import { Button, Form, Input, Row, Col, Select, DatePicker, Collapse, InputNumber, message } from 'antd';
import { COLSPAN, COLLABEL, RULES, OPTIONSPLACEHOLDER, TEXTINFO } from '@/constants';
import { connect } from 'umi';
import { transfNumbToFloat } from '@/utils/utils';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { StateType } from '../model';
import { fetchSubmitBaseInfo } from './server';

interface AddOrEditBaseInfoProps {
  baseInfoForm?: {[key: string]: any};
  // @ts-ignore
  // dispatch?: Dispatch<any>
  customerId?: StateType['customerId'];
}

const FormItem = Form.Item;
const { Option } = Select;
const { Panel } = Collapse;

const AddOrEditBaseInfo: React.FC<AddOrEditBaseInfoProps> = (props) => {

  const { customerId, baseInfoForm = {}} = props;
  const [form] = Form.useForm();
  const [type, setType] = useState('add');
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (baseInfoForm && Object.keys(baseInfoForm).length > 0) {
      form.resetFields();
      setIsDisabled(true);
    }
  }, [baseInfoForm])
  
  // 编辑
  const handleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setType('edit');
    setIsDisabled(false);
  }

  // 处理保存
  const handleSubmitBaseInfo = (values: {[key: string]: any}) => {
    if (!customerId) {
      message.info('请先添加客户信息')
      return;
    };
    values.expectGetMoneyTime = new Date(values.expectGetMoneyTime).getTime();
    values.expectLoanMoney = transfNumbToFloat(values.expectLoanMoney);
    const params = type === 'add' ? {...values, customerId} : ({...values, id: baseInfoForm.id});
    fetchSubmitBaseInfo(params, type).then(res => {
      const {status, info} = res;
      setIsDisabled(false);
      if (status === 0) {
        message.success(info);
      }
    })
  } 

  // 重置Or取消
  const handleReset = () => {
    form.resetFields();
    if (Object.keys(baseInfoForm).length > 0) {
      setIsDisabled(true);
      setType('edit');
    }
  }

  return (
    <Collapse
      defaultActiveKey={1}
    >

      <Panel 
        header="做单预约" 
        key="1"
        extra={customerId && isDisabled ? <a onClick={handleEdit}>编辑</a> : ''}
      >
        <Form
          name="baseInfoForm"
          form={form}
          labelCol={COLLABEL}
          initialValues={baseInfoForm}
          onFinish={handleSubmitBaseInfo}
        >
          <Row gutter={24}>
            <Col {...COLSPAN}>
              <FormItem label="预约贷款额度" name="expectLoanMoney">
                <InputNumber disabled={isDisabled} min={1} style={{ width: '100%' }} {...TEXTINFO} />
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="期望到账时间" name="expectGetMoneyTime">
                <DatePicker disabled={isDisabled} locale={locale} style={{ width: '100%' }} {...TEXTINFO}/>
              </FormItem>
            </Col>
            
            <Col {...COLSPAN}>
              <FormItem label="配偶知晓贷款" name="havePartnerKnown">
                <Select disabled={isDisabled} {...OPTIONSPLACEHOLDER}>
                  <Option key="1" value={1}>是</Option>
                  <Option key="0" value={0}>否</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="家属知晓贷款" name="haveFamilyKnown">
                <Select disabled={isDisabled} {...OPTIONSPLACEHOLDER}>
                  <Option key="1" value={1}>是</Option>
                  <Option key="0" value={0}>否</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="贷款方式" name="loanType">
                <Select disabled={isDisabled} {...OPTIONSPLACEHOLDER}>
                  <Option key="1" value={1}>个人贷款</Option>
                  <Option key="2" value={2}>企业贷款</Option>
                </Select>
              </FormItem>
            </Col>

            <Col {...COLSPAN}>
              <FormItem label="放款银行" name="bankName">
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col>

            <Col {...COLSPAN}>
              <FormItem label="银行卡号" name="bankNo">
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col>

            <Col {...COLSPAN}>
              <FormItem label="客户类型" name="customerType">
                <Select disabled={isDisabled} {...OPTIONSPLACEHOLDER}>
                  <Option key="1" value={1}>潜在客户</Option>
                  <Option key="2" value={2}>单身客户</Option>
                </Select>
              </FormItem>
            </Col>

            <Col {...COLSPAN}>
              <FormItem label="做单状态" name="status">
                <Select disabled={isDisabled} {...OPTIONSPLACEHOLDER}>
                  <Option key="1" value={1}>跟进中</Option>
                  <Option key="2" value={2}>已面签</Option>
                  <Option key="3" value={3}>已放款</Option>
                </Select>
              </FormItem>
            </Col>
           
            <Col span={24} style={{ textAlign: 'right' }}>
              {
                !isDisabled
                  ? (
                    <FormItem >
                      <Button htmlType="submit" type="primary" style={{marginRight: '10px'}}>保存</Button>
                      <Button onClick={handleReset}>取消</Button>
                    </FormItem>
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

// export default AddOrEditBaseInfo;
export default connect(
  ({
    customerCenter
  }: {
    customerCenter: StateType
  }) => ({
    customerId: customerCenter.customerId
  })
)(
  AddOrEditBaseInfo
);
