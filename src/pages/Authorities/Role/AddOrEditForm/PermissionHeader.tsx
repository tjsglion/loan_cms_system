import React, { useState } from 'react';
import { Checkbox } from 'antd';
import styles from './PermissionHeader.less';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface PermissionHeaderProps {
  label: string;
  id?: number;
  isTop?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  checkAll?: (flag: boolean) => void;
}

const PermissionHeader: React.FC<PermissionHeaderProps> = (props) => {
  const {label, isTop, indeterminate, checked, checkAll} = props;

  const handleChecked = (e: CheckboxChangeEvent) => {
    checkAll && checkAll(e.target.checked);
  }

  return (
    <div className={styles[isTop ? 'list-item-header-top' : 'list-item-header']}>
      <Checkbox
        indeterminate={indeterminate}
        checked={checked}
        onChange={handleChecked}
      >
        {label}
        {/* {props.id} */}
      </Checkbox>
    </div>
  )
}

export default PermissionHeader;
