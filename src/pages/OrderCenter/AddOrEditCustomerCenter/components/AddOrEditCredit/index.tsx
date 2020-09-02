/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import { Collapse } from 'antd';
import { connect } from 'umi';
import moment from 'moment';
import { DATEFORMAT } from '@/constants';
import AddOrEditBank from './AddOrEditBank';
import { StateType } from '../../model';
import { fetchCreditForBandByCustomerId, fetchCreditForOtherByCustomerId } from '../server';
import AddOrEditOther from './AddOrEditOther';


interface AddOrEditCreditProps {
  customerId?: StateType['customerId'];
  // companyId?: StateType['companyId']
}

const { Panel } = Collapse;

const AddOrEditCredit: React.FC<AddOrEditCreditProps> = (props) => {

  const {customerId} = props;
  const [bandDisable, setBandDisable] = useState(false);
  const [otherDisable, setOtherDisable] = useState(false);
  const [bandInfo, setBandInfo] = useState<{[key: string]: any}>({});
  const [otherInfo, setOtherInfo] = useState<{[key: string]: any}>({});
  const [type, setType] = useState('add');

  useEffect(() => {
    if (customerId) {
      // 查询银行信息
      fetchCreditForBandByCustomerId({customerId}).then(res => {
        const {data = {}} = res;
        // let result = [];
        if (data.list && data.list.length > 0) {
          // moment(data.registerTime, DATEFORMAT)
          data.list.forEach((item: {[key: string]: any}) => item.loanTime = moment(item.loanTime, DATEFORMAT));
        //   // result = data.list.map(item => moment(item.loanTime).format(DATETIME))
        //   result = data.list.map(item => moment(item.loanTime).format(DATETIME))
        }
        console.log('result:', data.list);
        setBandInfo({
            bank: data.list
          });
      });
      // 查询其它信息
      fetchCreditForOtherByCustomerId({customerId}).then(res => {
        const {data = {}} = res;
        setOtherInfo(data);
      });
    }
  }, [customerId]);

  // 银行贷款
  const handleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>, optType: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (optType === 'bank') {
      setBandDisable(false)
    } else {
      setOtherDisable(false)
      setType('edit');
    }
  }
  return (
    <Collapse
      defaultActiveKey={1}
    >
      <Panel 
        header="信用信息" 
        key="1"
      >
        
        <Collapse defaultActiveKey={[1, 2]}>
          <Panel 
            header='银行贷款信息'
            key="1"
            extra={customerId && bandDisable ? <a onClick={(e) => handleEdit(e, 'bank')}>编辑</a> : ''}
          >   
            
            <AddOrEditBank
              bandInfo={bandInfo}
              isDisabled={bandDisable}
              setDisabled={
                (flag: boolean) => {
                  setBandDisable(flag)
                }
              }
            />
          </Panel>
          <Panel 
            header="其它信息"
            key="2"
            extra={customerId && bandDisable ? <a onClick={(e) => handleEdit(e, 'other')}>编辑</a> : ''}
          >
            <AddOrEditOther
              type={type}
              otherInfo={otherInfo}
              isDisabled={otherDisable}
              setDisabled={
                (flag: boolean) => {
                  setOtherDisable(flag)
                }
              }
              onSetType={
                (val: string) => setType(val)
              }
            />
          </Panel>
        </Collapse>
      </Panel>
      {/* <Panel 
        header="信用信息" 
        key="1"
        extra={type === 'edit' ? <Button onClick={handleEdit}>编辑</Button> : ''}
      >
        <Form
          name="courtForm"
          form={form}
          labelCol={COLLABEL}
          onFinish={handleFinish}
        >
          <TableForm 
            fieldName="court"
            columns={columns}
            formItems={formItems}
          />

          <Row gutter={24}>
            <Col {...COLSPAN}>
              <FormItem label="提供贷后材料" name="h" {...RULES}>
                <Radio.Group>
                  {
                    YESORNO.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="征信查询次数" name="i" {...RULES}>
                <Select {...OPTIONSPLACEHOLDER}>
                  {
                    RADIOIDENTITY.map(item => <Radio key={item.key} value={item.value}>{item.key}</Radio>)
                  }
                </Select>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="近3个月网贷次数" name="j" {...RULES}>
                <Input {...TEXTINFO} addonAfter="次"/>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="是否当前逾期" name="k" {...RULES}>
                <Radio.Group>
                  {
                    YESORNO.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="当前逾期金额" name="l" {...RULES}>
                <Input {...TEXTINFO} />
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="逾期情况" name="i" {...RULES}>
                <Select {...OPTIONSPLACEHOLDER}>
                  {
                    RADIOIDENTITY.map(item => <Radio key={item.key} value={item.value}>{item.key}</Radio>)
                  }
                </Select>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="总负债金额" name="l" {...RULES}>
                <Input {...TEXTINFO} />
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="总资产金额" name="l" {...RULES}>
                <Input {...TEXTINFO} />
              </FormItem>
            </Col>
          </Row>
          <FormItem style={{textAlign: 'right'}}>
            <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>保存</Button>
            <Button onClick={() => form.resetFields()}>取消</Button>
          </FormItem>
        </Form>
      </Panel> */}
      
    </Collapse>
  )
}

// export default AddOrEditCredit;
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
  AddOrEditCredit
);