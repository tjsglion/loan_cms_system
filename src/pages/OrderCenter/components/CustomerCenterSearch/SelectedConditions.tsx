import React from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styles from './SelectedConditions.less';

interface SelectedConditionsProps {
  style?: {[key: string]: any};
  label: string;
  colon?: boolean;
  items: Array<{[key: string]: any}>;
  handleClose: (item: {[key: string]: any}) => void;
}

const SelectedConditions: React.FC<SelectedConditionsProps> = (props) => {

  const { style, label, colon, items = [], handleClose } = props;

  return (
    <div style={style} className={styles["selected-group"]}>

      <span className={styles['label-input-label']}>
        {label}
        {
          colon ? ':' : ''
        }
      </span>

      <div className={styles['selected-btns']}>
        {
          items.map(item => (
            <Button
              className={styles['selected-btn']}
              key={item.type}
              onClick={() => handleClose(item)}
            >
              {item.key} <CloseOutlined />
            </Button>
          ))
        }
      </div>
    </div>
  )
}

export default SelectedConditions;