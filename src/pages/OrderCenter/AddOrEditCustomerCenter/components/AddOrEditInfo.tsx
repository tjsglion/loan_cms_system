import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Row, Col, Select, Collapse, Radio, Upload, message, InputNumber } from 'antd';
import { COLSPAN, COLLABEL, RULES, TEXTINFO, OPTIONSPLACEHOLDER, MarriageInfo, HightEducation } from '@/constants';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { prod, headers } from '@/core/http.request';
import { Dispatch, connect } from 'umi';
import { fetchSubmittedInfo } from './server';
import { StateType } from '../model';

interface AddOrEditInfoProps {
  formInfo?: {[key: string]: any};
  // @ts-ignore
  dispatch?: Dispatch<any>
  customerId?: StateType['customerId'];
}

const FormItem = Form.Item;
const { Option } = Select;
const { Panel } = Collapse;

const AddOrEditInfo: React.FC<AddOrEditInfoProps> = (props) => {

  const { dispatch, customerId, formInfo = {}} = props;
  const [form] = Form.useForm();
  const [imgUrl, setImgUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('add');
  const [isDisabled, setIsDisabled] = useState(false);

  const saveCustomerIdToDva = (id: string) => {
    dispatch({
      type: 'customerCenter/addCustomerId',
      payload: {
        customerId: id
      }
    })
  }

  useEffect(() => {
    if (formInfo && Object.keys(formInfo).length > 0) {
      setImgUrl(formInfo.idCardUrl);
      form.resetFields();
      setIsDisabled(true);
    }
  }, [formInfo])

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">上传</div>
    </div>
  );

  // 编辑
  const handleEdit = (e: { preventDefault: () => void; stopPropagation: () => void; }) => {
    e.preventDefault();
    e.stopPropagation();
    setType('edit');
    setIsDisabled(false);
  }


  const beforeUpload = (file: {[key: string]: any}) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片最大2M');
    }
    return isJpgOrPng && isLt2M;
  }
  
  const getBase64 = (img: Blob, callback: Function) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = (infos: {[key: string]: any}) => {
    if (infos.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (infos.file.status === 'done') {
      const {response} = infos.file;
      if (response.status === 0) {
        form.setFieldsValue({'idCardUrl': response.data.url});
        message.success('图片上传成功');
      }
      getBase64(infos.file.originFileObj, (url: string) => {
        setLoading(false);
        setImgUrl(url);
      });
    }
  };

  const handleSubmitBaseInfo = (values: {[key: string]: any}) => {
    const params = type === 'add' ? values : {...values, customerId};
    fetchSubmittedInfo(params, type).then(res => {
      const {status, info, data} = res;
      if (status === 0) {
        message.success(info);
        // 保存成功后，将返回的 customerId 保存供下边的表格进行操作
        if (type === 'add') {
          saveCustomerIdToDva(data.customerId);
        }
        setIsDisabled(true);
      }
    })
  } 

  // 重置Or取消
  const handleReset = () => {
    form.resetFields();
    if (Object.keys(formInfo).length > 0) {
      setIsDisabled(true);
      setType('edit');
    }
  }

  return (
    <Collapse
      defaultActiveKey={1}
    >
      <Panel 
        header="客户信息" 
        key="1"
        extra={customerId && isDisabled ? <a onClick={handleEdit}>编辑</a> : ''}
      >
        <Form
          name="baseInfoForm"
          form={form}
          labelCol={COLLABEL}
          initialValues={formInfo}
          onFinish={handleSubmitBaseInfo}
        >
          <Row gutter={24}>
            <Col {...COLSPAN}>
              <FormItem label="客户名称" name="name" {...RULES}>
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="联系电话" name="phone" rules={
                [
                  {
                    pattern: /^1[3456789]\d{9}$/,
                    message: '手机号格式不正确'
                  },
                  RULES.rules[0]
                ]
              }>
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col>
           
            <Col {...COLSPAN}>
              <FormItem label="性别" name="sex" {...RULES}>
                <Radio.Group disabled={isDisabled}>
                  <Radio value={1} key="1">男</Radio>
                  <Radio value={2} key="2">女</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="客户年龄" name="age" {...RULES}>
                <InputNumber disabled={isDisabled} style={{ width: '100%' }} min={10} max={100} {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="客户地址" name="address" {...RULES}>
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="婚姻状态" name="marriageInfo" {...RULES}>
                <Select disabled={isDisabled} {...OPTIONSPLACEHOLDER}>
                  {
                    MarriageInfo.map(item => <Option key={`m_${item.value}`} value={item.value}>{item.key}</Option>)
                  }
                </Select>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="最高学历" name="highestEducation" {...RULES}>
                <Select disabled={isDisabled} {...OPTIONSPLACEHOLDER}>
                  {
                    HightEducation.map(item => <Option key={`h_${item.value}`} value={item.value}>{item.key}</Option>)
                  }
                </Select>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="芝麻分" name="sesameCreditScore" {...RULES}>
                <InputNumber disabled={isDisabled} style={{ width: '100%' }} min={1} {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="微信分" name="wxCreditScore" {...RULES}>
                <InputNumber disabled={isDisabled} style={{ width: '100%' }} min={1} {...TEXTINFO}/>
              </FormItem>
            </Col>

            {/* <Col {...COLSPAN}>
              <FormItem label="所选产品" name="product" {...RULES}>
                <InputNumber disabled={isDisabled} style={{ width: '100%' }} min={1} {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="被拒原因" name="reason" {...RULES}>
                <Select disabled={isDisabled} {...OPTIONSPLACEHOLDER}>
                  {
                    HightEducation.map(item => <Option key={`h_${item.value}`} value={item.value}>{item.key}</Option>)
                  }
                </Select>
              </FormItem>
            </Col> */}

            <Col {...COLSPAN}>
              <FormItem label="身份证号" name="idCardNo" rules={
                [
                  {
                    pattern: /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/,
                    message: '身份证格式不正确'
                  },
                  RULES.rules[0]
                ]
              }>
                <Input disabled={isDisabled} {...TEXTINFO}/>
              </FormItem>
            </Col>

            <Col {...COLSPAN}>
              <FormItem label="身份证照" name="idCardUrl" {...RULES}>
                <Upload
                  disabled={isDisabled}
                  name="file"
                  accept="image/*"
                  listType="picture-card"
                  showUploadList={false}
                  headers={headers()}
                  action={
                    prod
                      ? '/api/msg-developer/api/api/application/uploadImg' 
                      : '/api/api/base/file/upload'
                  }
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {
                    imgUrl ? <img style={{ width: '100px', height: '100px' }} src={imgUrl} alt="avatar" /> : uploadButton
                  }
                </Upload>
              </FormItem>
            </Col>

            {/* <Col {...COLSPAN}>
              <FormItem label="客户意向" name="f" {...RULES}>
                <Select disabled={isDisabled} {...OPTIONSPLACEHOLDER}>
                  {
                    SearchParams.status.map(item => <Option key={item.value} value={item.value}>{item.key}</Option>)
                  }
                </Select>
              </FormItem>
            </Col> */}
            {
              !isDisabled
                ? (
                  <Col span={24} style={{ textAlign: 'right' }}>
                    <FormItem >
                      <Button htmlType="submit" type="primary" style={{marginRight: '10px'}}>保存</Button>
                      <Button onClick={handleReset}>取消</Button>
                    </FormItem>
                  </Col>
                )
                : ''
            }
          </Row>
        </Form>
      </Panel>
    </Collapse>
  )
}

export default connect(
  ({
    customerCenter
  }: {
    customerCenter: StateType
  }) => ({
    customerId: customerCenter.customerId
  })
)(
  AddOrEditInfo
);
