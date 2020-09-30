/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-object-spread */
import React, { useEffect } from 'react';
import { Form, Button, message } from 'antd';
import { COLLABEL, YESORNO, LENDER, Locations } from '@/constants';
import { connect } from 'umi';
import TableForm from '../TableForm';
import { StateType } from '../../model';
import { fetchDeleteOwnHouseById, fetchSubmitOwnHouse } from '../server';

interface OwnHouseInfoProps {
  ownHouseInfo?: {[key: string]: any};
  customerId?: StateType['customerId'];
  isDisabled?: boolean;
  setDisabled?: (flag: boolean) => void;
}

const FormItem = Form.Item;

const OwnHouseInfo: React.FC<OwnHouseInfoProps> = (props) => {
  const { customerId, ownHouseInfo = {}, isDisabled, setDisabled} = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (ownHouseInfo && ownHouseInfo.ownHouse && ownHouseInfo.ownHouse.length > 0) {
      form.resetFields();
      setDisabled && setDisabled(true);
    }
  }, [ownHouseInfo])

  const columns: Array<{[key: string]: any}> = [
    // { label: '贷款笔数', span: 2 },
    { label: '房屋地址', span: 3 },
    { label: '产权情况', span: 2 },
    { label: '房型', span: 2 },
    { label: '位置', span: 2 },
    { label: '房屋面积', span: 3 },
    { label: '购买总价', span: 3 },
    { label: '评估总价', span: 3 },
    { label: '是否办证', span: 2 },
    { label: '房屋所在地', span: 2 },
    { label: '操作', span: 2 }
  ];

  const formItems: Array<{[key: string]: any}> = [
    // name: 表单字段名 type: 表单类型 rules: 验证规则  width: 所占宽度，默认自动， options: 下拉时的选择值  addonAfter: 后缀
    // { type: 'index'},
    { name: 'address', span: 3, rules: [], type: 'cascader', addonAfter: ''},
    { name: 'propertyRightInfo', span: 2, rules: [], type: 'input', addonAfter: ''},
    { name: 'type', span: 2, rules: [], type: 'select', options: [{key: '住宅', value: 1}, {key: '别墅', value: 2}, {key: '商住两用', value: 3}, {key: '商铺', value: 4}, {key: '厂房', value: 5}, {key: '自建房', value: 6}, {key: '其他', value: 7}], addonAfter: ''},
    { name: 'position', span: 2, rules: [], type: 'select', options: [{key: '三环内', value: 1}, {key: '三环外', value: 0}]},
    { name: 'area', span: 3, rules: [], type: 'input', inputType: 'number', options: [], addonAfter: 'M²'},
    { name: 'buyTotalMoney', span: 3, rules: [], type: 'input', inputType: 'number', options: LENDER, addonAfter: '万元'},
    { name: 'assessMoney', span: 3, rules: [], type: 'input', inputType: 'number', options: [], addonAfter: 'M²'},
    { name: 'haveCert', span: 2, rules: [], type: 'radio', options: YESORNO, addonAfter: ''},
    { name: 'location', span: 2, rules: [],  type: 'select', options: Locations, addonAfter: ''},
    { type: 'option', span: 2 }
  ];

  // 保存
  const handleFinish = (values: any) => {
    if (!customerId) {
      message.info('请先添加客户信息');
      return;
    }
    const $params = values.ownHouse.map((val:any) => Object.assign({}, val, {address: val.address.join(','), customerId}));
    fetchSubmitOwnHouse($params).then(res => { 
      if (res.status === 0) {
        setDisabled && setDisabled(true);
      }
    })
  }

  // 重置Or取消
  const handleReset = () => {
    form.resetFields();
    if (Object.keys(ownHouseInfo).length > 0) {
      // setIsDisabled(true);
      setDisabled && setDisabled(true);
    }
  }

   // 删除
   const handleRemove = (id: number, cb: () => void) => {
    fetchDeleteOwnHouseById({id}).then(res => {
      if (res.status === 0) {
        message.success('删除成功');
        cb();
      }
    });
  }

  return (   
      <Form
        name="ownHouseForm"
        form={form}
        labelCol={COLLABEL}
        onFinish={handleFinish}
        initialValues={ownHouseInfo}
      >
        {/* 表单列表 */}
        <TableForm
          disabled={isDisabled}
          form={form}
          fieldName="ownHouse"
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
  OwnHouseInfo
);
