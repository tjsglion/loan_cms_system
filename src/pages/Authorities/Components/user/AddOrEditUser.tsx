import React from 'react';
import { Form, Input, Select, Button, Radio } from 'antd';
import { formItemLayout2, submitFormLayout, OPTIONSPLACEHOLDER, TEXTINFO } from '@/constants';
import SubmitFormBtn from '@/pages/components/SubmitFormBtn';

interface AddOrEditUserProps {
  baseInfo?: {[key: string]: any };
}

const FormItem = Form.Item;
const { Option } = Select;

const AddOrEditUser: React.FC<AddOrEditUserProps> = (props) => {

  const { baseInfo } = props;
  const [form] = Form.useForm();

  // 提交
  const handleFinish = (values: {[key: string]: any}) => {
    console.log(values);
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
        name="name"
        label="姓名"
        rules={
          [
            {required: true, message: '姓名不能为空'}
          ]
        }
      >
        <Input placeholder={TEXTINFO.placeholder}/>
      </FormItem>
      <FormItem
        name="ext1"
        label="昵称"
      >
        <Input placeholder={TEXTINFO.placeholder}/>
      </FormItem>
      <FormItem
        name="password"
        label="用户密码"
        rules={
          [
            {required: true, message: '用户密码不能为空'}
          ]
        }
      >
       <Input type="password" placeholder={TEXTINFO.placeholder}/>
      </FormItem>
      <FormItem
        name="phone"
        label="手机号码"
        rules={
          [
            {required: true, message: '手机号码不能为空'}
          ]
        }
      >
        <Input type="tel" placeholder={TEXTINFO.placeholder}/>
      </FormItem>
      <FormItem
        name="email"
        label="电子邮箱"
        rules={
          [
            {required: true, message: '电子邮箱不能为空'}
          ]
        }
      >
        <Input type="email" placeholder={TEXTINFO.placeholder}/>
      </FormItem>

      <Form.Item label="分配角色" style={{ marginBottom: 0 }}>
        <Form.Item
          name="role"
          rules={[{ required: true, message: '角色不能为空' }]}
          style={{ display: 'inline-block', width: 'calc(80% - 8px)' }}
        >
          <Select 
            mode="multiple"
            placeholder={OPTIONSPLACEHOLDER.placeholder}
            style={{ width: '100%' }}
          >
            <Option key="1" value={1}>1</Option>
          </Select>
        </Form.Item>
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(20% - 8px)', margin: '0 8px' }}
        >
          <Button type="link">添加角色</Button>
        </Form.Item>
      </Form.Item>

      <FormItem label="状态" name="status">
        <Radio.Group>
          <Radio value={1} key="1">正常</Radio>
          <Radio value={2} key="1">停用</Radio>
          <Radio value={3} key="2">删除</Radio>
        </Radio.Group>
      </FormItem>
      

      <FormItem {...submitFormLayout}>
        <SubmitFormBtn 
          onReset={handleResetForm}
        />
      </FormItem>
    </Form>
  )
}

export default AddOrEditUser;
