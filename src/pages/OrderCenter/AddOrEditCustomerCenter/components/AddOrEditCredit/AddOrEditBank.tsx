/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-object-spread */
import React, { useEffect } from 'react';
import { Form, Button, message } from 'antd';
import { COLLABEL, YESORNO, LENDER, Repayment } from '@/constants';
import { connect } from 'umi';
import TableForm from '../TableForm';
import { StateType } from '../../model';
import { fetchDeleteCreditForBandById, fetchSubmitCreditForBand } from '../server';

interface AddOrEditBankProps {
  bandInfo?: {[key: string]: any};
  customerId?: StateType['customerId'];
  isDisabled?: boolean;
  setDisabled?: (flag: boolean) => void;
}

const FormItem = Form.Item;

const AddOrEditBank: React.FC<AddOrEditBankProps> = (props) => {
  const { customerId, bandInfo = {}, isDisabled, setDisabled} = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (bandInfo && Object.keys(bandInfo).length > 0) {
      form.resetFields();
      setDisabled && setDisabled(true);
    }
  }, [bandInfo])

  const columns: Array<{[key: string]: any}> = [
    // { label: '贷款笔数', span: 2 },
    { label: '贷款银行', span: 3 },
    { label: '放款时间', span: 3 },
    { label: '放款期限', span: 2 },
    { label: '是否通过', span: 2 },
    { label: '批复金额', span: 2 },
    { label: '月供金额', span: 2 },
    { label: '放款机构', span: 2 },
    { label: '还款方式', span: 3 },
    { label: '备注', span: 3 },
    { label: '操作',  span: 2 }
  ];

  const formItems: Array<{[key: string]: any}> = [
    // name: 表单字段名 type: 表单类型 rules: 验证规则  width: 所占宽度，默认自动， options: 下拉时的选择值  addonAfter: 后缀
    // { type: 'index', span: 2},
    { name: 'loanBank', rules: [], type: 'input', span: 3, options: [], addonAfter: ''},
    { name: 'loanTime', rules: [], type: 'datepick', span: 3, options: [], addonAfter: ''},
    { name: 'loanTerm', rules: [], type: 'input', inputType: 'number', span: 2, options: [], addonAfter: ''},
    { name: 'haveLoan', rules: [], type: 'radio', span: 2, options: YESORNO, addonAfter: ''},
    { name: 'successLoanMoney', rules: [], type: 'input', inputType: 'number', span: 2, options: [], addonAfter: ''},
    { name: 'monthlyMoney', rules: [], type: 'input', inputType: 'number',span: 2, options: []},
    { name: 'loanOrganization', rules: [], type: 'radio', span: 2, options: LENDER, addonAfter: ''},
    { name: 'repayType', rules: [], type: 'select', span: 3, options: Repayment, addonAfter: ''},
    { name: 'loanRemarkInfo', rules: [], type: 'input', span: 3, options: [], addonAfter: ''},
    { type: 'option', span: 2 }
  ];

  // 保存
  const handleFinish = (values: any) => {
    if (!customerId) {
      message.info('请先添加客户信息');
      return;
    }
    const $params = values.bank.map((val:any) => Object.assign({}, val, {customerId}));
    fetchSubmitCreditForBand($params).then(res => {
      if (res.status === 0) {
        // setIsDisabled(true);
        setDisabled && setDisabled(true);
      }
    })
  }

  // 编辑
  // const handleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   // setType('edit');
  //   // setIsDisabled(false);
  //   setDisabled && setDisabled(false);
  // }

  // 重置Or取消
  const handleReset = () => {
    form.resetFields();
    if (Object.keys(bandInfo).length > 0) {
      // setIsDisabled(true);
      setDisabled && setDisabled(true);
    }
  }

   // 删除
   const handleRemove = (id: number, cb: () => void) => {
    fetchDeleteCreditForBandById({id}).then(res => {
      if (res.status === 0) {
        message.success('删除成功');
        cb();
      }
    });
    // cb();
  }

  return (   
      <Form
        name="partnerForm"
        form={form}
        labelCol={COLLABEL}
        onFinish={handleFinish}
        initialValues={bandInfo}
      >
        {/* 表单列表 */}
        <TableForm
          disabled={isDisabled}
          form={form}
          fieldName="bank"
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
  AddOrEditBank
);
