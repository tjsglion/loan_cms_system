import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Input, Switch } from 'antd';
import { formItemLayout, submitFormLayout } from '@/constants';
import SubmitFormBtn from '@/pages/components/SubmitFormBtn';
import { check } from 'prettier';

interface ProductProps {}

const FormItem = Form.Item;

const Product: React.FC<ProductProps> = () => {

  const [form] = Form.useForm();
  const [hasRequire, setRequire] = useState(true);
  const [hasIntent, setIntent] = useState(true);
  const [hasPotential, setPotential] = useState(true);

  const handleChangeRequire = (checked: boolean) => {
    setRequire(checked);
  }

  const handleChangeIntent = (checked: boolean) => {
    setIntent(checked);
  }

  const handleChangePotential = (checked: boolean) => {
    setPotential(checked);
  }

  const handleResetForm = () => {
    form.resetFields();
  }

  return (
    <PageHeaderWrapper>
      <Form
        style={{ marginTop: '50px' }}
        name="seasForm"
        form={form}
        {...formItemLayout}
      >
        <FormItem
          label="需求客户转入公海时间"
        >
          <FormItem
            name="requireCustomerWaitTime"
            style={{ display: 'inline-block', width: 'calc(80% - 8px)' }}
            rules={[{ required: hasRequire, message: '需求客户转入公海时间不能为空' }]}
          >
            <Input type="number" addonAfter="天" />
          </FormItem>

          <FormItem
            style={{ display: 'inline-block', width: 'calc(20% - 20px)', marginLeft: '20px' }}
          >
            <Switch 
              checkedChildren="开启"
              unCheckedChildren="关闭" 
              checked={hasRequire}
              onChange={handleChangeRequire}
            />
          </FormItem>
        </FormItem>

        <FormItem
          label="意向客户转入公海时间"
        >
          <FormItem
            name="intentCustomerWaitTime"
            style={{ display: 'inline-block', width: 'calc(80% - 8px)' }}
            rules={[{ required: hasIntent, message: '意向客户转入公海时间不能为空' }]}
          >
            <Input type="number" addonAfter="天" />
          </FormItem>

          <FormItem
            style={{ display: 'inline-block', width: 'calc(20% - 20px)', marginLeft: '20px' }}
          >
            <Switch 
              checkedChildren="开启"
              unCheckedChildren="关闭" 
              checked={hasIntent}
              onChange={handleChangeIntent}
            />
          </FormItem>
        </FormItem>

        <FormItem
          label="潜在客户转入公海时间"
        >
          <FormItem
            name="requireCustompotentialCustomerWaitTimeerWaitTime"
            style={{ display: 'inline-block', width: 'calc(80% - 8px)' }}
            rules={[{ required: hasPotential, message: '潜在客户转入公海时间不能为空' }]}
          >
            <Input type="number" addonAfter="天" />
          </FormItem>

          <FormItem
            style={{ display: 'inline-block', width: 'calc(20% - 20px)', marginLeft: '20px' }}
          >
            <Switch 
              checkedChildren="开启"
              unCheckedChildren="关闭" 
              checked={hasPotential}
              onChange={handleChangePotential}
            />
          </FormItem>

          <FormItem {...submitFormLayout}>
            <SubmitFormBtn 
              onReset={handleResetForm}
            />
          </FormItem>
        </FormItem>
      </Form>
    </PageHeaderWrapper>
  )
}

export default Product;