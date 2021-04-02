import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Row, Form, Input, Button } from 'antd';
import Radio from 'antd/es/radio';
import React from 'react';

interface BasicBankItemIProps {}

const FormItem = Form.Item;

const BasicBankItem: React.FC<BasicBankItemIProps> = () => {

  return (
    <>
      <Row gutter={24} style={{height: '34px'}}>
        <Col span={8} style={{fontWeight: 500}}>
          字段名
        </Col>
        <Col span={8} style={{fontWeight: 500}}>
          字段类型
        </Col>
      </Row>

      <Form.List name='list'>
        {
          (fields, {add, remove}) => {
            return (
              <>
                {
                  fields.map((field, i) => (
                    <Row gutter={24} key={field.key}>
                      <Col span={8}>
                        <FormItem
                          {...field}
                          name={[field.name, 'fieldName']}
                          fieldKey={[field.fieldKey, 'fieldName']}
                        >
                          <Input placeholder="请输入字段名" />  
                        </FormItem>
                      </Col>
                      <Col span={8}>
                        <FormItem
                          {...field}
                          name={[field.name, 'dataType']}
                          fieldKey={[field.fieldKey, 'dataType']}
                        >
                          <Radio.Group>
                            <Radio key="1" value={1}><span style={{padding: '0 15px 0 5px'}}>文案</span></Radio>
                            <Radio key="2" value={2}><span style={{padding: '0 15px 0 5px'}}>图片</span></Radio>
                          </Radio.Group>
                        </FormItem>
                      </Col>
                      <Col span={4} style={{ marginTop: '5px' }}>
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      </Col>
                    </Row>
                  ))
                }

                <FormItem>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    添加扩展字段
                  </Button>
                </FormItem>
              </>
            )
          }
        }
      </Form.List>
    </>
  );
};

export default BasicBankItem;