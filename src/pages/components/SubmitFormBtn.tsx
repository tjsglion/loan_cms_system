import React from 'react';
import { Button } from 'antd';

interface SubmitFormBtnProps {
  onReset?: () => void;
}

const SubmitFormBtn: React.FC<SubmitFormBtnProps> = (props) => {

  const {onReset} = props;
  return (
    <>
      <Button htmlType="submit" type="primary" >保存</Button>
      <Button style={{ marginLeft: '10px'}} onClick={() => onReset && onReset()}>重置</Button>
    </>
  )
}

export default SubmitFormBtn;
