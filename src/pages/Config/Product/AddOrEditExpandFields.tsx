import PermissionList from '@/pages/Authorities/Role/AddOrEditForm/PermissionList';
import SubmitFormBtn from '@/pages/components/SubmitFormBtn';
import { transfNumbToFloat } from '@/utils/utils';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, message } from 'antd';
import { history } from 'umi';
import React, { useEffect, useState } from 'react';
import { ProductItem } from './data';
import { fetchAddOrEditProduct, fetchAllProductFields } from './server';

interface AddOrEditExpandFieldsIProps {
  // productId: string;
  location: {
    query: {
      productId: string;
    },
    state: ProductItem
  }
}

const FormItem = Form.Item;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 5, span: 16 },
};

const AddOrEditExpandFields: React.FC<AddOrEditExpandFieldsIProps> = (props) => {

  const {location: {query: {productId}, state}} = props;
  const [fields, setFields] = useState<Array<{[key: string]: any}>>([]);
  const [opProduct] = useState<{[key: string]: any}>({});
  const [checkStr] = useState<string>(state.fieldStr || '')
  const [form] = Form.useForm();

  // const filterPrivList = (privList: Array<{[key: string]: any}>, ownerPriv: Array<{[key: string]: any}>) => {
  //   const $owner = ownerPriv && ownerPriv.split(',') || [];

  //   const $newPriv = privList
  //     // 过滤顶层元素
  //     .filter(priv => $owner.includes(`${priv.id}`));

  //   $newPriv.forEach((item: {[key: string]: any}) => {
  //     // return item.childPrivLst.filter
  //     const childPriv = item.childPrivLst.filter((child: {[key: string]: any}) => $owner.includes(`${child.id}`));
  //     item.childPrivLst = childPriv;

  //     if (item.childPrivLst.childPrivLst) {
  //       const cPriv = item.childPrivLst.childPrivLst.filter((c: {[key: string]: any}) => $owner.includes(`${c.id}`));
  //       item.childPrivLst.childPrivLst = cPriv;
  //     }
  //   });

  //   return $newPriv;
  // }

  const setCheckedValue = (items: Array<{[key: string]: any}>, ownerPriv: string[]) => {
    items.forEach(item => {
      if (item.childPrivLst) {
        setCheckedValue(item.childPrivLst, ownerPriv);
      }
      if (ownerPriv.includes(`${item.id}`)) {
        item.hasChecked = true;
      }
    });
  }

  useEffect(() => {
    if (productId) {
      fetchAllProductFields({}).then(res => {
        // if (res.status === 0) {
        //   const {data} = res;
        //   setFields(data.list);
        // }
        const {data} = res;
        if (data) {
          const {list} = data;
          const {fieldStr} = state;
          const finalPriv = list;
  
          // 修改时，选中当前用户所选择的;
          if (fieldStr) {
            setCheckedValue(finalPriv, fieldStr.split(','));
          }
          setFields(finalPriv);
        }
      });
      // fetchProductFields({
      //   productId
      // }).then(res => {
      //   console.log('获取产品字段:', res);
      // });
    }
  }, [productId]);

  // 选中的权限
  const handleChecked = (values: number[]) => {
    // console.log('选择的权限列表:', values);
    form.setFieldsValue({'priviStr': values.join(',')})
  }

  const handleSubmit = (values: {[key: string]: any}) => {
    if (!values.priviStr.length) {
      message.warning('产品扩展字段不能为空');
      return;
    }
    const params: ProductItem = Object.assign({}, state, {fieldStr: values.priviStr});
    params.minLimitMoney = transfNumbToFloat(params.minLimitMoney);
    params.maxLimitMoney = transfNumbToFloat(params.maxLimitMoney);
    params.minMonthRate = transfNumbToFloat(params.minMonthRate);
    params.maxMonthRate = transfNumbToFloat(params.maxMonthRate);
    params.maxLimitLoanTime = +params.maxLimitLoanTime;
    params.minLimitLoanTime = +params.minLimitLoanTime;
    
    params.coverRegions = params.coverRegions.join(',');
    delete params.createTime;
    delete params.updateTime;
    // 修改产品信息
    fetchAddOrEditProduct(params, true).then(res => {
      if (res.status === 0) {
        message.success(res.info);
        history.push('/config/product');
      }
    });
  }

  return <PageHeaderWrapper>
    <Card>
      <Form
        {...layout}
        form={form}
        initialValues={opProduct}
        onFinish={handleSubmit}
      >
        
        <FormItem
          label="扩展字段"
          name="priviStr"
        >
          <PermissionList 
              checkedItem={checkStr}
              items={fields || []}
              onChecked={handleChecked}
            />
          </FormItem>
        <FormItem {...tailLayout}>
          <SubmitFormBtn onReset={() => history.push('/config/product')}/>
        </FormItem>
      </Form>
    </Card>
  </PageHeaderWrapper>
};

export default AddOrEditExpandFields;