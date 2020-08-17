/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-object-spread */
import React, { useEffect } from 'react';
import { Form, Button, message } from 'antd';
import { COLLABEL } from '@/constants';
import { connect } from 'umi';
import TableForm from '../TableForm';
import { StateType } from '../../model';
import { fetchDeleteLoanCarById, fetchSubmitLoanCar } from '../server';
import { PayType, InsuranceType } from '../../../../../constants/index';

interface LoanCarInfoProps {
  loanCarInfo?: {[key: string]: any};
  customerId?: StateType['customerId'];
  isDisabled?: boolean;
  setDisabled?: (flag: boolean) => void;
}

const FormItem = Form.Item;

const LoanCarInfo: React.FC<LoanCarInfoProps> = (props) => {
  const { customerId, loanCarInfo = {}, isDisabled, setDisabled} = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (loanCarInfo && loanCarInfo.loanCar.length > 0) {
      form.resetFields();
      setDisabled && setDisabled(true);
    }
  }, [loanCarInfo])

  const columns: Array<{[key: string]: any}> = [
    // { label: '贷款笔数', span: 2 },
    { label: '车辆牌照', span: 5 },
    { label: '车贷总数', span: 5 },
    { label: '还款期数', span: 4 },
    { label: '月供金额', span: 6 },
    { label: '操作', span: 2 }
  ];

  const formItems: Array<{[key: string]: any}> = [
    // name: 表单字段名 type: 表单类型 rules: 验证规则  width: 所占宽度，默认自动， options: 下拉时的选择值  addonAfter: 后缀
    // { type: 'index'},
    { name: 'carNo', span: 5, rules: [], type: 'input', addonAfter: ''},
    { name: 'totalLoanMoney', span: 5, rules: [], type: 'input', inputType: 'number', options: [], addonAfter: '元'},
    { name: 'paidCount', span: 4, rules: [], type: 'input', inputType: 'number', options: [], addonAfter: '期'},
    { name: 'monthlyMoney', span: 6, rules: [], type: 'input', inputType: 'number', options: [], addonAfter: '元'},
    { type: 'option', span: 2 }
  ];

  // 保存
  const handleFinish = (values: any) => {
    if (!customerId) {
      message.info('请先添加客户信息');
      return;
    }
    const $params = values.loanCar.map((val:any) => Object.assign({}, val, {customerId}));
    fetchSubmitLoanCar($params).then(res => {
      if (res.status === 0) {
        // setIsDisabled(true);
        setDisabled && setDisabled(true);
      }
    })
  }

  // 重置Or取消
  const handleReset = () => {
    form.resetFields();
    if (Object.keys(loanCarInfo).length > 0) {
      // setIsDisabled(true);
      setDisabled && setDisabled(true);
    }
  }

   // 删除
   const handleRemove = (id: number, cb: () => void) => {
    fetchDeleteLoanCarById({id}).then(res => {
      if (res.status === 0) {
        message.success('删除成功');
        cb();
      }
    });
    // cb();
  }

  return (   
      <Form
        name="loanCarInfo"
        form={form}
        labelCol={COLLABEL}
        onFinish={handleFinish}
        initialValues={loanCarInfo}
      >
        {/* 表单列表 */}
        <TableForm
          disabled={isDisabled}
          form={form}
          fieldName="loanCar"
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
  LoanCarInfo
);
