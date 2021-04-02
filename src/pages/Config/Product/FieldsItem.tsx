/* eslint-disable @typescript-eslint/no-unused-expressions */
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox } from 'antd';
import React from 'react';
import { BaseFieldsIProps } from './AddOrEditProductExpandFields';

interface FieldsItemIprops {
  selected?: Array<number>;
  childrens: Array<{[key: string]: any}>;
  onChecked?: (values: Array<number>) => void;
  addFields?: () => void;
  onEdit?: (item: BaseFieldsIProps) => void;
}

const FieldsItem: React.FC<FieldsItemIprops> = (props) => {

  const {selected = [], childrens = [], onChecked, addFields, onEdit } = props;

  const handleChange = (checkedValue: any[]) => {
    onChecked && onChecked(checkedValue);
  }

  const handleAddFields = () => {
    addFields && addFields();
  }

  // @ts-ignore
  const handleEdit = (e, item) => {
    e.preventDefault();
    if (onEdit) onEdit(item);
  }
  return (
    <Checkbox.Group 
      value={selected} 
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 33.3%)', gridRowGap: '20px', lineHeight:'32px', justifyItems: 'start'  }}
      onChange={handleChange}
    >
      {
        childrens.map(item => (
          <Checkbox value={item.id} key={item.id}>
            {item.name}
            {
              item.type === 2 && <span style={{ marginLeft: '10px' }} onClick={(e) => handleEdit(e, item)}><EditOutlined /></span>
            }
            {/* {item.id} */}
          </Checkbox>
        ))
      }
      <Button type="dashed" onClick={handleAddFields} block icon={<PlusOutlined />}>
          添加字段
      </Button>
    </Checkbox.Group>
  )
};

export default FieldsItem;