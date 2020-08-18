import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Avatar, Input, Button, Form } from 'antd';
import { fetchFollowById } from '../server';
import CustomerInfo from '../../components/CustomerInfo';
import styles from './index.less';

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

const CustomerFollowUpProfile: React.FC<CustomerFollowUpProfileProps> = (props) => {

  const {location: { query: { id, customerId} }} = props;
  const [form] = Form.useForm();
  useEffect(() => {
    // 获取用户详情
    if (id) {
      fetchFollowById({id}).then(res => {
        console.log('客户跟进详情', res);
      })
    }
  }, [id]);

  const handleSubmitComment = (values: {[key: string]: any}) => {
    console.log('提交的评论内容:', values);
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
            <span className={styles['comment-value']}>张三</span>
          </div>
          <div className={styles['comment-item']}>
            <span className={styles['comment-label']}>跟进方式: </span>
            <span className={styles['comment-value']}>电话</span>
          </div>
          <div className={styles['comment-item']}>
            <span className={styles['comment-label']}>跟进时间: </span>
            <span className={styles['comment-value']}>2020-07-05</span>
          </div>
          <div className={styles['comment-item']}>
            <span className={styles['comment-label']}>下次跟进时间: </span>
            <span className={styles['comment-value']}>2020-07-08</span>
          </div>
        </div>
        <p className={styles['common-ctx']}>
          这是跟进内容
        </p>
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
        name="content"
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
        <CommentCtx />
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
