import React, { useEffect } from 'react';
import { Table } from 'antd';
const EnumTable: React.FC<{ id: string | undefined }> = (props) => {
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const coumns = [
    {
      title: '类型',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '名称',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'key',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  useEffect(() => {
    console.log('切换了', props);
  }, [props.id]);
  return <Table dataSource={dataSource} columns={coumns} />;
};

export default EnumTable;
