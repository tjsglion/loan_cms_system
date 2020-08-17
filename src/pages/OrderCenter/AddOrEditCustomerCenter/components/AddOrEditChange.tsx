/* eslint-disable prefer-object-spread */
import React, { useEffect, useState } from 'react';
import { Button, Form, Collapse, message } from 'antd';
import { COLLABEL } from '@/constants';
import { connect } from 'umi';
import TableForm from './TableForm';
import { StateType } from '../model';
import { fetchSubmitChange, fetchDeleteChangeById } from './server';

interface AddOrEditChangeProps {
  changeInfo?: {[key: string]: any};
  customerId?: StateType['customerId'];
  companyId?: StateType['companyId'];

}

const FormItem = Form.Item;
const { Panel } = Collapse;

const AddOrEditChange: React.FC<AddOrEditChangeProps> = (props) => {

  const { customerId, companyId, changeInfo = {}} = props;
  const [form] = Form.useForm();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (changeInfo && Object.keys(changeInfo).length > 0) {
      form.resetFields();
      setIsDisabled(true);
    }
  }, [changeInfo])
  
  const columns: Array<{[key: string]: any}> = [
    { label: '序号', span: 2 },
    { label: '变更日期', span: 5},
    { label: '变更项目', span: 5 },
    { label: '变更前', span: 5 },
    { label: '变更后', span: 5 },
    { label: '操作',  span: 2 }
  ];
  const formItems: Array<{[key: string]: any}> = [
    // name: 表单字段名 type: 表单类型 rules: 验证规则  width: 所占宽度，默认自动， options: 下拉时的选择值  addonAfter: 后缀
    { type: 'index', span: 2},
    { name: 'changeTime', rules: [], type: 'datepick', span: 5, options: [], addonAfter: ''},
    { name: 'changeItem', rules: [], type: 'select',span: 5, options: [{key: '股东变更', value: 1}, {key: '地址变更', value: 2}, {key: '经营范围变更', value: 3}]},
    { name: 'beforeChange', rules: [], type: 'input', span: 5, options: [], addonAfter: ''},
    { name: 'afterChange', rules: [], type: 'input', span: 5, options: [], addonAfter: ''},
    { type: 'option', span: 2 }
  ];

  // 保存
  const handleFinish = (values: {[key: string]: any}) => {
    if (!customerId || !companyId) {
      message.info(!customerId ? '请先添加客户信息' : '请先添加企业信息');
      return;
    }
    const $params = values.change.map((val:any) => Object.assign({}, val, {customerId, companyId}));
    fetchSubmitChange($params).then(res => {
      if (res.status === 0) {
        setIsDisabled(true);
      }
    })
  }
  // 编辑
  const handleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDisabled(false);
  }

   // 重置Or取消
   const handleReset = () => {
    form.resetFields();
    if (Object.keys(changeInfo).length > 0) {
      setIsDisabled(true);
    }
  }

   // 删除
   const handleRemove = (id: number, cb: () => void) => {
    fetchDeleteChangeById({id}).then(res => {
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
        header="变更记录" 
        key="1"
        extra={customerId && isDisabled ? <a onClick={handleEdit}>编辑</a> : ''}
      >
        <Form
          name="changeForm"
          form={form}
          labelCol={COLLABEL}
          initialValues={changeInfo}
          onFinish={handleFinish}
        >
          {/* 表单列表 */}
          <TableForm
            disabled={isDisabled}
            form={form}
            fieldName="change"
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

// export default AddOrEditChange;
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
  AddOrEditChange
);