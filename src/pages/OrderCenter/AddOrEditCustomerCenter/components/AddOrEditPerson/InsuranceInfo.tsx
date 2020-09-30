/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-object-spread */
import React, { useEffect } from 'react';
import { Form, Button, message } from 'antd';
import { COLLABEL } from '@/constants';
import { connect } from 'umi';
import TableForm from '../TableForm';
import { StateType } from '../../model';
import { fetchDeleteInsuranceById, fetchSubmitInsurance } from '../server';
import { PayType, InsuranceType } from '../../../../../constants/index';

interface InsuranceInfoProps {
  insuranceInfo?: {[key: string]: any};
  customerId?: StateType['customerId'];
  isDisabled?: boolean;
  setDisabled?: (flag: boolean) => void;
}

const FormItem = Form.Item;

const InsuranceInfo: React.FC<InsuranceInfoProps> = (props) => {
  const { customerId, insuranceInfo = {}, isDisabled, setDisabled} = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (insuranceInfo && insuranceInfo.insurance && insuranceInfo.insurance.length > 0) {
      form.resetFields();
      setDisabled && setDisabled(true);
    }
  }, [insuranceInfo])

  const columns: Array<{[key: string]: any}> = [
    // { label: '贷款笔数', span: 2 },
    { label: '保险公司名称', span: 5 },
    { label: '缴费方式', span: 5 },
    { label: '缴费次数', span: 4 },
    { label: '保单类型', span: 6 },
    { label: '操作', span: 2 }
  ];

  const formItems: Array<{[key: string]: any}> = [
    // name: 表单字段名 type: 表单类型 rules: 验证规则  width: 所占宽度，默认自动， options: 下拉时的选择值  addonAfter: 后缀
    // { type: 'index'},
    { name: 'companyName', span: 5, rules: [], type: 'input', addonAfter: ''},
    { name: 'payType', span: 5, rules: [], type: 'radio', options: PayType, addonAfter: ''},
    { name: 'paidCount', span: 4, rules: [], type: 'input', inputType: 'number', options: []},
    { name: 'type', span: 6, rules: [], type: 'radio', options: InsuranceType, addonAfter: '元'},
    { type: 'option', span: 2 }
  ];

  // 保存
  const handleFinish = (values: any) => {
    if (!customerId) {
      message.info('请先添加客户信息');
      return;
    }
    const $params = values.insurance.map((val:any) => Object.assign({}, val, {customerId}));
    fetchSubmitInsurance($params).then(res => {
      if (res.status === 0) {
        setDisabled && setDisabled(true);
      }
    })
  }

  // 重置Or取消
  const handleReset = () => {
    form.resetFields();
    if (Object.keys(InsuranceInfo).length > 0) {
      // setIsDisabled(true);
      setDisabled && setDisabled(true);
    }
  }

   // 删除
   const handleRemove = (id: number, cb: () => void) => {
    fetchDeleteInsuranceById({id}).then(res => {
      if (res.status === 0) {
        message.success('删除成功');
        cb();
      }
    });
    // cb();
  }

  return (   
      <Form
        name="insuranceInfo"
        form={form}
        labelCol={COLLABEL}
        onFinish={handleFinish}
        initialValues={insuranceInfo}
      >
        {/* 表单列表 */}
        <TableForm
          disabled={isDisabled}
          form={form}
          fieldName="insurance"
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
    // </Panel>
  )
}

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
  InsuranceInfo
);
