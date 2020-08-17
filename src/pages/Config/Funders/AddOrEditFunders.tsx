/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import React from 'react';
import { Form, Input } from 'antd';
import { formItemLayout, submitFormLayout } from '@/constants';
import SubmitFormBtn from '@/pages/components/SubmitFormBtn';
import { fetchAddOrEditFunders } from './server';

interface AddOrEditFundersProps {
  isEdit?: boolean;
  baseInfo?: {[key: string]: any };
  onSuccess: () => void;
}

const FormItem = Form.Item;

const AddOrEditFunders: React.FC<AddOrEditFundersProps> = (props) => {

  const { baseInfo = {}, isEdit = false, onSuccess } = props;
  const [form] = Form.useForm();

  // 提交
  const handleFinish = (values: {[key: string]: any}) => {
    if (isEdit) {
      values.capitalId = baseInfo.capitalId;
    }
    fetchAddOrEditFunders(values, isEdit).then(res => {
      if (res.status === 0) {
        onSuccess && onSuccess();
      }
    });
  }
  // 重围
  const handleResetForm = () => {
    form.resetFields();
  }

  return (
    <Form
      form={form}
      {...formItemLayout}
      onFinish={handleFinish}
      initialValues={baseInfo}
    >
      <FormItem
        name="name"
        label="出资方名称"
        rules={
          [
            {required: true, message: '出资方名称不能为空'}
          ]
        }
      >
        <Input placeholder="输入出资方名称"/>
      </FormItem>
      <FormItem
        name="remarkInfo"
        label="备注"
      >
        <Input.TextArea placeholder="输入出备注" rows={4}/>
      </FormItem>

      <FormItem {...submitFormLayout}>
        <SubmitFormBtn 
          onReset={handleResetForm}
        />
      </FormItem>
    </Form>
  )
}

export default AddOrEditFunders;
