import { Button, Modal, message, Form, Input } from 'antd';
import React, { useState } from 'react';
import { server, api } from '@/request/server';
import styles from '@/pages/Application/organization/organization.less';
const SaveArticle: React.FC<{
  content: string;
  blogId: number;
  blogData: any;
}> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    if (props.blogId) {
      console.log(props.blogId, 666);
      let params = {
        title: props.blogData.title,
        author: props.blogData.author,
        content: props.content,
        type: 1,
        id: props.blogId,
      };
      server(api.updateArticle, params, 'put').then((res) => {
        console.log(res);
      });

      return;
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
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
