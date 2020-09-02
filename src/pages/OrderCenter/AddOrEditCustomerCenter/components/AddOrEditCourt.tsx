/* eslint-disable prefer-object-spread */
import React, { useState, useEffect } from 'react';
import { Button, Form, Collapse, message } from 'antd';
import { COLLABEL } from '@/constants';
import TableForm from './TableForm';
import { StateType } from '../model';
import { fetchSubmitCourt, fetchDeleteCourtById } from './server';
import { connect } from 'umi';

interface AddOrEditCourtProps {
  courtInfo?: {[key: string]: any};
  customerId?: StateType['customerId'];
  companyId?: StateType['companyId'];
}

const FormItem = Form.Item;
const { Panel } = Collapse;

const AddOrEditCourt: React.FC<AddOrEditCourtProps> = (props) => {

  const { customerId, companyId, courtInfo = {}} = props;
  const [form] = Form.useForm();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (courtInfo && Object.keys(courtInfo).length > 0) {
      form.resetFields();
      setIsDisabled(true);
    }
  }, [courtInfo]);

  const columns: Array<{[key: string]: any}> = [
    // { label: '序号', span: 2 },
    { label: '日期', span: 3},
    { label: '案由', span: 4 },
    { label: '判决标题', span: 3 },
    { label: '案件身份', span: 3 },
    { label: '案号', span: 3 },
    { label: '法院名称', span: 3 },
    { label: '涉案金额', span: 3 },
    { label: '操作',  span: 2 }
  ];
  const formItems: Array<{[key: string]: any}> = [
    // name: 表单字段名 type: 表单类型 rules: 验证规则  width: 所占宽度，默认自动， options: 下拉时的选择值  addonAfter: 后缀
    // { type: 'index', span: 2},
    { name: 'judgeTime', rules: [], type: 'datepick', span: 3, options: [], addonAfter: ''},
    { name: 'caseReason', rules: [], type: 'input', span: 4, options: [], addonAfter: ''},
    { name: 'title', rules: [], type: 'input', span: 3, options: [], addonAfter: ''},
    { name: 'identity', rules: [], type: 'select',span: 3, options: [{key: '原告', value: 1}, {key: '被告', value: 2}]},
    { name: 'judgeNo', rules: [], type: 'input', span: 3, options: [], addonAfter: ''},
    { name: 'courtName', rules: [], type: 'input', span: 3, options: [], addonAfter: ''},
    { name: 'involveMoney', rules: [], type: 'input', inputType: 'number', span: 3, options: [], addonAfter: ''},
    { type: 'option', span: 2 }
  ];

  // 保存
  const handleFinish = (values: any) => {
    if (!customerId || !companyId) {
      message.info(!customerId ? '请先添加客户信息' : '请先添加企业信息');
      return;
    }
    const $params = values.court.map((val:any) => Object.assign({}, val, {customerId, companyId}));
    fetchSubmitCourt($params).then(res => {
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
    if (Object.keys(courtInfo).length > 0) {
      setIsDisabled(true);
    }
  }
  // 删除
  const handleRemove = (id: number, cb: () => void) => {
    fetchDeleteCourtById({id}).then(res => {
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
        header="法院判决" 
        key="1"
        extra={customerId && isDisabled ? <a onClick={handleEdit}>编辑</a> : ''}
      >
        <Form
          name="courtForm"
          form={form}
          labelCol={COLLABEL}
          initialValues={courtInfo}
          onFinish={handleFinish}
        >
          {/* 表单列表 */}
          <TableForm
            disabled={isDisabled}
            fieldName="court"
            form={form}
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

// export default AddOrEditCourt;
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
  AddOrEditCourt
);
