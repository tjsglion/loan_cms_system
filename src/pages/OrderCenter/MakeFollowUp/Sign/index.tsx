/* eslint-disable prefer-object-spread */
import React, {useState, useEffect} from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Select, Row, Col, Input, Card, Radio, Button, Spin, message } from 'antd';
import { COLLABEL, RULES, TEXTINFO, COLSPAN, OPTIONSPLACEHOLDER, YESORNO } from '@/constants';
import _ from 'lodash';
import { fetchProductList, fetchProductById } from '@/pages/Config/Product/server';
import { history } from 'umi';
import { fetchFundersList } from '@/pages/Config/Funders/server';
import UpladImage from './UploadImg';
import { queryAddOrEditSign, queryCustomerSignUpDetailsByWorkNo } from '../server';
import { filterEmptyFields } from '@/utils/utils';

interface SignProps {
  baseInfo: {[key: string]: any};
  funders: Array<{[key: string]: any}>;
  location: {
    query: {
      customerId: string;
      workNo: string;
      type: string;
      parentPath: string;
    }
  }
}

const FormItem = Form.Item;
const { Option } = Select;

const Sign: React.FC<SignProps> = (props) => {

  const {baseInfo = {}, location: { query: {
    customerId,
    workNo,
    type,
    parentPath
  }}} = props;
  const [form] = Form.useForm();
  const [isDisabled] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [products, setProducts] = useState<Array<{[key: string]: any}>>([])
  const [prodName, setProdName] = useState('');
  const [capitalName, setCapitalName] = useState('');
  const [formValues, setFormValues] = useState<{[key: string]: any}>({});
  // console.log(customerId, workNo);

  // 重置Or取消
  const handleReset = () => {
    form.resetFields();
  }

   // 出资方列表
   const [funders, setFunders] = useState<Array<{[key:string]:any}>>([]);

   useEffect(() => {
     fetchFundersList({
       pageIndex: 1,
       pageSize: 1000
     }).then(res => {
       const {data} = res;
       if (data) {
         // @ts-ignore
         setFunders(data);
       }
     })
   }, []);

  useEffect(() => {
    if (type === 'edit') {
      queryCustomerSignUpDetailsByWorkNo({workNo}).then(res => {
        // console.log('获取签单信息:', res);
        if (res.status === 0) {
          setFormValues(res.data);
          // 根据 productId 获取产品信息
          const {productId} = res.data;
          fetchProductById({productId}).then(res => {
            if (res.status === 0) {
              const {data} = res;
              setProducts([data]);
            }
          })
          handleReset();
        }
      })
    }
  }, [type]);

  const handleSubmitSignForm = (values: {[key: string]: any}) => {
    const params = type === 'add'
      ? Object.assign({...values}, { productName: prodName, capitalName, customerId, workNo })
      : Object.assign({...values}, { productName: prodName, capitalName, customerId, workNo, id: baseInfo.id })
    ;

    filterEmptyFields(params);
    queryAddOrEditSign(params, type).then(res => {
      if (res.status === 0) {
        message.success(res.info);
        history.push(parentPath);
      }
    })
  }

  // 搜索产品信息
  const searchProduct = _.debounce((value) => {
    if (!value) return;
    setFetching(true);
    fetchProductList({
      pageSize: 100,
      pageIndex: 1,
      name: value
    }).then(res => {
      setFetching(false);
      const {data = []} = res;
      if (data.length > 0) {
        // @ts-ignore
        setProducts(data);
      } else {
        setProducts([]);
      }
    })
  }, 500);

  // 切换产品
  // @ts-ignore
  const handleProdChange = (v: any, options: {[key: string]: any}) => {
    const {children} = options;
    setProdName(children);
  }
  // 切换资方
  // @ts-ignore
  // const handleCapitalChange = (v: any, options: {[key: string]: any}) => {
  //   const {children} = options;
  //   setCapitalName(children);
  // }
  const handleChange = (e, options) => {
    const { children } = options;
    if (children) setCapitalName(children);
  }


  return (
    <PageHeaderWrapper>
      <Card>
        <Form
          name="signForm"
          form={form}
          labelCol={COLLABEL}
          initialValues={formValues}
          onFinish={handleSubmitSignForm}
        >

          <Row gutter={24}>
            <Col {...COLSPAN}>
              <FormItem label="协议编号" name="protocolNo" rules={[{required: true, message: '必填字段'}]}>
                <Input disabled={isDisabled} {...TEXTINFO} />
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="资方名称" name="capitalId" rules={[{required: true, message: '必填字段'}]}>
                <Select 
                  disabled={isDisabled} 
                  {...OPTIONSPLACEHOLDER}
                  onChange={handleChange}
                >
                  {
                    funders.map((f: {[key: string]: any}) => <Option key={f.capitalId} value={f.capitalId}>{f.name}</Option>)
                  }
                </Select>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="资方类型" name="capitalType" rules={[{required: true, message: '必填字段'}]}>
                <Select 
                  disabled={isDisabled} 
                  {...OPTIONSPLACEHOLDER}
                  onChange={handleChange}
                >
                  <Option key="1" value={1}>平安KYB</Option>
                  <Option key="2" value={2}>其它</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...COLSPAN}>
              <FormItem label="产品名称" name="productId" rules={[{required: true, message: '必填字段'}]}>
                <Select
                  showSearch
                  placeholder="请输入贷款产品关键字"
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  filterOption={false}
                  onSearch={searchProduct}
                  onChange={handleProdChange}
                  style={{ width: '100%' }}
                >
                  {products.map(d => (
                    <Option key={d.productId} value={d.productId}>{d.name}</Option>
                  ))}
                </Select>
              </FormItem>
            </Col>

            <Col {...COLSPAN}>
              {/* {uploadRender('半身照', 'customerHalfBodyUrl', 'bodyUrl')} */}
              <FormItem label="半身照" name="customerHalfBodyUrl" rules={[{required: true, message: '必填字段'}]}>
                <UpladImage 
                  url={formValues.customerHalfBodyUrl}
                  isDisabled={false}
                  setUrl={
                    (url: string) => form.setFieldsValue(
                      {
                        'customerHalfBodyUrl': url
                      }
                    )}
                />
              </FormItem>
            </Col>

            <Col {...COLSPAN}>
              {/* {uploadRender('身份证正面', 'customerIdCardFrontUrl', 'frontUrl')} */}
              <FormItem label="身份证正面" name="customerIdCardFrontUrl" rules={[{required: true, message: '必填字段'}]}>
                <UpladImage 
                  url={formValues.customerIdCardFrontUrl}
                  isDisabled={false}
                  setUrl={
                    (url: string) => form.setFieldsValue(
                      {
                        'customerIdCardFrontUrl': url
                      }
                    )}
                />
              </FormItem>
            </Col>

            <Col {...COLSPAN}>
              {/* {uploadRender('身份证反面', 'customerIdCardBackUrl', 'backUrl')} */}
              <FormItem label="身份证反面" name="customerIdCardBackUrl" rules={[{required: true, message: '必填字段'}]}>
                <UpladImage 
                  url={formValues.customerIdCardBackUrl}
                  isDisabled={false}
                  setUrl={
                    (url: string) => form.setFieldsValue(
                      {
                        'customerIdCardBackUrl': url
                      }
                    )}
                />
              </FormItem>
            </Col>

            <Col {...COLSPAN}>
              {/* {uploadRender('营业执照', 'lisenceUrl', 'lisenceUrl')} */}
              <FormItem label="营业执照" name="licenseUrl" rules={[{required: true, message: '必填字段'}]}>
                <UpladImage 
                  url={formValues.licenseUrl}
                  isDisabled={false}
                  setUrl={
                    (url: string) => form.setFieldsValue(
                      {
                        'licenseUrl': url
                      }
                    )}
                />
              </FormItem>
            </Col>

            <Col {...COLSPAN}>
              {/* {uploadRender('委托协议', 'entrustProtocolUrl', 'protocolUrl')} */}
              <FormItem label="委托协议" name="entrustProtocolUrl" rules={[{required: true, message: '必填字段'}]}>
                <UpladImage 
                  url={formValues.entrustProtocolUrl}
                  isDisabled={false}
                  setUrl={
                    (url: string) => form.setFieldsValue(
                      {
                        'entrustProtocolUrl': url
                      }
                    )}
                />
              </FormItem>
            </Col>

            <Col {...COLSPAN}>
              <FormItem label="打款银行" name="bankName" rules={[{required: true, message: '必填字段'}]}>
                <Input disabled={isDisabled} {...TEXTINFO} />
              </FormItem>
            </Col>

            <Col {...COLSPAN}>
              <FormItem label="银行卡号" name="bankNo" rules={[{required: true, message: '必填字段'}]}>
                <Input disabled={isDisabled} {...TEXTINFO} />
              </FormItem>
            </Col>

            <Col {...COLSPAN}>
              <FormItem label="银行面签" name="haveBankFaceSign" rules={[{required: true, message: '必填字段'}]}>
                <Radio.Group disabled={isDisabled}>
                  {
                    YESORNO.map(item => <Radio value={item.value} key={item.key}>{item.key}</Radio>)
                  }
                </Radio.Group>
              </FormItem>
            </Col>

            <Col {...COLSPAN}>
              <FormItem label="签单状态" name="status" rules={[{required: true, message: '必填字段'}]}>
                <Select 
                  disabled={isDisabled} 
                  {...OPTIONSPLACEHOLDER}
                  onChange={handleChange}
                >
                  <Option key="1" value={1}>待接订单</Option>
                  <Option key="2" value={2}>进行中</Option>
                  <Option key="3" value={3}>暂停</Option>
                  <Option key="4" value={4}>已完成</Option>
                  <Option key="5" value={5}>未完成</Option>
                  <Option key="6" value={6}>已过期</Option>
                </Select>
              </FormItem>
            </Col>

            <Col span={24} style={{ textAlign: 'right' }}>
              <FormItem >
                <Button htmlType="submit" type="primary" style={{marginRight: '10px'}}>
                  { type === 'add' ? '保存' : '更新' }
                </Button>
                <Button onClick={
                  type === 'add' ? handleReset : () => history.push(parentPath)
                }>
                  {type === 'add' ? '重置' : '取消'}
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
}

export default Sign;