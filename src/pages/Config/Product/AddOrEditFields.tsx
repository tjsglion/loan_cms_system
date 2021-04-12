import { formItemLayout, submitFormLayout } from '@/constants';
import { Button, Form, Input, message } from 'antd';
import Radio from 'antd/es/radio';
import React, { useEffect } from 'react';
import { BaseFieldsIProps } from './AddOrEditProductExpandFields';
import { fetchAddBaseProduct } from './server';

interface AddOrEditFieldsIProps {
  type?: string;
  info?: Partial<BaseFieldsIProps>;
  onSubmit?: (item: BaseFieldsIProps) => void;
  onCancel?: () => void;
}

const FormItem = Form.Item;

const AddOrEditFields: React.FC<AddOrEditFieldsIProps> = (props) => {

  const {onSubmit, onCancel, info, type = 'add'} = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [info]);

  const handleReset = () => {
    form.resetFields();
    if (onCancel) onCancel();
  }

  const handleSubmit = (val: { id?: number, name: string; dataType: number; }) => {
    if (type === 'edit') {
      // @ts-ignore
      val.id = info?.id
    };
    fetchAddBaseProduct(val, type).then(res => {
      if (res.status === 0) {
        const {data} = res;
        message.success(res.info);
        if (onSubmit) {
          // @ts-ignore
          onSubmit(type === 'edit' ? val : data);
        }
        // window.location.reload();
      } else {
        message.error(res.info);
      }
    })
  }
  return (
    <Form
      name="fieldsForm"
      form={form}
      {...formItemLayout}
      // @ts-ignore
      onFinish={handleSubmit}
      initialValues={info}
    >
      <FormItem
        label="字段名称"
        name="name"
        rules={[{ required: true, message: '字段名称不能为空'}]}
      >
        <Input type="text" placeholder="请输入字段名称"/>
      </FormItem>
      <FormItem
        label="字段类型"
        name="dataType"
        rules={[{ required: true, message: '字段类型不能为空'}]}
        extra="如果需要上传图片选择选择图片"
      >
        <Radio.Group>
          <Radio value={1}>文字</Radio>
          <Radio value={2}>图片</Radio>
        </Radio.Group>
      </FormItem>
      <FormItem {...submitFormLayout} style={{ marginTop: '10px' }}>
        <Button htmlType="submit" type="primary" style={{marginRight: '10px'}}>保存</Button>
        <Button onClick={handleReset}>取消</Button>
      </FormItem>
    </Form>
  );
};

export default AddOrEditFields;