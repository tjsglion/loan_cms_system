import React from 'react';
import { Form, Input, Select } from 'antd';
import { formItemLayout, submitFormLayout, OPTIONSPLACEHOLDER, TEXTINFO } from '@/constants';
import SubmitFormBtn from '@/pages/components/SubmitFormBtn';

interface AddOrEditRoleProp {
  baseInfo: {[key: string]: any};
  department: {[key: string]: any};
  onSubmit?: (values: {[key: string]: any}) => void;
}

const FormItem = Form.Item;
const { Option } = Select;

const AddOrEditRole: React.FC<AddOrEditRoleProp> = (props) => {

  const { baseInfo, onSubmit, department = [] } = props;
  const [form] = Form.useForm();

  // 提交表单
  const handleFinishForm = (values: {[key: string]: any}) => {
    onSubmit && onSubmit(values);
  }

  const handleResetForm = () => {
    form.resetFields();
  }
  return (
    <Form
      name="departmentForm"
      onFinish={handleFinishForm}
      form={form}
      {...formItemLayout}
      initialValues={baseInfo}
    >
      <FormItem
        name="pId"
        label="选择部门"
        rules={
          [
            {required: true, message: '部门名称不能为空'}
          ]
        }
      >
        <Select placeholder={OPTIONSPLACEHOLDER.placeholder}>
          {
            department.map((dep: {[key: string]: any}) => (<Option value={dep.id} key={dep.id}>{dep.name}</Option>))
          }  
        </Select>
      </FormItem>
      <FormItem 
        label="角色名称"
        name="name"
      >
        <Input placeholder={TEXTINFO.placeholder} />
      </FormItem>

      <FormItem 
        label="角色类型"
        name="roleType"
      >
        <Input placeholder={TEXTINFO.placeholder} />
      </FormItem>

      <FormItem {...submitFormLayout}>
        <SubmitFormBtn 
          onReset={handleResetForm}
        />
      </FormItem>
    </Form>
  )
}

export default AddOrEditRole;
