import React, { useState, useEffect } from 'react';
import PermissionHeader from './PermissionHeader';
import PermissionBody from './PermissionBody';

interface PermissionChildProps {
  item: {[key: string]: any};
  index: number; // 列表索引
  // 已选中的多选框
  checkedItems?: Array<number>;
  /**
   * values: 下拉列表值
   * falg: 全选或删除
   */
  onChildChecked?: (values: Array<number>, index: number) => void;
}

const PermissionChild: React.FC<PermissionChildProps> = (props) => {
  const {item, index, onChildChecked, checkedItems = []} = props;
  const [isChecked, setChecked] = useState(false);
  const [checkValues, setCheckedValue] = useState<number[]>([]);
  const [indeterminate, setIndeterminate] = useState(false);
  // 获取当前item下所有的下拉值
  const [allValues, setAllValues] = useState<Array<number>>([]);

  const setCheckedAndIndeterminate = (values: number[]) => {
    setChecked(values.length > 0 && allValues.length === values.length);
    setIndeterminate(values.length > 0 && allValues.length !== values.length)
  }

  const handleChildChecked = (values: number[], index: number) => {
    setCheckedValue(values);
    setCheckedAndIndeterminate(values)
    // item.hasChecked = true;
    item.hasChecked = values.length > 0;
    onChildChecked && onChildChecked(values.length === 0 ? [] : values , index);
  }

  // 获取当前item下的所有选框值
  useEffect(() => {
    setAllValues(item.childPrivLst.map((c: {[key: string]: any}) => c.id));
  }, []);

  useEffect(() => {
    setCheckedValue(checkedItems)
    setCheckedAndIndeterminate(checkedItems);
  }, [props.checkedItems]);

  // 获取全选的值
  const getCheckedValue = () => {
    setCheckedValue(item.childPrivLst.map((c: {[key: string]: any}) => c.id));
  }

  // 全选
  const handleCheckedAll = (flag: boolean) => {
    // 1. 将全选标志设置为true
    setChecked(flag);
    // 2. 获取全选的值
    flag ? getCheckedValue() : setCheckedValue([]);
    item.hasChecked = flag;
    item.childPrivLst.forEach((child: {[key: string]: any}) => {
      child.hasChecked = flag;
    });
    onChildChecked && onChildChecked(flag ? allValues : [], index);
  }

  return (
    <>
      <PermissionHeader
        label={item.name}
        id={item.id}
        isTop={false}
        checked={isChecked}
        indeterminate={indeterminate}
        checkAll={handleCheckedAll}
      />
      <PermissionBody
        index={index}
        selected={checkValues}
        childrens={item.childPrivLst}
        onChecked={handleChildChecked}
      />
    </>
  )
}

export default PermissionChild;