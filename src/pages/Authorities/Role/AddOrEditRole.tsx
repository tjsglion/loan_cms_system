import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Input } from 'antd';
import { TEXTINFO } from '@/constants';
import SubmitFormBtn from '@/pages/components/SubmitFormBtn';
import { queryAllPrivis } from './server';

interface AddOrEditRoleProps {}

const FormItem = Form.Item;

const AddOrEditRole: React.FC<AddOrEditRoleProps> = (props) => {

  const [privList, setPrivList] = useState<Array<{[key: string]: any}>>([]);

  // 获取所有权限
  useEffect(() => {
    queryAllPrivis({}).then(res => {
      console.log('权限列表:', res);
    })
  }, []);
  
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 12 },
  };

  return <PageHeaderWrapper>
    <Card>
      <Form
        {...layout}
      >
        <FormItem
          label="角色名称"
          name="name"
        >
          <Input {...TEXTINFO}/>
        </FormItem>
        <FormItem
          label="权限列表"
          name="name"
        >
          <Input {...TEXTINFO}/>
        </FormItem>
        <FormItem {...tailLayout}>
          <SubmitFormBtn 
            // onReset={handleResetForm}
          />
      </FormItem>
      </Form>
    </Card>
  </PageHeaderWrapper>
}

export default AddOrEditRole;
