/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Select, Radio, DatePicker, Button, message, InputNumber } from 'antd';
import { COLLABEL, COLSPAN, RULES, TEXTINFO, OPTIONSPLACEHOLDER, DATEFORMAT } from '@/constants';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { transfNumbToFloat, getDateTimes } from '@/utils/utils';
import { history } from 'umi';
import { fetchFundersList } from '@/pages/Config/Funders/server';
import { fetchProductList } from '@/pages/Config/Product/server';
import { queryAddSignUpBase } from './server';
import { queryDepLists } from '@/pages/Authorities/Role/server';

interface AddOrEditFormProps {
  customerId: string;
  workNo: string;
}

const FormItem = Form.Item;
const { Option } = Select;

const AddOrEditForm: React.FC<AddOrEditFormProps> = (props) => {

  const {customerId, workNo} = props;
  const [form] = Form.useForm();
  const [funds, setFunds] = useState<Array<{[key: string]: any}>>([]);
  const [products, setProducts] = useState<Array<{[key: string]: any}>>([]);
  const [capitalName, setCapitalName] = useState('');
  const [productName, setProductName] = useState('');
  const [departments, setDepartments] = useState<Array<{[key: string]: any}>>([]);
  // const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    const params = {
      pageSize: 1000,
      pageIndex: 1
    };
    // 获取所有资方
    fetchFundersList(params).then(res => {
      if (res) {
        // @ts-ignore
        setFunds(res.data);
      }
    })
    fetchProductList(params).then(res => {
      if (res) {
        // @ts-ignore
        setProducts(res.data);
      }
    })
    // 部门信息
    queryDepLists(params).then((res: {[key: string]: any}) => {
      setDepartments(res.data || []);
    });
  }, []);
  
  // 获取所有产品信息

  const handleSubmitSignForm = (values: {[key: string]: any}) => {
    if (!customerId) {
      message.info('请先添加客户信息')
      return;
    };
    values.loanMoney = transfNumbToFloat(values.loanMoney);
    values.alreadyDepositMoney = transfNumbToFloat(values.alreadyDepositMoney);
    values.loanFee = transfNumbToFloat(values.loanFee);
    values.signUpTime = getDateTimes(values.signUpTime);
    values.capitalId = `${values.capitalId}`;
    values.customerId = customerId;
    values.workNo = workNo;
    values.productName = productName;
    values.capitalName = capitalName;
    // console.log('提交的数据:', values);
    queryAddSignUpBase(values).then(res => {
      // console.log('添加签单信息成功:', res);
      if (res.status === 0) {
        history.push('/order');
      }
      
    })
  }

  // 处理资方选择
  const handleCapital = (_: number, options: {[key: string]: any}) => {
    const {children} = options;
    setCapitalName(children);
  }
  // 处理产品选择
  const handleProduct = (_: number, options: {[key: string]: any}) => {
    const {children} = options;
    setProductName(children);
  }
  return (
    <Form
      name="signForm"
      form={form}
      labelCol={COLLABEL}
      onFinish={handleSubmitSignForm}
    >
      <Row gutter={24}>
        <Col {...COLSPAN}>
          <FormItem label="委托甲方" name="entrustFirstParty">
            <Input {...TEXTINFO}/>
          </FormItem>
        </Col>
        {/* <Col {...COLSPAN}>
          <FormItem label="资方类型" name="capitalType">
            <Select {...OPTIONSPLACEHOLDER}>
              <Option key="0" value={0}>aaa</Option>
              <Option key="1" value={1}>bbb</Option>
            </Select>
          </FormItem>
        </Col> */}
        <Col {...COLSPAN}>
          <FormItem label="资方名称" name="capitalId">
            <Select
              showSearch
              optionFilterProp="children"
              {...OPTIONSPLACEHOLDER}
              onChange={handleCapital}
            >
              {
                funds.map(f => <Option key={f.id} value={f.id}>{f.name}</Option>)
              }
            </Select>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="产品名称" name="productId">
          <Select
            showSearch
            optionFilterProp="children"
            {...OPTIONSPLACEHOLDER}
            onChange={handleProduct}
          >
              {
                products.map(p => <Option key={p.productId} value={p.productId}>{p.name}</Option>)
              }
            </Select>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="进件类型" name="jinjianType">
            <Radio.Group>
              <Radio key="1" value={1}>抵押</Radio>
              <Radio key="2" value={2}>信贷</Radio>
            </Radio.Group>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="贷款金额" name="loanMoney">
            <InputNumber style={{ width: '100%' }} min={0} {...TEXTINFO}/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="已收定金" name="alreadyDepositMoney">
          <InputNumber style={{ width: '100%' }} min={0} {...TEXTINFO}/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="收款方式" name="chequeType">
            <Radio.Group>
              <Radio key="1" value={1}>按比例收取</Radio>
              <Radio key="2" value={2}>按笔数收取</Radio>
            </Radio.Group>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="贷款收费" name="loanFee">
          <InputNumber style={{ width: '100%' }} min={0} {...TEXTINFO}/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="收费说明" name="feeRemark">
            <Input.TextArea {...TEXTINFO}  autoSize={{minRows: 1, maxRows: 2}}/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="签单时间" name="signUpTime">
            <DatePicker style={{ width: '100%' }} locale={locale} format={DATEFORMAT}/>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="评估方式" name="assessType">
            <Radio.Group>
              <Radio key="1" value={1}>按比例</Radio>
              <Radio key="2" value={2}>按笔数</Radio>
            </Radio.Group>
          </FormItem>
        </Col>
        {/* 评估收费 */}
        {/* <Col {...COLSPAN}>
          <FormItem label="评估收费" name="capitalId">
            <Select {...OPTIONSPLACEHOLDER}>
              <Option key="0" value={0}>aaa</Option>
              <Option key="1" value={1}>bbb</Option>
            </Select>
          </FormItem>
        </Col> */}
        <Col {...COLSPAN}>
          <FormItem label="做单部门" name="followDepartId">
            <Select {...OPTIONSPLACEHOLDER}>
            {
              departments.map(p => <Option key={p.id} value={p.id}>{p.name}</Option>)
            }
            </Select>
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="做单人员" name="followUserId">
            <Input {...TEXTINFO} />
          </FormItem>
        </Col>
        <Col {...COLSPAN}>
          <FormItem label="签单须知" name="signUpNeedKnows">
            <Input.TextArea {...TEXTINFO}  autoSize={{minRows: 1, maxRows: 2}}/>
          </FormItem>
        </Col>
        <Col span={24} style={{ textAlign: 'right' }}>
          <FormItem >
            <Button htmlType="submit" type="primary" style={{marginRight: '10px'}}>保存</Button>
            <Button onClick={() => {
              form.resetFields();
              history.push('/customer/manager');
            }}>取消</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
}

export default AddOrEditForm;
