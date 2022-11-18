import { Button, Modal, message, Form, Input } from 'antd';
import React, { useState } from 'react';
import { server, api } from '@/request/server';
const SaveArticle: React.FC<{ content: string }> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    console.log(props);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    message.warn(props.content);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values: { title: string; author: string }) => {
    let params = {
      title: values.title,
      author: values.author,
      content: props.content,
      type: 1,
    };

    server(api.createArticle, params, 'post').then((res) => {
      console.log(res);
      if (res.Code === '10000') {
        message.success('保存成功');
        return true;
      }
    });
  };
  const onFinishFailed = () => {};

  return (
    <>
      <Button type="primary" onClick={showModal}>
        保存
      </Button>
      <Modal
        footer={null}
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="保存文章"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SaveArticle;
