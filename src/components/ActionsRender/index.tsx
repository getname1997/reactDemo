import React from 'react';
import {
  GithubFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import { Input } from 'antd';
const ActionsRender: (
  props: any,
) =>
  | any[]
  | [JSX.Element | undefined, JSX.Element, JSX.Element, JSX.Element] = (
  props: any,
) => {
  if (props.isMobile) return [];
  console.log(
    props,
    666,
    document.body.clientWidth,
    props.layout !== 'side' && document.body.clientWidth > 1400,
  );
  return [
    props.layout !== 'side' && document.body.clientWidth > 1400 ? (
      <div
        key="SearchOutlined"
        aria-hidden
        style={{
          display: 'flex',
          alignItems: 'center',
          marginInlineEnd: 24,
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Input
          style={{
            borderRadius: 4,
            marginInlineEnd: 12,
            backgroundColor: 'rgba(0,0,0,0.03)',
          }}
          prefix={
            <SearchOutlined
              style={{
                color: 'rgba(0, 0, 0, 0.15)',
              }}
            />
          }
          placeholder="搜索方案"
          bordered={false}
        />
        <PlusCircleFilled
          style={{
            color: 'var(--ant-primary-color)',
            fontSize: 24,
          }}
        />
      </div>
    ) : undefined,
    <InfoCircleFilled key="InfoCircleFilled" />,
    <QuestionCircleFilled key="QuestionCircleFilled" />,
    <GithubFilled key="GithubFilled" />,
  ];
};
export default ActionsRender;
