import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { headers, prod } from '@/core/http.request';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons/lib/icons';

interface UploadImageProps {
  url?: string;
  isDisabled?: boolean;
  setUrl: (url: string) => void;
}

const UpladImage: React.FC<UploadImageProps> = (props) => {

  const {isDisabled, setUrl, url=""} = props;
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(url);

  const getBase64 = (img: Blob, callback: Function) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const beforeUpload = (file: {[key: string]: any}) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片最大2M');
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (infos: {[key: string]: any}) => {
    if (infos.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (infos.file.status === 'done') {
      const {response} = infos.file;
      if (response.status === 0) {
        setUrl(response.data.url);
        // form.setFieldsValue({'idCardUrl': response.data.url});
        message.success('图片上传成功');
      }
      getBase64(infos.file.originFileObj, (u: string) => {
        setLoading(false);
        setImgUrl(u);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">上传</div>
    </div>
  );

  return (
    <Upload
      disabled={isDisabled}
      name="file"
      accept="image/*"
      listType="picture-card"
      showUploadList={false}
      headers={headers()}
      action={
        prod
          // ? '/api/msg-developer/api/api/application/uploadImg' 
          ? '/api/api/base/file/upload'
          : '/api/api/base/file/upload'
      }
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {
        imgUrl ? <img style={{ width: '100px', height: '100px' }} src={imgUrl} alt="avatar" /> : uploadButton
      }
    </Upload>
  );
};

export default UpladImage;