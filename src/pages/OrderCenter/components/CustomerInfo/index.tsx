import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import styles from './index.less';
import { fetchInfoById } from '../../AddOrEditCustomerCenter/components/server';

interface CustomerInfoProps {
  customerId: string;
  // userInfo?: {[key: string]: any};
}

const CustomerInfo: React.FC<CustomerInfoProps>  = (props) => {

  const {customerId} = props;
  const [userInfo, setUserInfo] = useState<{[key: string]: any}>({});

  useEffect(() => {
    if (customerId) {
      fetchInfoById({customerId}).then(res => {
        if (res.status === 0) {
          setUserInfo(res.data);
        }
      })
    }
  }, [customerId]);

  return (
    <Card>
      <div className={styles['user-info-group']}>
        <span className={styles['user-info-item']}>
          客户名称: {userInfo.name}
        </span>
        <span className={styles['user-info-item']}>
          联系电话: {userInfo.phone}
        </span>
        <span className={styles['user-info-item']}>
          身份证号: {userInfo.idCardNo}
        </span>
        <span className={styles['user-info-item']}>
          客户年龄: {userInfo.age}
        </span>
        <span className={styles['user-info-item']}>
          客户地址: {userInfo.address}
        </span>
      </div>
    </Card>
  )
}

export default CustomerInfo;