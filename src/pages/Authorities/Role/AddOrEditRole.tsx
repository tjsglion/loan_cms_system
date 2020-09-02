/* eslint-disable prefer-object-spread */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Input } from 'antd';
import { history } from 'umi';
import { TEXTINFO } from '@/constants';
import SubmitFormBtn from '@/pages/components/SubmitFormBtn';
import { getLocalUser } from '@/utils/utils';
import { queryAllPrivis, queryAddRoles } from './server';
import PermissionList from './AddOrEditForm/PermissionList';

interface AddOrEditRoleProps {
  location: {
    state: {[key: string]: any};
  }
}

const FormItem = Form.Item;

const AddOrEditRole: React.FC<AddOrEditRoleProps> = (props) => {

  const {location: {state = {}}} = props;
  const [form] = Form.useForm();
  const [priviList, setPriviList] = useState<Array<{[key: string]: any}>>();
  const [opUser] = useState<{[key: string]: any}>(state);

  const filterPrivList = (privList: Array<{[key: string]: any}>, ownerPriv: Array<{[key: string]: any}>) => {
    const $owner = ownerPriv.split(',');

    const $newPriv = privList
      // 过滤顶层元素
      .filter(priv => $owner.includes(`${priv.id}`));

    $newPriv.forEach((item: {[key: string]: any}) => {
      // return item.childPrivLst.filter
      const childPriv = item.childPrivLst.filter((child: {[key: string]: any}) => $owner.includes(`${child.id}`));
      item.childPrivLst = childPriv;

      if (item.childPrivLst.childPrivLst) {
        const cPriv = item.childPrivLst.childPrivLst.filter((c: {[key: string]: any}) => $owner.includes(`${c.id}`));
        item.childPrivLst.childPrivLst = cPriv;
      }
    });

    return $newPriv;
  }

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

  // 获取所有权限
  useEffect(() => {
    queryAllPrivis({}).then(res => {
      const {data} = res;
      if (data) {
        const {list} = data;
        const {priviStr} = getLocalUser()
        let finalPriv = list;
        if (priviStr && priviStr !== 'admin') {
          finalPriv = filterPrivList(list, priviStr);
        }
        filterPrivList(list, priviStr);

        // 修改时，选中当前用户所选择的;
        if (opUser.priviStr) {
          setCheckedValue(finalPriv, opUser.priviStr.split(','));
        }
        setPriviList(finalPriv);
      }
    });

    //
    // queryUserPrivisById({id}).then(res => {
    //   console.log('获取数据:', res);
    // })
  }, []);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 12 },
  };

  // 选中的权限
  const handleChecked = (values: number[]) => {
    // console.log('选择的权限列表:', values);
    form.setFieldsValue({'priviStr': values.join(',')})
  }

  const handleSubmit = (values: {[key: string]: any}) => {
    const type = opUser.id ? 'edit' : 'add';
    const params = type === 'add' ? values : Object.assign({...values}, {id: opUser.id})
    queryAddRoles(params, type).then(res => {
      if (res.status === 0) {
        history.push('/account/role');
      }
    })
  }

  return <PageHeaderWrapper>
    <Card>
      <Form
        {...layout}
        form={form}
        initialValues={opUser}
        onFinish={handleSubmit}
      >
        <FormItem
          label="角色名称"
          name="name"
        >
          <Input {...TEXTINFO}/>
        </FormItem>
        <FormItem
          label="权限列表"
          name="priviStr"
        >
          <PermissionList 
            checkedItem={opUser.priviStr || ''}
            items={priviList || []}
            onChecked={handleChecked}
          />
        </FormItem>
        <FormItem {...tailLayout}>
          <SubmitFormBtn />
      </FormItem>
      </Form>
    </Card>
  </PageHeaderWrapper>
}

export default AddOrEditRole;
