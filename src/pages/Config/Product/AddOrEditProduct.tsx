/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import { formItemLayout2, submitFormLayout, OPTIONSPLACEHOLDER } from '@/constants';
import SubmitFormBtn from '@/pages/components/SubmitFormBtn';
import { citys } from '@/constants/city';
import BraftEditorComponent from '@/pages/components/BraftEditorComponent';
import { transfNumbToFloat } from '@/utils/utils';
import { fetchAddOrEditProduct } from './server';

interface AddOrEditProductProps {
  isEdit?: boolean;
  baseInfo?: {[key: string]: any };
  funders?: {[key: string]: any }
  // funders: {[key: string]: any};
  onSuccess: () => void;
}

const FormItem = Form.Item;
const { Option } = Select;

const AddOrEditProduct: React.FC<AddOrEditProductProps> = (props) => {

  const { baseInfo = {}, funders = [], onSuccess, isEdit = false} = props;
  const [capitalType, setcapitalType] = useState('');
  const [form] = Form.useForm();

  // console.log('出资方信息:', funders);
  const handleDescChange = (val: string) => {
    form.setFieldsValue({
      'productDesc': val
    });
  }
  // 提交
  const handleFinish = (values: {[key: string]: any}) => {
    values.minLimitMoney = transfNumbToFloat(values.minLimitMoney);
    values.maxLimitMoney = transfNumbToFloat(values.maxLimitMoney);
    values.minMonthRate = transfNumbToFloat(values.minMonthRate);
    values.maxMonthRate = transfNumbToFloat(values.maxMonthRate);
    values.maxLimitLoanTime = +values.maxLimitLoanTime;
    values.minLimitLoanTime = +values.minLimitLoanTime;
    values.capitalType = capitalType || baseInfo.capitalType;
    values.coverRegions = values.coverRegions.join(',');
    if (isEdit) {
      values.productId = baseInfo.productId;
    }
    fetchAddOrEditProduct(values, isEdit).then(res => {
      // console.log('添加产品成功;', res);
      if (res.status === 0) {
        onSuccess && onSuccess();
      }
    });
    // values.productDesc = values
  }
  // 重围
  const handleResetForm = () => {
    form.resetFields();
  }

  // @ts-ignore
  const handleChange = (e, options) => {
    setcapitalType(options.children)
  }

  return (
    <Form
      form={form}
      {...formItemLayout2}
      onFinish={handleFinish}
      initialValues={baseInfo}
    >
      <FormItem
        name="name"
        label="产品名称"
        rules={
          [
            {required: true, message: '产品名称不能为空'}
          ]
        }
      >
        <Input placeholder="输入产品名称"/>
      </FormItem>
      <FormItem
        name="secondTitle"
        label="副标题"
      >
        <Input placeholder="请输入副标题"/>
      </FormItem>
      <FormItem
        name="productType"
        label="产品类型"
        rules={
          [
            {required: true, message: '产品类型不能为空'}
          ]
        }
      >
        <Select>
          <Option key="1" value={1}>激活</Option>
          <Option key="2" value={2}>未激活</Option>
        </Select>
      </FormItem>
      <FormItem
        name="capitalId"
        label="出资方类型"
        rules={
          [
            {required: true, message: '出资方类型不能为空'}
          ]
        }
      >
       {/* <Input type="text" placeholder="请输入"/> */}
       <Select onChange={handleChange} {...OPTIONSPLACEHOLDER}>
          {
            funders.map((f: {[key: string]: any}) => <Option key={f.capitalId} value={f.capitalId}>{f.name}</Option>)
          }
        </Select>
      </FormItem>
      {/* <FormItem
        name="secondTitle"
        label="质押或担保类型"
        rules={
          [
            {required: true, message: '质押或担保类型不能为空'}
          ]
        }
      >
        <Select>
          <Option key="1" value={1}>无抵押</Option>
          <Option key="2" value={2}>未抵押</Option>
        </Select>
      </FormItem> */}

      <Form.Item label="额度范围" style={{ marginBottom: 0 }}>
        <Form.Item
          name="minLimitMoney"
          rules={[{ required: true, message: '额度范围不能为空' }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input type="number" addonAfter="万元"/>
        </Form.Item>
        <Form.Item
          name="maxLimitMoney"
          rules={[{ required: true, message: '额度范围不能为空' }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
        >
          <Input type="number" addonAfter="万元"/>
        </Form.Item>
      </Form.Item>

      <Form.Item label="贷款期限" style={{ marginBottom: 0 }}>
        <Form.Item
          name="minLimitLoanTime"
          rules={[{ required: true, message: '贷款期限不能为空' }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input type="number" addonAfter="个月"/>
        </Form.Item>
        <Form.Item
          name="maxLimitLoanTime"
          rules={[{ required: true, message: '贷款期限不能为空' }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
        >
          <Input type="number" addonAfter="个月"/>
        </Form.Item>
      </Form.Item>

      <FormItem
        name="averageLoanTime"
        label="平均放款时间"
        rules={
          [
            {required: true, message: '放款时间不能为空'}
          ]
        }
      >
        <Input placeholder="请输入放款时间" addonAfter="天"/>
      </FormItem>

      <FormItem
        name="coverRegions"
        label="覆盖城市(可多选)"
        rules={
          [
            {required: true, message: '覆盖城市不能为空'}
          ]
        }
      >
        <Select 
          mode="multiple"
          placeholder={OPTIONSPLACEHOLDER.placeholder}
          style={{ width: '100%' }}
        >
          {
            citys.map(c => <Option key={c.citysName} value={c.citysName}>{c.citysName}</Option>)
          }
        </Select>
      </FormItem>

      <Form.Item label="月化利率" style={{ marginBottom: 0 }}>
        <Form.Item
          name="minMonthRate"
          rules={[{ required: true, message: '月化利率不能为空' }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input type="number" addonAfter="个月"/>
        </Form.Item>
        <Form.Item
          name="maxMonthRate"
          rules={[{ required: true, message: '月化利率不能为空' }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
        >
          <Input type="number" addonAfter="个月"/>
        </Form.Item>
      </Form.Item>

      <FormItem
        name="productDesc"
        label="产品描述"
        labelCol={{span: 24}}
        wrapperCol={{span: 24}}
      >
        {/* <Input.TextArea  placeholder="输入出备注" rows={4}/> */}
        <BraftEditorComponent 
          value={baseInfo.productDesc}
          onChange={handleDescChange}
        />
      </FormItem>

      <FormItem {...submitFormLayout}>
        <SubmitFormBtn 
          onReset={handleResetForm}
        />
      </FormItem>
    </Form>
  )
}

export default AddOrEditProduct;
