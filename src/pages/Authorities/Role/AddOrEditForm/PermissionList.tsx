/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import PermissionItem from './PermissionItem';

interface PermissionListProps {
  // 所有的列表权限
  items: Array<{[key: string]: any}>; // 权限列表
  checkedItem: string; // 已选择的权限
  onChecked: (items: number[]) => void;
}

const PermissionList: React.FC<PermissionListProps> = (props) => {

  const {items, onChecked} = props;
  const handleChecked = () => {
    // console.log(index, values);
    const values: number[] = [];
    const getCheckedValue = (ims: Array<{[key: string]: any}>) => {
      ims.forEach(item => {
        if (item.childPrivLst) {
          getCheckedValue(item.childPrivLst);
        }
        if (item.hasChecked) {
          values.push(item.id);
        }
      })
    }
    getCheckedValue(items);
    onChecked && onChecked(values);
  }

  return (
    <>
      {
        items.map((item, i) => (
          <PermissionItem
           index={i}
           item={item}
           key={`item_${i}`}
           onChecked={handleChecked}
          />
        ))
      }
    </>
  )
}

export default PermissionList;
