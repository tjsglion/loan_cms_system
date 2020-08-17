import React from 'react';
import { Form, Input } from 'antd';
import { formItemLayout, submitFormLayout } from '@/constants';
import SubmitFormBtn from '@/pages/components/SubmitFormBtn';

interface AddOrEditAdProps {
  isEdit?: boolean;
  baseInfo?: {[key: string]: any };
  onSuccess: () => void;
}

const FormItem = Form.Item;

const AddOrEditAd: React.FC<AddOrEditAdProps> = (props) => {

  const { baseInfo } = props;
  const [form] = Form.useForm();

  // 提交
  const handleFinish = (values: {[key: string]: any}) => {
    console.log(values);
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
        name="title"
        label="公告标题"
        rules={
          [
            {required: true, message: '公告标题不能为空'}
          ]
        }
      >
        <Input placeholder="输入公告标题"/>
      </FormItem>
      <FormItem
        name="content"
        label="公告内容"
        rules={
          [
            {required: true, message: '公告内容不能为空'}
          ]
        }
      >
        <Input.TextArea placeholder="输入公告内容" rows={4}/>
      </FormItem>

      <FormItem {...submitFormLayout}>
        <SubmitFormBtn 
          onReset={handleResetForm}
        />
      </FormItem>
    </Form>
  )
}

export default AddOrEditAd;
