import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Modal, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { prod, headers } from '@/core/http.request';
import { StateType } from '../../model';
import { fetchDelPicById, fetchSavePicByCustomerId } from '../server';

interface AddOrEditPicIProps {
  customerId?: StateType['customerId'];
  picInfo: Array<{[key: string]: any}>;
}

export interface PicIProps {
  id?: string;
  uid: string;
  name: string;
  status: string;
  url: string;
}
const AddOrEditPic: React.FC<AddOrEditPicIProps> = (props) => {

  const { customerId, picInfo = [] } = props;

  const [fileList, setFileList] = useState<Array<PicIProps>>([]);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<boolean>(false);
  const [previewTitle, setPreviewTitle] = useState<string>('');

  useEffect(() => {
    if (picInfo && picInfo.length) {
      const result = picInfo.map(item => {
        return {
          id: item.id,
          uid: item.id,
          name: item.picUrl.substring(item.picUrl.lastIndexOf('/') + 1),
          status: 'done',
          url: item.picUrl
        }
      }) || [];
      setFileList(fileList.concat(result));
    }
  }, [picInfo]);

  const beforeUpload = (file: {[key: string]: any}) => {
    if (!customerId) {
      message.info('请先添加客户信息');
      return;
    };
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片最大2M');
    }
    // @ts-ignore
    return isJpgOrPng && isLt2M;
  }
  
  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  // @ts-ignore
  const handleChange = ({ fileList, file }) => {
    setFileList(fileList);
    if (file.status === 'done') {
      const {response} = file;
      if (response.status === 0) {
        // form.setFieldsValue({'idCardUrl': response.data.url});
        // 获取图片的url并调用保存接口
        const {url} = response.data;
        fetchSavePicByCustomerId({
          picUrl: url,
          customerId
        }).then(res => {
          if (res.status === 0) {
            // 获取最后一个文件
            const last = fileList[fileList.length - 1];
            const {data} = res;
            last['id'] = data.id;
            setFileList(fileList);
            message.success(res.info);
          }
        })
       
      }
    }
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  }

  const handleRemove = (file) => {
    if (file.id) {
      Modal.confirm({
        title: `确定要删除${file.name}吗?`,
        icon: <ExclamationCircleOutlined />,
        okText: '确认',
        cancelText: '取消',
        onOk () {
          fetchDelPicById({
            id: file.id
          }).then(res => {
            if (res.status === 0) {
              message.success(res.info);
              const index = fileList.findIndex(item => +item.id === +file.id);
              if (index > -1) {
                fileList.splice(index, 1);
                setFileList([...fileList]);
                return true;
              }
            }
          })
        },
      });
    }
    return false;
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  
  return (
    <>
        <Upload
          name="file"
          accept="image/*"
          action={
            prod
              ? '/api/api/msg-developer/api/application/uploadImg' 
              : '/api/api/base/file/upload'
          }
          // @ts-ignore
          beforeUpload={beforeUpload}
          headers={headers()}
          listType="picture-card"
          // @ts-ignore
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={handleRemove}
        >
          {uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
  );
};

// export default AddOrEditPic;
export default connect(
  ({
    customerCenter
  }: {
    customerCenter: StateType
  }) => ({
    customerId: customerCenter.customerId,
  })
)(
  AddOrEditPic
);
