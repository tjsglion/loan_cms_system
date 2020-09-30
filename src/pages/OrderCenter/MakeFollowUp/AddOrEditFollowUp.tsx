/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-object-spread */
import React, { useState, useEffect } from 'react';
// import { history } from 'umi';
import { Form, Input, Select, Button, DatePicker, InputNumber, Spin, message } from 'antd';
import { RULES, TEXTINFO, formItemLayout, OPTIONSPLACEHOLDER, submitFormLayout, DATEFORMAT } from '@/constants';
import locale from 'antd/es/date-picker/locale/zh_CN';
import _ from 'lodash';
import moment from 'moment';
import { transfNumbToFloat } from '@/utils/utils';
import { fetchProductList, fetchProductById } from '@/pages/Config/Product/server';
import { queryAddOrEditFollupUp } from './server';
import { queryCustomerLists, queryCustomerLoanExpectById, queryCustomerById } from '../server';


interface AddOrEditFollowUpProps {
  baseInfo?: {[key: string]: any };
  onFinish?: () => void;
  onClose?: () => void;
  id?: number | string;
}

const FormItem = Form.Item;
const { Option } = Select;

const AddOrEditFollowUp: React.FC<AddOrEditFollowUpProps> = (props) => {

  const { onFinish, id, onClose} = props;
  const [form] = Form.useForm();
  const [isDisabled] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [users, setUsers] = useState<Array<{[key: string]: any}>>([]);
  const [products, setProducts] = useState<Array<{[key: string]: any}>>([])
  const [formValue, setFormValues] = useState<{[key: string]: any}>({});

  const handleReset = () => {
    form.resetFields();
  }

  useEffect(() => {
    if (id) {
      // 获取做单信息
      queryCustomerLoanExpectById({id}).then(res => {
        if (res.status === 0) {
          const {data} = res;
          data.expectGetMoneyTime = moment(data.expectGetMoneyTime, DATEFORMAT)
          data.loanType = +data.loanType;
          // data.productId = data.productId;
          setFormValues(data);
          const {customerId, productId} = data
          // 获取产品信息
          // 获取客户信息
          if (productId && customerId) {
            Promise.all([fetchProductById({productId}), queryCustomerById({customerId})]).then(res => {
              const [prod, cust] = res;
              if (prod.data) {
                setProducts([prod.data]);
              }
              if (cust.data) {
                setUsers([cust.data]);
              }
            })
          }
          handleReset();
        }
      })
    }
  }, [id]);




  // 提交
  const handleFinish = (values: {[key: string]: any}) => {

    // const {id} = baseInfo;
    const type = id ? 'edit' : 'add';
    const params = type === 'add' ? values : Object.assign({...values}, {id});

    params.expectGetMoneyTime = new Date(values.expectGetMoneyTime).getTime();
    params.expectLoanMoney = transfNumbToFloat(values.expectLoanMoney);
    
    queryAddOrEditFollupUp(params, type).then(res => {
      // console.log('添加做单成功:', res);
      if (res.status === 0) {
        onFinish && onFinish();
      }
    })
  }

  // 搜索用户信息
  const searchUser = _.debounce((value) => {
    if (!value) return;
    setFetching(true);
    queryCustomerLists(
      {
        name: value,
        pageSize: 10,
        pageIndex: 1
      }
    ).then(res => {
      setFetching(false);
      const {data = []} = res;
      if (data.length > 0) {
        setUsers(data);
      } else {
        setUsers([]);
      }
    });
  }, 500);

  // 搜索产品信息
  const searchProduct = _.debounce((value) => {
    if (!value) return;
    setFetching(true);
    fetchProductList({
      pageSize: 10,
      pageIndex: 1,
      name: value
    }).then(res => {
      setFetching(false);
      const {data = []} = res;
      if (data.length > 0) {
        setProducts(data);
      } else {
        setProducts([]);
        message.info('当前产品不存在, 请先添加产品信息')
      }
    })
  }, 500)
  return (
    <Form
      form={form}
      {...formItemLayout}
      onFinish={handleFinish}
      initialValues={formValue}
    >
      <FormItem label="客户信息" name="customerId" {...RULES}>
        {/* <InputNumber disabled={isDisabled} min={1} style={{ width: '100%' }} {...TEXTINFO} /> */}
        <Select
          showSearch
          placeholder="请输入搜索客户关键字"
          notFoundContent={fetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={searchUser}
          // onChange={handleUserChange}
          style={{ width: '100%' }}
        >
          {users.map(d => (
            <Option key={d.customerId} value={d.customerId}>{d.name}</Option>
          ))}
        </Select>
      </FormItem>
      <FormItem label="贷款产品" name="productId" {...RULES}>
        {/* <InputNumber disabled={isDisabled} min={1} style={{ width: '100%' }} {...TEXTINFO} /> */}
        <Select
          showSearch
          placeholder="请输入贷款产品关键字"
          notFoundContent={fetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={searchProduct}
          // onChange={handleUserChange}
          style={{ width: '100%' }}
        >
          {products.map(d => (
            <Option key={d.productId} value={d.productId}>{d.name}</Option>
          ))}
        </Select>
      </FormItem>
      <FormItem label="预约贷款额度" name="expectLoanMoney" {...RULES}>
        <InputNumber disabled={isDisabled} min={1} style={{ width: '100%' }} {...TEXTINFO} />
      </FormItem>

      <FormItem label="期望到账时间" name="expectGetMoneyTime" {...RULES}>
        <DatePicker disabled={isDisabled} locale={locale} style={{ width: '100%' }} {...TEXTINFO}/>
      </FormItem>

      <FormItem label="配偶知晓贷款" name="havePartnerKnown" {...RULES}>
        <Select disabled={isDisabled} {...OPTIONSPLACEHOLDER}>
          <Option key="1" value={1}>是</Option>
          <Option key="0" value={0}>否</Option>
        </Select>
      </FormItem>

      <FormItem label="家属知晓贷款" name="haveFamilyKnown" {...RULES}>
        <Select disabled={isDisabled} {...OPTIONSPLACEHOLDER}>
          <Option key="1" value={1}>是</Option>
          <Option key="0" value={0}>否</Option>
        </Select>
      </FormItem>

      <FormItem label="贷款方式" name="loanType" {...RULES}>
        <Select disabled={isDisabled} {...OPTIONSPLACEHOLDER}>
          <Option key="1" value={1}>个人贷款</Option>
          <Option key="2" value={2}>企业贷款</Option>
        </Select>
      </FormItem>

      <FormItem label="放款银行" name="bankName" {...RULES}>
        <Input disabled={isDisabled} {...TEXTINFO}/>
      </FormItem>

      <FormItem label="银行卡号" name="bankNo" {...RULES}>
        <Input disabled={isDisabled} {...TEXTINFO}/>
      </FormItem>

      <FormItem label="客户类型" name="customerType" {...RULES}>
        <Select disabled={isDisabled} {...OPTIONSPLACEHOLDER}>
          <Option key="1" value={1}>潜在客户</Option>
          <Option key="2" value={2}>单身客户</Option>
        </Select>
      </FormItem>

      <FormItem label="做单状态" name="status" {...RULES}>
        <Select disabled={isDisabled} {...OPTIONSPLACEHOLDER}>
          <Option key="1" value={1}>跟进中</Option>
          <Option key="2" value={2}>已面签</Option>
          <Option key="3" value={3}>已放款</Option>
        </Select>
      </FormItem>

      <FormItem label="被拒原因" name="rejectReason">
        <Input  {...TEXTINFO}/>
      </FormItem>

      <FormItem {...submitFormLayout}>
        <Button htmlType="submit" type="primary" style={{marginRight: '10px'}}>保存</Button>
        <Button onClick={
          !id ? handleReset : () => onClose && onClose()}>
          { !id ? '重置' : '取消' }
        </Button>
      </FormItem>
    </Form>
  );
}

export default AddOrEditFollowUp;
