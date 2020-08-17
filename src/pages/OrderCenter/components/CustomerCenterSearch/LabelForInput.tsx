import React from 'react';
import { TEXTINFO } from '@/constants';
import styles from './LabelForInput.less';

interface LabelForInputProps {
  label: string;
  colon?: boolean;
  placeholder?: string;
  onChange: (val: string) => void;
}

const LabelForInput: React.FC<LabelForInputProps> = (props) => {

  const {
    label,
    colon,
    placeholder = TEXTINFO.placeholder,
    onChange
  } = props;

  // 输入框变化事件
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
  }

  return (
    <div className={styles['label-input-area']}>
      <span className={styles['label-input-label']}>
        {label}
        {
          colon ? ':' : ''
        }
      </span>
      <input
        className={styles['label-input']}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

export default LabelForInput;
