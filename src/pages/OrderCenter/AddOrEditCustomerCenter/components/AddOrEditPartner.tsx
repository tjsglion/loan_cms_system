/* eslint-disable prefer-object-spread */
import React, { useState, useEffect } from 'react';
import { Form, Collapse, Button, message } from 'antd';
import { COLLABEL } from '@/constants';
import { connect } from 'umi';
import TableForm from './TableForm';
import { StateType } from '../model';
import { fetchSubmitPartner, fetchDeletePartnerById } from './server';

interface AddOrEditPartnerProps {
  partnerInfo?: {[key: string]: any};
  customerId?: StateType['customerId'];
  companyId?: StateType['companyId'];
}

const FormItem = Form.Item;
const { Panel } = Collapse;

const AddOrEditPartner: React.FC<AddOrEditPartnerProps> = (props) => {

  const { customerId, companyId, partnerInfo = {}} = props;
  const [form] = Form.useForm();
  // const [type, setType] = useState('add');
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (partnerInfo && Object.keys(partnerInfo).length > 0) {
      form.resetFields();
      setIsDisabled(true);
    }
  }, [partnerInfo])

  const columns: Array<{[key: string]: any}> = [
    { label: '序号', span: 2 },
    { label: '股东名称', span: 5},
    { label: '股东职位', span: 5 },
    { label: '持股比例', span: 5 },
    { label: '认缴出资额', span: 5 },
    { label: '操作',  span: 2 }
  ];
  const formItems: Array<{[key: string]: any}> = [
    // name: 表单字段名 type: 表单类型 rules: 验证规则  width: 所占宽度，默认自动， options: 下拉时的选择值  addonAfter: 后缀
    { type: 'index', span: 2 },
    { name: 'name', rules: [], type: 'input', span: 5, options: [], addonAfter: ''},
    { name: 'position', rules: [], type: 'select',span: 5, options: [{key: '董事', value: 1}, {key: '监事', value: 2}]},
    { name: 'holdRate', rules: [], type: 'input', inputType: 'number', span: 5, options: [], addonAfter: '%'},
    { name: 'subscriptionMoney', rules: [], type: 'input', inputType: 'number', span: 5, options: [], addonAfter: ''},
    { type: 'option', span: 2 }
  ];

  // 保存
  const handleFinish = (values: any) => {
    if (!customerId || !companyId) {
      message.info(!customerId ? '请先添加客户信息' : '请先添加企业信息');
      return;
    }
    const $params = values.partner.map((val:any) => Object.assign({}, val, {customerId, companyId}));
    fetchSubmitPartner($params).then(res => {
      if (res.status === 0) {
        setIsDisabled(true);
      }
    })
  }
  // 编辑
  const handleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    // setType('edit');
    setIsDisabled(false);
  }

  // 重置Or取消
  const handleReset = () => {
    form.resetFields();
    if (Object.keys(partnerInfo).length > 0) {
      setIsDisabled(true);
    }
  }

  // 删除
  const handleRemove = (id: number, cb: () => void) => {
    fetchDeletePartnerById({id}).then(res => {
      if (res.status === 0) {
        message.success('删除成功');
        cb();
      }
    });
    // cb();
  }

  return (
    <Collapse
      defaultActiveKey={1}
    >
      <Panel 
        header="股东信息" 
        key="1"
        extra={customerId && isDisabled ? <a onClick={handleEdit}>编辑</a> : ''}
      >
        <Form
          name="partnerForm"
          form={form}
          labelCol={COLLABEL}
          onFinish={handleFinish}
          initialValues={partnerInfo}
        >
          {/* 表单列表 */}
          <TableForm
            disabled={isDisabled}
            form={form}
            fieldName="partner"
            columns={columns}
            formItems={formItems}
            onRemove={handleRemove}
          />

        {
          !isDisabled ? (
            <FormItem style={{textAlign: 'right'}}>
              <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>保存</Button>
              <Button onClick={handleReset}>取消</Button>
            </FormItem>
          ) : ''
        }
         
        </Form>
      </Panel>
      
    </Collapse>
  )
}

// export default AddOrEditPartner;
export default connect(
  ({
    customerCenter
  }: {
    customerCenter: StateType
  }) => ({
    customerId: customerCenter.customerId,
    companyId: customerCenter.companyId
  })
)(
  AddOrEditPartner
);
