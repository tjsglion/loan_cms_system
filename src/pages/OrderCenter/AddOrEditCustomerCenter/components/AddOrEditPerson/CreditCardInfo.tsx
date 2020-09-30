/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-object-spread */
import React, { useEffect } from 'react';
import { Form, Button, message } from 'antd';
import { COLLABEL, YESORNO } from '@/constants';
import { connect } from 'umi';
import TableForm from '../TableForm';
import { StateType } from '../../model';
import { fetchDeleteCreditCardById, fetchSubmitCreditCard } from '../server';

interface CreditCardInfoProps {
  creditCardInfo?: {[key: string]: any};
  customerId?: StateType['customerId'];
  isDisabled?: boolean;
  setDisabled?: (flag: boolean) => void;
}

const FormItem = Form.Item;

const CreditCardInfo: React.FC<CreditCardInfoProps> = (props) => {
  const { customerId, creditCardInfo = {}, isDisabled, setDisabled} = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (creditCardInfo && creditCardInfo.credit && creditCardInfo.credit.length > 0) {
      form.resetFields();
      setDisabled && setDisabled(true);
    }
  }, [creditCardInfo])

  const columns: Array<{[key: string]: any}> = [
    // { label: '贷款笔数', span: 2 },
    { label: '银行', span: 5 },
    { label: '授信金额', span: 5 },
    { label: '可提金额', span: 4 },
    { label: '使用比例', span: 4 },
    { label: '是否套现', span: 4 },
    { label: '操作', span: 2 }
  ];

  const formItems: Array<{[key: string]: any}> = [
    // name: 表单字段名 type: 表单类型 rules: 验证规则  width: 所占宽度，默认自动， options: 下拉时的选择值  addonAfter: 后缀
    // { type: 'index'},
    { name: 'bank', span: 5, rules: [], type: 'input', addonAfter: ''},
    { name: 'totalMoney', span: 5, rules: [], type: 'input', inputType: 'number', options: [], addonAfter: '元'},
    { name: 'withDrawMoney', span: 4, rules: [], type: 'input', inputType: 'number', options: [], addonAfter: '元'},
    { name: 'usedRate', span: 4, rules: [], type: 'input',},
    { name: 'haveCashOut', span: 4, rules: [], type: 'select', options: YESORNO},
    { type: 'option', span: 2 }
  ];

  // 保存
  const handleFinish = (values: any) => {
    if (!customerId) {
      message.info('请先添加客户信息');
      return;
    }
    const $params = values.credit.map((val:any) => Object.assign({}, val, {customerId}));
    fetchSubmitCreditCard($params).then(res => {
      if (res.status === 0) {
        // setIsDisabled(true);
        setDisabled && setDisabled(true);
      }
    })
  }

  // 重置Or取消
  const handleReset = () => {
    form.resetFields();
    if (Object.keys(creditCardInfo).length > 0) {
      // setIsDisabled(true);
      setDisabled && setDisabled(true);
    }
  }

   // 删除
   const handleRemove = (id: number, cb: () => void) => {
    fetchDeleteCreditCardById({id}).then(res => {
      if (res.status === 0) {
        message.success('删除成功');
        cb();
      }
    });
    // cb();
  }

  return (   
      <Form
        name="creditCardInfo"
        form={form}
        labelCol={COLLABEL}
        onFinish={handleFinish}
        initialValues={creditCardInfo}
      >
        {/* 表单列表 */}
        <TableForm
          disabled={isDisabled}
          form={form}
          fieldName="credit"
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
  CreditCardInfo
);
