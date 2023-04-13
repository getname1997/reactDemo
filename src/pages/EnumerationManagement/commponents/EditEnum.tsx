import React, { useState, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { server, api } from '@/request/server';

const EditEnum: React.FC<{
  isModalOpen: boolean;
  type: string;
  close: () => void;
  tabsData: any;
}> = (props) => {
  const [modalTitle, setModalTitle] = useState('添加分类');
  const [form] = Form.useForm();
  const [FormData, setFormData] = useState({ name: '', description: '' });
  const handleOk = () => {
    form.submit();
  };
  const onFinishFailed = () => {};
  useEffect(() => {
    if (props.type === 'edit') {
      setFormData(props.tabsData);
      setModalTitle('编辑分类');
      setTimeout(() => {
        form.resetFields();
      }, 100);
    } else {
      setModalTitle('添加分类');
      setFormData({ description: '', name: '' });
      setTimeout(() => {
        form.resetFields();
      }, 100);
    }
  }, [props.isModalOpen]);
  const onFinish = async (values: any) => {
    let params;
    let res;
    switch (props.type) {
      case 'add':
        res = await server(api.createType, values, 'post');
        console.log(res);
        break;
      case 'edit':
        params = {
          ...values,
          id: props.tabsData.id,
        };
        res = await server(api.updateEnumType, params, 'put');
        break;
      default:
        console.log('未支持');
        break;
    }
    if (res.code === 200) {
      props.close();
    }
  };

  const handleCancel = () => {
    form.resetFields(); //重置
    props.close();
  };
  return (
    <>
      <Modal
        forceRender
        title={modalTitle}
        open={props.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={FormData}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="类型分类"
            name="name"
            rules={[{ required: true, message: '请输入项目分类名称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="简介" name="description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditEnum;
