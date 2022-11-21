import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { WaterMark } from '@ant-design/pro-components';
import { server, api } from '@/request/server';
import SimpleMdeReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import SimpleMDE from 'easymde';
import EasyMDE from 'easymde';
import { useSearchParams } from 'umi';
import SaveArticle from './components/SaveArticle';

const Organization: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState('');
  const [blogId, setBlogId] = useState<number>(0);
  const [blogData, setBlogData] = useState<any>({});
  const getBlogData = (id: string) => {
    setBlogId(Number(id));
    server(api.getBlog, { id }).then((res) => {
      setValue(res.data.content);
      setBlogData(res.data);
    });
  };
  useEffect(() => {
    if (searchParams.get('id')) {
      getBlogData(searchParams.get('id') as string);
    }
  }, []);
  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      minHeight: '700px',
      spellChecker: false,
      toolbar: [
        {
          name: 'bold',
          action: EasyMDE.toggleBold,
          className: 'fa fa-bold',
          title: '加粗',
        },
        'italic',
        'heading',
        'heading-1',
        '|',
        'quote',
        'code',
        'table',
        'horizontal-rule',
        'unordered-list',
        'ordered-list',
        '|',
        'link',
        'image',
        '|',
        'preview',
      ],
    } as SimpleMDE.Options;
  }, []);

  return (
    <div>
      <SaveArticle
        content={value}
        blogId={blogId}
        blogData={blogData}
      ></SaveArticle>
      <WaterMark content="白色月光">
        <SimpleMdeReact
          value={value}
          onChange={onChange}
          options={autofocusNoSpellcheckerOptions}
        />
      </WaterMark>
    </div>
  );
};

export default Organization;
