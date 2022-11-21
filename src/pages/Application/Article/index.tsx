import React from 'react';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { history } from 'umi';
type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};
const editBlog = (id: number) => {
  console.log(id);
  history.push({
    pathname: '/application/organization',
    search: `?id=${id}`,
  });
};
const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '作者',
    dataIndex: 'author',
    width: 150,
  },

  {
    title: '创建时间',
    dataIndex: 'create_time',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record) => [
      <a
        key="editable"
        onClick={() => {
          editBlog(record.id);
        }}
      >
        编辑
      </a>,
    ],
  },
];
import { server, api } from '@/request/server';

const getTableList = async (params: any, dara: any) => {
  console.log(params, dara);
  let { data } = await server(api.getArticleList);
  console.log(data);
  return {
    data: data.list,
    // success 请返回 true，
    // 不然 table 会停止解析数据，即使有数据
    success: true,
    // 不传会使用 data 的长度，如果是分页一定要传
    total: data.count,
  };
};
const Article: React.FC = () => {
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      rowKey="id"
      request={getTableList}
    ></ProTable>
  );
};

export default Article;
