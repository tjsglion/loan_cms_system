import React from 'react';
import { Button, Upload } from 'antd';

interface UploadComponentProps {
  name: string;
  url: string; // 上传url
  accept?: string; // 接收数据类型
  iconType?: string; // 图标类型
  label: string; // 按钮文件
  showUploadList?: boolean;
  // beforeChange
}

const UploadComponent: React.FC<UploadComponentProps> = (props) => {

  const { name = "file", url, accept, iconType, label, showUploadList = true } = props;
  return (
    <Upload
      name={name}
      action={url}
      accept={accept}
      showUploadList={showUploadList}
    >
      <Button icon={iconType}>{label}</Button>
    </Upload>
  )
}

export default UploadComponent;
