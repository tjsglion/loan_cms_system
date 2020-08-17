/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import {Form, Input, Button, Select, Row, Col, DatePicker, Radio, Modal, Cascader} from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { TEXTINFO, DATEFORMAT, OPTIONSPLACEHOLDER } from '@/constants';
import { cityArray } from '@/constants/cityArray';

// const columns: Array<{[key: string]: any}> = [
// label: 标签名, span: 所占列数
//   { label: string, span: number },
// ];

// const formItems: Array<{[key: string]: any}> = [
//   // name: 表单字段名 type: 表单类型 rules: 验证规则  width: 所占宽度，默认自动， options: 下拉时的选择值  addonAfter: 后缀
//   { name: 'a', rules: [], type: 'input', span: 5, options: [], addonAfter: ''},
// ];

interface TableFormProps {
  // info?: Array<{[key: string]: any}>;
  form: any;
  fieldName: string;
  columns: Array<{[key: string]: any}>;
  formItems: Array<{[key: string]: any}>;
  disabled?: boolean;
  onRemove?: (id: number, cb: () => void) => void;
}

const FormItem = Form.Item;
const {Option} = Select;

const TableForm: React.FC<TableFormProps> = (props) => {

  const {
    columns = [],
    formItems = [],
    fieldName = 'field',
    form,
    disabled,
    onRemove
  } = props;
  // 渲染的列表集合
  const maps = {
    'input': (col: {[key: string]: any}) => <Input disabled={disabled} placeholder={TEXTINFO.placeholder} type={col.inputType} addonAfter={col.addonAfter}/>,
    'select': (col: {[key: string]: any}) => (
      <Select disabled={disabled} {...OPTIONSPLACEHOLDER}>
          {
            // @ts-ignore
            col.options.map(opt => <Option key={opt.key} value={opt.value}>{opt.key}</Option>)
          }
        </Select>
    ),
    'datepick': () => <DatePicker disabled={disabled} style={{width: '100%'}} locale={locale} format={DATEFORMAT}/>,
    'radio': (col: {[key: string]: any}) => (
      <Radio.Group disabled={disabled}>
        {
          // @ts-ignore
          col.options.map(opt => <Radio value={opt.value} key={opt.key}>{opt.key}</Radio>)
        }
      </Radio.Group>
    ),
    'cascader': () => <Cascader disabled={disabled} style={{width: '100%'}} {...OPTIONSPLACEHOLDER} options={cityArray}/>
  }

  const renderFormItem = (col: {[key: string]: any}) => {
    const {type} = col;
    return maps[type](col)
  } 

  return (
    <>
      <Row gutter={24} style={{height: '32px'}}>
        {
          columns.map(col => (
            <Col span={col.span} key={`title_${col.label}`} style={{fontWeight: 500}}>
              {col.label}
            </Col>
          ))
        }
      </Row>
      <Form.List name={fieldName}>
        {
          (fields, {add, remove}) => {
            return (
              <>
                {
                  fields.map((field, fi) => (
                    <Row gutter={24} key={`row_${fi}`}>
                      {
                        formItems.map((col) => {
                          const {name, type, rules } = col;
                          // 索引列表
                          let result;
                          if (type === 'index') {
                            result = (
                              <Col span={col.span} key='index'>{fi + 1}</Col>
                            )
                          } else if (type === 'option') {
                            result = (
                              <Col span={col.span} key='option'>
                                <MinusCircleOutlined style={{ position: 'relative', top: '5px', fontSize: '20px' }} onClick={() => {
                                  const $obj = form.getFieldValue(fieldName)[field.name];
                                  // console.log($obj);
                                  if ($obj && $obj.id) {
                                    Modal.confirm({
                                      title: '删除',
                                      content: '确定要删除该记录吗?',
                                      okText: '确定',
                                      cancelText: '取消',
                                      onOk: () => {
                                        onRemove && onRemove($obj.id, () => remove(field.name));
                                      }
                                    })
                                    
                                  } else {
                                    remove(field.name);
                                  }
                                }
                              }/>
                                {/* <SaveOutlined style={{ position: 'relative', top: '5px', fontSize: '20px', marginLeft: '10px' }} onClick={() => handleSave()}/> */}
                              </Col>
                            )
                          } else {
                            result = (
                              <Col span={col.span} key={`${name}_${fi}`} >
                                <FormItem
                                  {...field}
                                  name={[field.name, name]}
                                  fieldKey={[field.fieldKey, name]}
                                  rules={rules.length > 0 ? rules : [{ required: true, message: '必须输入' }]}
                                >
                                  {renderFormItem(col)}
                                </FormItem>
                              </Col>
                            )
                          }
                          return result;
                        })
                      }
                    </Row>
                  ))
                }

                {
                  formItems.length > 0 && !disabled ? (
                    <FormItem>
                      <Button style={{ width: '100%', alignContent: 'center' }} type="dashed" onClick={() => add()}>添加</Button>
                    </FormItem>
                  ) : ''
                }
              </>
            )
          }
        }
      </Form.List>
    </>
  );
}

export default TableForm;
