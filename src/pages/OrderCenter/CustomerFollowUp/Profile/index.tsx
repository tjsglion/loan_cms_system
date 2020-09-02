/* eslint-disable prefer-object-spread */
import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Avatar, Input, Button, Form } from 'antd';
import { DATEFORMAT, DATETIME } from '@/constants';
import moment from 'moment';
import { fetchFollowById, fetchAddComments } from '../server';
import CustomerInfo from '../../components/CustomerInfo';
import styles from './index.less';
import Authorized from '@/components/Authorized/Authorized';


interface CustomerFollowUpProfileProps {
  location: { 
    query: {
      id: number;
      customerId: string;
    }
  }
}

const { TextArea } = Input;
const FormItem = Form.Item;

const maps = {
  1: '电话跟进',
  2: '邀约来访',
  3: '上门拜访'
}
const CustomerFollowUpProfile: React.FC<CustomerFollowUpProfileProps> = (props) => {

  const {location: { query: { id, customerId} }} = props;
  const [form] = Form.useForm();
  const [records, setRecords] = useState<{[key: string]: any}>({});

  const fetCtxById = (id) => {
    fetchFollowById({id}).then(res => {
      // console.log('客户跟进详情', res);
      if (res.status === 0) {
        setRecords(res.data);
      }
    })
  }
  useEffect(() => {
    // 获取用户详情
    if (id) {
      fetCtxById(id);
    }
  }, [id]);

  const handleSubmitComment = (values: {[key: string]: any}) => {
    if (!records.id) return;
    const params = Object.assign({...values}, {followLogId: records.id})
    fetchAddComments(params).then(res => {
      // console.log('添加评论成功:', res);
      // 重置表单
      form.resetFields();
      fetCtxById(id);
    })
  }

  const RenderComment = () => {
    return (
      <div className={styles['comment-area']}>
        <div className={styles['comment-header']}>
          <div className={styles['comment-item']}>
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt=""
            />
            <span className={styles['comment-value']}>
              {records.followUserName}
            </span>
          </div>
          <div className={styles['comment-item']}>
            <span className={styles['comment-label']}>跟进方式: </span>
            <span className={styles['comment-value']}>
              {
                records.followType && maps[records.followType] || '--' 
              }
            </span>
          </div>
          <div className={styles['comment-item']}>
            <span className={styles['comment-label']}>跟进时间: </span>
            <span className={styles['comment-value']}>
              {
                records.followTime && moment(records.followTime).format(DATEFORMAT) || '--'
              }
            </span>
          </div>
          <div className={styles['comment-item']}>
            <span className={styles['comment-label']}>下次跟进时间: </span>
            <span className={styles['comment-value']}>
              {
                records.followTime && moment(records.nextFollowTime).format(DATEFORMAT) || '--'
              }
            </span>
          </div>
        </div>
        <p className={styles['common-ctx']}>
          {records.followDetails || '--'}
        </p>

        {/* 子评论 */}
        
        {
          records.commentList && records.commentList.map(list => (
            <div className={styles['comment-child-list']}>
              <p className={styles['comment-list-pub']}>
                <span className={styles['comment-list-name']}>
                  评论人: {list.commentUserName}
                </span>
                <span className={styles['comment-list-time']}>
                  评论时间: {list.createTime && moment(list.createTime).format(DATETIME)}
                </span>
              </p>
              
              <p>
                {list.commentDetails}
              </p>
            </div>
          ))
        }
        
      </div>
    )
  }

  const CommentCtx = () => (
    <Form
      name="commentForm"
      form={form}
      onFinish={handleSubmitComment}
    >
      <Form.Item
        name="commentDetails"
        rules={[{ required: true, message: '评论内容不能为空'}]}
      >
        <TextArea 
          style={{ width: '100%' }} 
          rows={3} 
          placeholder="请输入评论内容..."
        />
      </Form.Item>
      
      <FormItem style={{ textAlign: 'right' }}>
        <Button
          htmlType="submit"
          type="primary" 
        >
          保存
        </Button>
      </FormItem>
    </Form>
  )

  const CommentWrap = () => {
    return (
      <>
        <RenderComment />
        <Authorized authority={['admin', '9']}>
          <CommentCtx />
        </Authorized>

      </>
    )
  }
  return (
    <PageHeaderWrapper>
      <CustomerInfo customerId={customerId} />
      <Card title="跟进记录">
        <CommentWrap />
      </Card>
    </PageHeaderWrapper>
  )
}

export default CustomerFollowUpProfile;
