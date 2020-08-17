import React from 'react';
import { Form, Input, Select } from 'antd';
import { formItemLayout, submitFormLayout } from '@/constants';
import SubmitFormBtn from '@/pages/components/SubmitFormBtn';

interface AddOrEditDepartmentProp {
  baseInfo: {[key: string]: any};
  department?: Array<{[key: string]: any}>;
  onSubmit: (values: {[key: string]: any}) => void;
}

const FormItem = Form.Item;
const { Option } = Select;

const AddOrEditDepartment: React.FC<AddOrEditDepartmentProp> = (props) => {

  const { baseInfo = {}, onSubmit, department = [] } = props;
  const [form] = Form.useForm();
  console.log('全部部门信息', department);
  // 提交表单
  const handleFinishForm = (values: {[key: string]: any}) => {
    onSubmit(values);
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
        name="name"
        label="部门名称"
        rules={
          [
            {required: true, message: '部门名称不能为空'}
          ]
        }
      >
        <Input placeholder="输入部门名称"/>
      </FormItem>
      <FormItem 
        label="上级部门"
        name="parentId"
      >
        <Select>
          {/* <Option value="1" key="1">部门1</Option>
          <Option value="2" key="2">部门2</Option>
          <Option value="3" key="3">部门3</Option> */}
          {
            department
              .filter(dep => dep.id !== baseInfo.id)
              .map(dep => (
                <Option value={dep.id} key={dep.id}>{dep.name}</Option>
              ))
          }
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

export default AddOrEditDepartment;
