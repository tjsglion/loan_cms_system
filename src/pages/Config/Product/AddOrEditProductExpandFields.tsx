import { formItemLayout, submitFormLayout } from '@/constants';
import { Button, Card,  Form, message, Modal } from 'antd';
import { history } from 'umi';
import React, { useEffect, useState } from 'react';
import AddOrEditFields from './AddOrEditFields';
import FieldsItem from './FieldsItem';
import { fetchBaseProductFieldList, fetchProductFieldsHasSelect, fetchSaveProductField } from './server';

interface AddOrEditProductExpandFieldsIProps {
  location: {
    query: {
      productId: string;
    }
  }
}

const FormItem = Form.Item;

export interface BaseFieldsIProps {
  id: number;
  name: string;
  sort: number;
  type: number;
  dataType: number;
  status: number;
  createTime: string;
  updateTime: string;
  fieldName: string;
  fieldId: number;
  fieldValue: string;
}

const AddOrEditProductExpandFields: React.FC<AddOrEditProductExpandFieldsIProps> = (props) => {

  const {location: {query: {productId}}} = props;
  const [form] = Form.useForm();
  const [allFields, setAllFields] = useState<Partial<BaseFieldsIProps>[]>([]);
  const [selectVal, setSelectVal] = useState<number[]>([]);
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('add');
  const [info, setInfo] = useState<Partial<BaseFieldsIProps>>({});
  // const [h, setH] = useState(500);

  useEffect(() => {
    // 获取扩展字段列表
    fetchBaseProductFieldList().then(res => {
      if (res.status === 0) {
        setAllFields(res.data.list);
      }
    });
  }, [])

  useEffect(() => {
    if (productId) {
      // 获取产品扩展字段
      fetchProductFieldsHasSelect({
        productId
      }).then(res => {
        const {data} = res;
        if (data && data.list && data.list.length > 0) {
          const ids: number[] = [];
          // @ts-ignore
          data.list.forEach(item => ids.push(item.fieldId));
          setSelectVal([...ids]);
        }
      });
    }
  }, [productId])

  const handleChecked = (val: number[]) => {
    setSelectVal([...val]);
  }

  // @ts-ignore
  const handleEdit = (item: BaseFieldsIProps) => {
    setType('edit');
    setVisible(true);
    setInfo(item);
  }

  const goBack = () => {
    history.push('/config/product');
  }
  // 取消
  const handleReset = () => {
    form.resetFields();
    goBack();
  }

  const handleSubmit = () => {
    // values.productId = productId;
    if (selectVal.length === 0) {
      message.error('扩展字段不能为空');
      return;
    }
    const p = selectVal.map(item => {
      return {
        fieldId: item
      }
    });
    // values.list = p;
    fetchSaveProductField({
      productId,
      list: p
    }).then(res => {
      if (res.status === 0) {
        message.success(res.info);
        goBack();
      } else {
        message.error(res.info);
      }
    })
  }

  return (
    <>
      <Card>
        <Form
          name="expandForm"
          form={form}
          {...formItemLayout}
          onFinish={handleSubmit}
        >
          <FormItem
            label="扩展字段"
            name="list"
          >
            <FieldsItem
              selected={selectVal} 
              childrens={allFields}
              addFields={() => {
                setVisible(true);
                setInfo({});
              }}
              onChecked={handleChecked}
              onEdit={handleEdit}
            />
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: '10px' }}>
            <Button htmlType="submit" type="primary" style={{marginRight: '10px'}}>保存</Button>
            <Button onClick={handleReset}>取消</Button>
          </FormItem>
        </Form>
      </Card>

      <Modal
        width="650px"
        title='添加字段'
        visible={visible}
        onCancel={() => setVisible(false)}
        okText="确定"
        cancelText="取消"
        onOk={() => setVisible(false)}
        footer={false}
      >
        <AddOrEditFields
          info={info}
          type={type}
          onSubmit={(item: BaseFieldsIProps) => {
            setVisible(false);
            const index = allFields.findIndex(c => c.id === item.id);
            if (index > 0) {
              allFields.splice(index, 1, item)
              setAllFields([...allFields]);
            } else {
              // @ts-ignore
              setAllFields(allFields.push(item))
            }
          }}
          onCancel={() => setVisible(false)}
        />
      </Modal>
    </>
  );
};

export default AddOrEditProductExpandFields;