import React, { useState } from 'react';
import { Upload, message } from 'antd';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// @ts-ignore
// 将上传的图片插入到编辑器中
import { ContentUtils } from 'braft-utils'
// import { ImageUtils } from 'braft-finder'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import { UploadOutlined } from '@ant-design/icons';
// import { FormInstance } from 'antd/lib/form/Form';
import { prod, headers } from '@/core/http.request';

// import { BASEURL } from '@/core/api';

// import { Upload } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

interface BraftEditorComponentProps {
  value: string;
  // form: FormInstance,
  // fieldName: string;
  onChange: (value: string) => void;
}

const BraftEditorComponent: React.FC<BraftEditorComponentProps> = (props) => {

  // const {value, form, fieldName} = props;
  const {value, onChange} = props;
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(value));

  // const uploadHandler = (param: {[key: string]: any}) => {
  //   if (!param.file) {
  //     return false
  //   }
  //   console.log(param);
  //   // setEditorState(ContentUtils.insertMedias(editorState, [{
  //   //   type: 'IMAGE',
  //   //   url: URL.createObjectURL
  //   // }]));
  //   // return false;
  // }

  // 上传之前进行处理
  const handleBeforeUpload = (file: {[key: string]: any}) => {
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

  // const getBase64 = (img: Blob, callback: Function) => {
  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => callback(reader.result));
  //   reader.readAsDataURL(img);
  // }

  const handleChange = (infos: {[key: string]: any}) => {

    if (infos.file.status === 'done') {
      const {response} = infos.file;
      if (response.status === 0) {
        // form.setFieldsValue({'idCardUrl': response.data.url});
        message.success('图片上传成功');

        setEditorState(ContentUtils.insertMedias(editorState, [
          {
            type: 'IMAGE',
            url: response.data.url
          }
        ]))
      }
      // getBase64(infos.file.originFileObj, (url: string) => {
      //   debugger;
      //   setEditorState(ContentUtils.insertMedias(editorState, [
      //     {
      //       type: 'IMAGE',
      //       url: infos.response.data[0].fileUrl
      //     }
      //   ]))
      // });
    }
  }

  const extendControls = [
    {
      key: 'antd-uploader',
      type: 'component',
      component: (
        <Upload
          name="file"
          accept="image/*"
          action={
            prod
              ? '/api/msg-developer/api/application/uploadImg' 
              : '/api/base/file/upload'
          }
          showUploadList={false}
          headers={headers()}
          beforeUpload={handleBeforeUpload}
          onChange={handleChange}
        >
          {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
          <button type="button" className="control-item button upload-button" data-title="插入图片">
            <UploadOutlined />
          </button>
        </Upload>
      )
    }
  ]
  // 添加需要展示的扩展控件

  // const handleEditorChange = (value) => {
  //   seteditorState(value);
  // }

  // const handleSubmitContent = async () => {
  //   const htmlCtx = editorState.toHTML();
  //   // const result = await saveEditorContent(htmlCtx)
  // }

  // 内容变化时
  const handleEditorChange = (values: any) => {
    
    setEditorState(values);
    // console.log(values.toHTML());
    onChange(values.toHTML());
  }

  const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator' ]

  return (
    // @ts-ignore
    <BraftEditor
      className="my-editor"
      value={editorState}
      controls={controls}
      placeholder="请输入产品描述信息"
      extendControls={extendControls}
      contentStyle={{ height: 160, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }}
      onChange={handleEditorChange}
    />
  )
}

export default BraftEditorComponent;
