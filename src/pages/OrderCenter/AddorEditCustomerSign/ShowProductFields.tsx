import { BaseFieldsIProps } from '@/pages/Config/Product/AddOrEditProductExpandFields';
import { Card, Descriptions } from 'antd';
import React, { useEffect, useState } from 'react';
import { queryCustomerProductFieldByWorkNo } from './server';

interface ShowProductFieldsIProps {
  workNo: string;
  productName: string;
}

const ShowProductFields: React.FC<ShowProductFieldsIProps> = (props) => {

  const {workNo, productName} = props;
  const [info, setInfo] = useState<BaseFieldsIProps[]>([])

  useEffect(() => {
    if (workNo) {
      queryCustomerProductFieldByWorkNo({workNo}).then(res => {
        if (res.status === 0) {
          if (res.data && res.data.list) {
            setInfo(res.data.list);
          }
        }
      })
    }
  }, [workNo]);

  return (
    <>
    {
        info.length > 0 ? 
            <Card>
              <Descriptions title="产品附加信息" bordered>
                <Descriptions.Item label="产品名称">
                  {productName || '--'}
                </Descriptions.Item>
                {
                  info.map(item => {
                    const { dataType, fieldValue} = item;
                    const renderImg = (str: string) => {
                      const v = str.split(';');
                      const res = v.map(c => (
                        <img src={c} style={{ width: '50px', height: '50px' }} alt="" />
                      ));
                      return <>{res}</>
                    }
                    return (
                      <Descriptions.Item label={item.fieldName}>
                        {
                          dataType === 1 ? item.fieldValue : renderImg(fieldValue)
                        }
                      </Descriptions.Item>
                    )
                  })
                }
                
              </Descriptions>
            </Card>
          : ''
      }
    </>
  );
}

export default ShowProductFields;