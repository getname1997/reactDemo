import { Button, Modal, message, Form, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { server, api } from '@/request/server';
import request from '@/request/request';
import styles from '@/pages/Application/organization/organization.less';
const SaveArticle: React.FC<{
  content: string;
  blogId: number;
  blogData: any;
}> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData] = useState({
    title: '',
    author: '',
  });
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      title: props.blogData.title,
      author: props.blogData.author,
    });
  }, [props.blogData]);
  const showModal = () => {
    console.log(props.blogData, formData);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values: { title: string; author: string }) => {
    let params: any = {
      title: values.title,
      author: values.author,
      content: props.content,
      type: 1,
      id: null,
    };
    if (props.blogId) {
      params.id = props.blogId;
      server(api.updateArticle, params, 'put').then((res) => {
        console.log(res);
        message.success('更新成功');
        setIsModalOpen(false);
      });
      return;
    }
    let blob = new Blob([props.content], { type: 'application/json' });
    let file = new File([blob], encodeURI(values.title + '.md'), {
      type: 'application/json',
    });
    request({
      url: api.upload,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: {
        file,
        ...params,
        remarks: '备注',
      },
    }).then((res) => {
      console.log(res, '看看那上次韭菜');
    });

    // isModalOpen
    // server(api.createArticle, params, 'post').then((res) => {
    //   if (res.code === 200) {
    //     message.success('保存成功');
    //     setIsModalOpen(false);
    //     return true;
    //   }
    // });
  };
  const onFinishFailed = () => {};
  const exdown = () => {
    let uri =
      'data:application/vnd.ms-excelcharset=utf-8,' +
      encodeURIComponent(props.content);
    let link = document.createElement('a');
    link.href = uri;
    let myDate = new Date();
    let time = myDate.toLocaleDateString().split('/').join('-');
    link.download = '文章' + time + '.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        保存
      </Button>

      <Button onClick={exdown} className={styles.organization}>
        导出
      </Button>
      <Modal
        footer={null}
        title="保存文章"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="保存文章"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="文章名称"
            name="title"
            rules={[{ required: true, message: '文章名称!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="作者"
            name="author"
            rules={[{ required: true, message: '作者' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
//txdlf@163.com
export default SaveArticle;
