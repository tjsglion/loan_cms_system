import React from 'react';
import { Button, Collapse, Form, Input, Row, Col, Select, Radio, DatePicker } from 'antd';
import { COLLABEL, COLSPAN, TEXTINFO, RULES, YESORNO, DATEFORMAT, YESORNO2, RADIOIDENTITY, OPTIONSPLACEHOLDER } from '@/constants';
import locale from 'antd/es/date-picker/locale/zh_CN';

interface AddOrEditPersonProps {
  type?: string;
}

const FormItem = Form.Item;
const { Panel } = Collapse;
// const { Option } = Select;

const AddOrEditPerson: React.FC<AddOrEditPersonProps> = (props) => {

  const { type = 'add'} = props;
  const [form] = Form.useForm();

  // 编辑
  const handleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <Collapse
      defaultActiveKey={1}
    >
      <Panel 
        header="个人信息" 
        key="1"
        extra={type === 'edit' ? <Button onClick={handleEdit}>编辑</Button> : ''}
      >
        <Form
          name="baseInfoForm"
          form={form}
          labelCol={COLLABEL}
        >
          <Row gutter={24}>
            <Col {...COLSPAN}>
              <FormItem label="产权情况" name="company">
                <Input {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="公司地址" name="address">
                <Input {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="职业身份" name="a">
                <Select {...OPTIONSPLACEHOLDER}>
                  {
                    RADIOIDENTITY.map(item => <Radio key={item.key} value={item.value}>{item.key}</Radio>)
                  }
                </Select>
                {/* <Radio.Group>
                  {
                    RADIOIDENTITY.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group> */}
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="现金流" name="b">
                <Input {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="有无执照" name="c">
                <Radio.Group>
                  {
                    YESORNO.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="注册时间" name="e">
                <DatePicker style={{ width: '100%' }} locale={locale} format={DATEFORMAT}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="所占股份" name="f">
                <Input type="number" {...TEXTINFO} addonAfter="%"/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="经营范围" name="g">
                <Input.TextArea {...TEXTINFO}  autoSize={{minRows: 1, maxRows: 2}}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="单位下户" name="h">
                <Radio.Group>
                  {
                    YESORNO2.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="年营业额" name="i">
                <Input type="number" {...TEXTINFO} addonAfter="万元/年"/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="月营业额" name="j">
                <Input type="number" {...TEXTINFO} addonAfter="万元/月"/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="需挂靠单位" name="k">
                <Radio.Group>
                  {
                    YESORNO.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="单位座机" name="l">
                <Radio.Group>
                  {
                    YESORNO2.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="纳税金额" name="m">
                <Input {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="开票金额" name="n">
                <Input {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="行政处罚" name="o">
                <Radio.Group>
                  {
                    YESORNO2.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="行政处罚金额" name="p">
                <Input {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="移除记录" name="q">
                <Input {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="官司记录" name="r">
                <Radio.Group>
                  {
                    YESORNO2.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="动产抵押" name="s">
                <Input {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="股权抵押" name="t">
                <Input  {...TEXTINFO}/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="有无副业" name="r">
                <Radio.Group>
                  {
                    YESORNO2.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="副业收入" name="j">
                <Input type="number" {...TEXTINFO} addonAfter="元/月"/>
              </FormItem>
            </Col>
            <Col span={24} style={{ textAlign: 'right' }}>
              <FormItem >
                <Button htmlType="submit" type="primary" style={{marginRight: '10px'}}>保存</Button>
                <Button onClick={() => form.resetFields()}>取消</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  )
}

export default AddOrEditPerson;
