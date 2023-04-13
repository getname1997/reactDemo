import React, { useEffect, useState } from 'react';
import { Table, Button, Typography, Space, Popconfirm } from 'antd';
import { server, api } from '@/request/server';
import EditEnum from '@/pages/EnumerationManagement/commponents/EditEnum';
const EnumTable: React.FC<{
  id: string | undefined;
  data: any[];
  getEnum: (type: string) => Promise<void>;
  tabsData: any;
  getEnumList: () => Promise<void>;
}> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [EditEnumType, setEditEnumType] = useState('add');
  const addEnumType = () => {
    setEditEnumType('add');
    setIsModalOpen(true);
  };
  const editEnumType = () => {
    setEditEnumType('edit');
    setIsModalOpen(true);
  };
  const editEnum = (record: any) => {
    console.log(record);
  };
  const deleteEnum = async (record: any) => {
    let { code } = await server(api.deleteEnum, { id: record.id }, 'DELETE');
    if (code === 200) {
      await props.getEnum(props.id || '');
    }
  };
  const deleteEnumType = async () => {
    let { code } = await server(api.delete, { id: props.id }, 'DELETE');
    if (code === 200) {
      await props.getEnumList();
    }
  };

  const closeEdit = async () => {
    setIsModalOpen(false);
    await props.getEnumList();
  };
  const cancel = () => {};
  const coumns = [
    {
      title: '类型名称',
      dataIndex: 'name',
      width: 120,
      key: 'name',
    },
    {
      title: 'key',
      dataIndex: 'value',
      width: 120,
      key: 'value',
    },
    {
      title: '介绍',
      dataIndex: 'description',
      width: 220,
      key: 'description',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 220,
      render: (_: any, record: any) => {
        return (
          <Space size="middle">
            <Typography.Link onClick={() => editEnum(record)}>
              编辑
            </Typography.Link>
            <Popconfirm
              title="是否删除"
              okText="是"
              cancelText="否"
              onConfirm={() => {
                deleteEnum(record);
              }}
            >
              <Typography.Link type="danger">删除</Typography.Link>
            </Popconfirm>
          </Space>
        );
      },
      key: 'description',
    },
  ];
  useEffect(() => {
    console.log('更新了', props.tabsData);
  }, [props.id]);
  return (
    <div>
      <Space size="middle">
        <Button type="primary" onClick={addEnumType}>
          添加分类
        </Button>
        <Button type="primary" onClick={editEnumType}>
          编辑分类
        </Button>
        <Popconfirm
          title="本操作会删除分类，并且删除分类下的所有枚举"
          onConfirm={deleteEnumType}
          onCancel={cancel}
          okText="确认"
          cancelText="取消"
        >
          <Button type="primary" danger>
            删除本分类
          </Button>
        </Popconfirm>

        <Button type="primary">添加枚举</Button>
      </Space>
      <Table dataSource={props.data} columns={coumns} rowKey="id" />
      <EditEnum
        type={EditEnumType}
        tabsData={props.tabsData}
        isModalOpen={isModalOpen}
        close={closeEdit}
      ></EditEnum>
    </div>
  );
};

export default EnumTable;
