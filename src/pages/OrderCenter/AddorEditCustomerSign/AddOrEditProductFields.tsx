import { COLLABEL, COLSPAN2, TEXTINFO } from '@/constants';
import { BaseFieldsIProps } from '@/pages/Config/Product/AddOrEditProductExpandFields';
import { filterEmptyFields } from '@/utils/utils';
import { Button, Col, Form, Input, message, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import AddOrEditPic from '../AddOrEditCustomerCenter/components/AddOrEditPerson/AddOrEditPic';
import { queryAddSignUpBase, queryCustomerProductField } from './server';

interface AddOrEditProductFieldsIProps {
  type?: string;
  disabled?: boolean;
  fieldsInfo?: {[key: string]: any};
  productId?: string;
  customerId?: string;
  productName?: string;
  customerName?: string;
  workNo?: string;
  items: BaseFieldsIProps[];
  onOk?: () => void;
  onReload?: (values: {[key: string]: string}[]) => void;
}

const FormItem = Form.Item;

const AddOrEditProductFields: React.FC<AddOrEditProductFieldsIProps> = (props) => {

  const {items = [], disabled = false, type='add', fieldsInfo = {}, workNo, productId, customerId, productName, onOk, onReload} = props;
  const [form] = Form.useForm();
  const [initialVal, setInitialVal] = useState({});

  form.resetFields();

  useEffect(() => {
    if (fieldsInfo) {
      const keys = Object.keys(fieldsInfo);
      const obj = {};
      keys.forEach(key => {
        obj[key] = fieldsInfo[key];
      });
      setInitialVal(obj);
      form.resetFields();
    }
  }, [fieldsInfo]);

  const handleSubmit = (values: {[key: string]: any}) => {
    function addProductFieldInfo (wNo: string) {
      if (!wNo) {
        message.error('签单号不存在!');
      } else {
        const list: {[key: string]: any}[] = [];
        const keys = Object.keys(values);
        keys.forEach(c => {
          const obj = {
            fieldId: c,
            fieldValue: values[c]
          }
          list.push(obj);
        });
        // console.log('提交的参数=>>>', list);
        const params = {
          workNo: wNo,
          list
        }
        // console.log('提交的参数=>>>', params);
        queryCustomerProductField(params, type).then(res => {
          if (res.status === 0) {
            if (onOk) onOk();
            if (onReload) onReload(list);
            message.success(res.info);
          } else {
            message.error(res.info);
          }
        })
      }
    }

    if (!workNo) {
      // 调用生成 workNo接口
      queryAddSignUpBase({
        productId,
        customerId,
        productName
      }).then(res => {
        if (res.status === 0) {
          const {data} = res;
          addProductFieldInfo(data.workNo);
        } else {
          message.error(res.info);
        }
      });
    } else {
      addProductFieldInfo(workNo);
    }

  }

  return (
    <>
      <Form
        form={form}
        labelCol={COLLABEL}
        name="fieldForm"
        initialValues={initialVal}
        onFinish={handleSubmit}
      >
        <Row gutter={24}>
            {
              items.map(c => (
                <Col {...COLSPAN2}>
                  <FormItem  label={c.fieldName} name={c.fieldId} rules={[{required: true, message: '必填字段'}]}>
                    {
                      c.dataType === 1 ? <Input disabled={disabled} {...TEXTINFO}/> : <AddOrEditPic 
                        type="normal"
                        picInfo={initialVal[c.fieldId] ? initialVal[c.fieldId] : null}
                        onSuccess={(url) => {
                        form.setFieldsValue({[c.fieldId]: url})
                      }}/>
                    }
                  </FormItem>
                </Col>
              ))
            }
          
          {
            !disabled ? (
              <Col span={24} style={{ textAlign: 'right' }}>
                <FormItem >
                  <Button htmlType="submit" type="primary" style={{marginRight: '10px'}}>保存</Button>
                  <Button onClick={() => {
                    form.resetFields();
                    if (onOk) onOk();
                  }}>取消</Button>
                </FormItem>
              </Col>
            ) : ''
          }
          
        </Row>
      </Form>
    </>
  );
};

export default AddOrEditProductFields;