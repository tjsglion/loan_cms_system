import React, { useEffect, useState } from 'react';
import PermissionHeader from './PermissionHeader';
import PermissionBody from './PermissionBody';
import styles from './PermissionItem.less';
import PermissionChild from './PermissionChild';

interface PermissionItemProps {
  index: number;
  item: {[key: string]: any};
  hasChild?: boolean;
  onChecked: () => void;
}

const PermissionItem: React.FC<PermissionItemProps> = (props) => {

  const {item, onChecked} = props;
  const [selectValue, setSelectValue] = useState<number[][]>([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [allValues, setAllValues] = useState<number[][]>([]);
  const [indeterminate, setIndeterminate] = useState(false);

  const getAllValues = () => {
    const arrs: number[][] = [];
    const checkArrs: number[][] = [];
    const len = (item.childPrivLst || item.childFieldLst).length;
    for (let i = 0; i < len; i++) {
      const priv = (item.childPrivLst || item.childFieldLst)[i];
      if (priv.childPrivLst && priv.childPrivLst.length > 0) {
        if (!arrs[i]) arrs[i] = []
        if (!checkArrs[i]) checkArrs[i] = [];
        for (let j = 0, jLen = priv.childPrivLst.length; j < jLen; j++) {
          const c = priv.childPrivLst[j];
          arrs[i].push(c.id)
          if (c.hasChecked) {
            checkArrs[i].push(c.id);
          }
        }
      } else {
        if (!arrs[0]) arrs[0] = [];
        if (!checkArrs[0]) checkArrs[0] = [];
        if (priv.hasChecked) {
          checkArrs[0].push(priv.id);
        }
        arrs[0].push(priv.id);
      }
    }

    return {
      arrs,
      checkArrs,
    };
  }

  const calcLen = (allValues: any[], selectValue: any[]) => {
    // 总长度
    let allLen = 0;
    allValues.forEach(c => {
      allLen += c.length
    });
    // 选中的长度
    let checkedLen = 0;
    selectValue.forEach(c => {
      checkedLen += c.length;
    });
    return {
      allLen,
      checkedLen,
    };
  }

  useEffect(() => {
    // 设置所有值与选中的值
    const obj = getAllValues();
    setAllValues(obj.arrs);
    setSelectValue(obj.checkArrs);
    // 设置 最外层的头是选中还是半选
    const {allLen, checkedLen} = calcLen(obj.arrs, obj.checkArrs);
    // console.log('++++++', allLen, checkedLen, checkedLen)
    setCheckedAll(checkedLen > 0 && allLen === checkedLen);
    setIndeterminate(checkedLen > 0 && allLen !== checkedLen)
    onChecked && onChecked();
  }, []);

  // 给列表添加 hasChecked 属性
  const addCheckedProps = () => {
    onChecked && onChecked();
  }

  const handleChecked = (values: number[]) => {
    const $tmp = [values];
    setCheckedAll(allValues[0].length === $tmp[0].length);
    setIndeterminate($tmp[0].length > 0 && allValues[0].length !== $tmp[0].length);
    setSelectValue($tmp);
    item.hasChecked = values.length > 0;
    // onChecked && onChecked($tmp, index);
    addCheckedProps();
  }

  // 子列表选择
  const handleChildChecked = (values: number[], index: number) => {
    selectValue[index] = values;
    setSelectValue(selectValue);
    const {allLen, checkedLen} = calcLen(allValues, selectValue);
    setCheckedAll(allLen === checkedLen);
    setIndeterminate(checkedLen > 0 && allLen !== checkedLen)
    item.hasChecked = checkedLen > 0;
    addCheckedProps();
  }

  // 选择全部
  const handleCheckedAll = (flag: boolean) => {
    // 1. 将选框变成选中或取消
    setCheckedAll(flag);
    if (flag) {
      setIndeterminate(false);
    }
    item.hasChecked = flag;
    (item.childPrivLst || item.childFieldLst).forEach((child: {[key: string]: any}) => {
      child.hasChecked = flag;
      if ((child.childPrivLst || child.childFieldLst) && (child.childPrivLst || child.childFieldLst).length > 0) {
        child.hasChecked = flag;
        (child.childPrivLst || child.childFieldLst).forEach((c: {[key: string]: any}) => c.hasChecked = flag);
      }
    });
    const {arrs} = getAllValues()
    setSelectValue(flag ? arrs : []);
    // onChecked && onChecked(selectValue, index);
    addCheckedProps();
  }

  const generateItem = (child: {[key: string]: any}) => {
    const privList = child.childPrivLst || child.childFieldLst;
    const second = privList.filter((priv: {[key: string]: any}) => (priv.childPrivLst && priv.childPrivLst.length > 0));
    const firstItem = privList.filter((priv: {[key: string]: any}) => (!priv.childPrivLst || priv.childPrivLst.length === 0));
    // 返回结果
    return (
      <div className={styles['list-group']}>
        <PermissionHeader
          isTop
          id={child.id}
          label={child.name}
          checked={checkedAll}
          indeterminate={indeterminate}
          checkAll={handleCheckedAll}
        />
        {
          firstItem.length > 0 && <div style={{ marginTop: '10px' }}>
              <PermissionBody
                index={0}
                childrens={firstItem}
                onChecked={handleChecked}
                selected={selectValue[0]}
              />
            </div>
        }
        {
          second.length > 0 && second.map((priv: {[key: string]: any}, i: number) => (
            <div className={styles['list-group-child']} key={`child_${i}`}>
              <PermissionChild
                item={priv}
                index={i}
                checkedItems={selectValue[i]}
                onChildChecked={handleChildChecked}
              />
            </div>
          ))
        }
      </div>
    )
  }

  return (
    <>
      {generateItem(item)}
    </>
  )
};

export default PermissionItem;
