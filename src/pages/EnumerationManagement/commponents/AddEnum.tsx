import React, { useState, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { server, api } from '@/request/server';

const EditEnum: React.FC<{
  isModalOpen: boolean;
  type: string;
  close: () => void;
  tabsData: any;
}> = (props) => {
  const [modalTitle, setModalTitle] = useState('添加枚举');
  const [form] = Form.useForm();
  const [FormData, setFormData] = useState({
    name: '',
    value: '',
    type: '',
    type_id: '',
    description: '',
  });
  const handleOk = () => {
    form.submit();
  };
  const onFinishFailed = () => {};
  useEffect(() => {
    if (props.type === 'edit') {
      setFormData(props.tabsData);
      setModalTitle('编辑枚举');
      setTimeout(() => {
        form.resetFields();
      }, 100);
    } else {
      setModalTitle('添加枚举');
      setFormData({
        name: '',
        value: '',
        type: props.tabsData.name,
        description: '',
        type_id: props.tabsData.type_id,
      });
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
        params = {
          ...values,
          type_id: props.tabsData.type_id,
          id: props.tabsData.id,
        };
        res = await server(api.addEnum, params, 'post');
        console.log(res);
        break;
      case 'edit':
        params = {
          ...values,
          type_id: props.tabsData.type_id,
          id: props.tabsData.id,
        };
        res = await server(api.updateEnum, params, 'put');
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
            label="枚举名称"
            name="name"
            rules={[{ required: true, message: '请输入枚举名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="枚举值"
            name="value"
            rules={[{ required: true, message: '请输入枚举值' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="分类"
            name="type"
            rules={[{ required: true, message: '请选择分类' }]}
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
