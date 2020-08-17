import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { DATETIME } from '@/constants';
import styles from './CustomerTime.less';

interface CustomerTimeProps {
  style?: {[key: string]: any};
  label: string;
  colon?: boolean;
  handleChange: (start: string, end: string) => void;
}

const { RangePicker } = DatePicker;

const CustomerTime: React.FC<CustomerTimeProps> = (props) => {

  const {style, label, colon, handleChange} = props;

  const handleTimeChange = (date: Array<{[key: string]: any}>) => {
    // console.log(moment(date[0]).format(DATETIME), moment(date[1]).format(DATETIME));
    const [start, end] = date;
    handleChange(moment(start).format(DATETIME), moment(end).format(DATETIME))
  }
  return (
    <div style={style} className={styles['customer-time-group']}>
      <span className={styles['label-input-label']}>
        {label}
        {
          colon ? ':' : ''
        }
      </span>

      <div className={styles['customer-time']}>
        {/* @ts-ignore */}
        <RangePicker locale={locale} onChange={handleTimeChange}/>
      </div>
    </div>
  )
}

export default CustomerTime;
