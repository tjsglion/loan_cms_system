/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import { formItemLayout2, submitFormLayout, OPTIONSPLACEHOLDER } from '@/constants';
import SubmitFormBtn from '@/pages/components/SubmitFormBtn';
import { queryCustomerLists } from '../server';
import { fetchAddOrEditAllot } from './server';

interface AddOrEditAllotProps {
  isEdit?: boolean;
  baseInfo?: {[key: string]: any };
  onSuccess: () => void;
}

const FormItem = Form.Item;
const { Option } = Select;

const AddOrEditAllot: React.FC<AddOrEditAllotProps> = (props) => {

  const { baseInfo = {}, /* funders = [], */ onSuccess, isEdit = false} = props;
  const [form] = Form.useForm();
  const [customerInfo, setCustomerInfo] = useState<Array<{[key: string]: any}>>([]);
  const [customerName, setCustomerName] = useState('');
  const [beforeUser, setBeforeUser] = useState('');
  const [afterUser, setAfterUser] = useState('');

  useEffect(() => {
    // 查找所有客户
    queryCustomerLists({
      pageSize: 10000,
      pageIndex: 1
    }).then(res => {
      const {data} = res;
      // @ts-ignore
      setCustomerInfo(data || []);
    })
  }, []);

  // 处理客户
  const handleCustomer = (_: number, options: {[key: string]: any}) => {
    const {children} = options;
    setCustomerName(children);
  }
  const handleBeforeUser = (_: number, options: {[key: string]: any}) => {
    const {children} = options;
    setBeforeUser(children);
  }
  const handleAfterUser = (_: number, options: {[key: string]: any}) => {
    const {children} = options;
    setAfterUser(children);
  }
  

  // 提交
  const handleFinish = (values: {[key: string]: any}) => {
    
    values.customerName = customerName;
    values.beforeFollowerUser = beforeUser;
    values.afterFollowerUser = afterUser;
    if (isEdit) {
      values.productId = baseInfo.productId;
    }
    fetchAddOrEditAllot(values, isEdit).then((res) => {
      if (res.status === 0) {
        onSuccess && onSuccess();
      }
    })
    // values.productDesc = values
  }
  // 重围
  const handleResetForm = () => {
    form.resetFields();
  }

  return (
    <Form
      form={form}
      {...formItemLayout2}
      onFinish={handleFinish}
      initialValues={baseInfo}
    >
      <FormItem
        name="customerId"
        label="客户名称"
      >
        {/* <Input placeholder="输入客户名称"/> */}
        <Select
          showSearch
          optionFilterProp="children"
          {...OPTIONSPLACEHOLDER}
          onChange={handleCustomer}
        >
          {
            customerInfo.map((cus: {[key: string]: any}) => <Option key={cus.id} value={cus.customerId}>{cus.customerName}</Option>)
          }
        </Select>
      </FormItem>
      <FormItem
        name="customerStatus"
        label="客户状态"
      >
        <Select>
          <Option key="1" value={1}>激活</Option>
          <Option key="2" value={2}>未激活</Option>
        </Select>
      </FormItem>
      <FormItem
        name="distributeReason"
        label="分配原因"
      >
       <Input type="text" placeholder="请输入"/>
      </FormItem>

      <FormItem
        name="beforeFollowerId"
        label="分配前销售"
      >
        <Select
          showSearch
          optionFilterProp="children"
          {...OPTIONSPLACEHOLDER}
          onChange={handleBeforeUser}
        >
          <Option key="1" value={'1'}>aa</Option>
          <Option key="2" value={'2'}>bbb</Option>
        </Select>
      </FormItem>

      <FormItem
        name="afterFollowerId"
        label="分配后销售"
      >
        <Select
          showSearch
          optionFilterProp="children"
          {...OPTIONSPLACEHOLDER}
          onChange={handleAfterUser}

        >
          <Option key="1" value={'1'}>aaa</Option>
          <Option key="2" value={'2'}>bbb</Option>
        </Select>
      </FormItem>

      <FormItem {...submitFormLayout}>
        <SubmitFormBtn 
          onReset={handleResetForm}
        />
      </FormItem>
      
    </Form>
  )
}

export default AddOrEditAllot;
