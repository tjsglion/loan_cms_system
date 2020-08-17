import React, { useState } from 'react';
import { SearchParams } from '@/constants';
import { Card, Button, Upload } from 'antd';
import { history } from 'umi';
import { SearchOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import LabelForInput from './LabelForInput';
import SearchForTab from './SearchForTab';
import SelectedConditions from './SelectedConditions';
import CustomerTime from './CustomerTime';
import styles from './index.less';

interface CustomerCenterSearchProps {
  handleSubmit: (parms: {[key: string]: any}) => void;
}

const CustomerCenterSearch: React.FC<CustomerCenterSearchProps> = () => {

  const [choiceItems, setChoiceItems] = useState<Array<{[key: string]: any}>>([]);
  const [category, setCategory] = useState(-1);
  const [status, setStatus] = useState(-1);
  const [follow, setFollow] = useState(-1);
  const [show, setShow] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  
  // @ts-ignore
  const addOrReplaceChoice = (item: {[key: string]: any}, flag?: string = 'add') => {
    const index = choiceItems.findIndex(ele => ele.type === item.type);
    if (index > -1) {
      // flag === 'add' ? choiceItems.splice(index, 1, item) : choiceItems.splice(index, 1);
      if (flag === 'add') {
        choiceItems.splice(index, 1, item)
      } else {
        if (item.type === 'category') {
          setCategory(-1);
        }
        if (item.type === 'status') {
          setStatus(-1);
        }
        if (item.type === 'follow') {
          setShow(false);
          setFollow(-1);
        }
        choiceItems.splice(index, 1);
      }
    } else {
      choiceItems.push(item);
    }
    setChoiceItems([...choiceItems]);
    // console.log(choiceItems)
    // setChoiceItems(choiceItems);
  }
  // 客户分类
  const handleCategoryClick = (item: {[key: string]: any}) => {
    setCategory(item.value);
    addOrReplaceChoice(item);
  }

  // 客户状态 
  const handleStatusClick = (item: {[key: string]: any}) => {
    setStatus(item.value);
    addOrReplaceChoice(item);
  }

  // 跟进时间
  const handleFollowClick = (item: {[key: string]: any}) => {
    setFollow(item.value);
    setShow(item.value === 4);
    addOrReplaceChoice(item);
  }

  // 取消所选条件
  const handleCloseChoice = (item: {[key: string]: any}) => {
    addOrReplaceChoice(item, 'delete');
  }

  // 查询
  const handleSubmitSearch = () => {
    const params = Object.create(null);
    console.log(params);
  }

  // 上传之前的处理
  // @ts-ignore
  const handleBeforeUpload = (file) => {
    return true;
  }

  // 批量上传
  // @ts-ignore
  const handleUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return false;
    }
    
    // 上传成功后，获取返回结果
    if (info.file.status === 'done') {
      setLoading(false);
      // console.log(file);
    }
  }

  return (
    <Card>
      <div className={styles['search-group']}>
        {/* 搜索区域 */}
        <div className={styles['search-area-group']}>
          <div className={styles['search-area']}>
            <div className={styles['search-label-input']}>
              <LabelForInput
                label="商户名"
                colon
                onChange={(val) => console.log(val)}
              />
            </div>
            <div className={styles['search-label-input']}>
              <LabelForInput
                label="联系人"
                colon
                onChange={(val) => console.log(val)}
              />
            </div>
            <Button 
              className={styles['search-label-input']} 
              type="primary" 
              icon={<SearchOutlined />}
              onClick={handleSubmitSearch}
            >查询</Button>
          </div>
          <div className={styles['search-btn-groups']}>
            <Upload
              name="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              showUploadList={false}
              beforeUpload={handleBeforeUpload}
              onChange={handleUploadChange}
            >
                <Button
                  type="primary"
                  loading={loading}
                  style={{ marginRight: '10px' }}
                  icon={<UploadOutlined />}
                >批量导入</Button>
              </Upload> 
            <Button icon={<PlusOutlined />} type="primary" onClick={() => {
              history.push('/order/customer/profile');
            }}>新增客户</Button>
          </div>
        </div>
        
      </div>
      <SearchForTab
        colon
        value={category}
        label="客户分类"
        style={{ marginTop: '10px' }}
        items={ SearchParams.category }
        handleClick={(value) => handleCategoryClick(value)}
      />
      <SearchForTab
        colon
        value={status}
        label="客户状态"
        style={{ marginTop: '10px' }}
        items={ SearchParams.status }
        handleClick={(value) => handleStatusClick(value)}
      />
      <SearchForTab
        colon
        value={follow}
        label="跟进时间"
        style={{ marginTop: '10px' }}
        items={ SearchParams.follow }
        handleClick={(value) => handleFollowClick(value)}
      />
      {/* 自定义时间 */}
      {
        show ? <CustomerTime
          style={{ marginTop: '10px' }} 
          colon
          label="自定义时间"
          handleChange={(start, end) => {
            setStartTime(start);
            setEndTime(end);
          }}
        /> : ('')
      }
      {
        choiceItems.length > 0 ? (
          <SelectedConditions
            colon
            label="已选条件"
            items={choiceItems}
            style={{ marginTop: '10px' }}
            handleClose={(value) => handleCloseChoice(value)}
          />
        ) : ''
      }
    </Card>
   
    
  )
}

export default CustomerCenterSearch;

