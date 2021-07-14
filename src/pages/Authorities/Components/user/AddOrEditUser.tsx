/* eslint-disable prefer-object-spread */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import React from 'react';
import { Form, Input, Select, Button, Radio, message } from 'antd';
import { history } from 'umi';
import { formItemLayout2, submitFormLayout, OPTIONSPLACEHOLDER, TEXTINFO } from '@/constants';
import SubmitFormBtn from '@/pages/components/SubmitFormBtn';
import { queryAddAccount } from './server';
// import { getLocalUser } from '@/utils/utils';
// import { queryDepLists } from '../../Department/server';

interface AddOrEditUserProps {
  baseInfo?: {[key: string]: any };
  roles?: Array<{[key: string]: any}>;
  deps?: Array<{[key: string]: any}>;
  onFinish?: () => void;
}

const FormItem = Form.Item;
const { Option } = Select;

const AddOrEditUser: React.FC<AddOrEditUserProps> = (props) => {

  const { baseInfo = {}, roles = [], deps = [], onFinish } = props;
  const [form] = Form.useForm();

  // 提交
  const handleFinish = (values: {[key: string]: any}) => {
    const {id} = baseInfo;
    // values.createdBy = createdBy;
    const type = id ? 'edit' : 'add';
    const params = type === 'add' ? values : Object.assign({...values}, {id});
    queryAddAccount(params, type).then(res => {
      // console.log('添加账号成功:', res);
      if (res.status === 0) {
        message.success(res.info);
        onFinish && onFinish();
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
      {...formItemLayout2}
      onFinish={handleFinish}
      initialValues={baseInfo}
    >
      <FormItem
        name="operAccount"
        label="账号"
      >
        <Input disabled={baseInfo.id} placeholder={TEXTINFO.placeholder}/>
      </FormItem>

      <Form.Item
        name="departmentId"
        label="部门"
      >
        <Select 
          // mode="multiple"
          placeholder={OPTIONSPLACEHOLDER.placeholder}
          style={{ width: '100%' }}
        >
          {
            deps.map(role => <Option key={role.id} value={role.id}>{role.name}</Option>)
          }
        </Select>
      </Form.Item>

      <FormItem
        name="name"
        label="姓名"
      >
        <Input placeholder={TEXTINFO.placeholder}/>
      </FormItem>
      
      <FormItem
        name="phone"
        label="手机号码"
      >
        <Input type="tel" placeholder={TEXTINFO.placeholder}/>
      </FormItem>
      <FormItem
        name="email"
        label="电子邮箱"
      >
        <Input type="email" placeholder={TEXTINFO.placeholder}/>
      </FormItem>

      <Form.Item label="分配角色" style={{ marginBottom: 0 }}>
        <Form.Item
          name="role"
          style={{ display: 'inline-block', width: 'calc(80% - 8px)' }}
        >
          <Select 
            placeholder={OPTIONSPLACEHOLDER.placeholder}
            style={{ width: '100%' }}
          >
            {
              roles.map(role => <Option key={role.id} value={`${role.id}`}>{role.name}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(20% - 8px)', margin: '0 8px' }}
        >
          <Button type="link" onClick={() => history.push('/account/role')}>添加角色</Button>
        </Form.Item>
      </Form.Item>

      <FormItem 
        label="状态"
        name="status"
      >
        <Radio.Group>
          <Radio value={1} key="1">正常</Radio>
          <Radio value={2} key="2">停用</Radio>
          <Radio value={3} key="3">删除</Radio>
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
