import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import styles from './SearchForTab.less';

interface SearchForTabProps {
  style?: {[key: string]: any};
  value: number;
  label: string;
  items: Array<{[key: string]: any}>;
  colon?: boolean;
  handleClick: (item: {[key: string]: any}) => void;
}

const SearchForTab: React.FC<SearchForTabProps> = (props) => {
  const {style, label, colon, items = [], handleClick, value} = props;
  const [activeValue, setActiveValue] = useState(-1);

  const handleBtnClick = (item: {[key: string]: any}) => {
    setActiveValue(item.value);
    handleClick(item);
  }

  useEffect(() => {
    setActiveValue(value);
  }, [value]);

  return (
    <div style={style} className={styles['search-tab-group']}>
      <span className={styles['label-input-label']}>
        {label}
        {
          colon ? ':' : ''
        }
      </span>
      <div className={styles['search-tab-btns']}>
        {
          items.map(item => (
            <Button 
              key={item.value}
              type={activeValue === item.value ? 'primary' : 'default'}
              className={styles['search-tab-btn']}
              onClick={() => handleBtnClick(item)}
            >
              {item.key}
            </Button>
          ))
        }
      </div>
    </div>
  );
}

export default SearchForTab;
