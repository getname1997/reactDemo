import React, { useState, useCallback, useMemo } from 'react';
import { WaterMark } from '@ant-design/pro-components';
import styles from './organization.less';
import SimpleMdeReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import SimpleMDE from 'easymde';
import EasyMDE from 'easymde';
import SaveArticle from './components/SaveArticle';
const Organization: React.FC = () => {
  const [value, setValue] = useState('');
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
  const exdown = () => {
    console.log(value);
    let uri =
      'data:application/vnd.ms-excelcharset=utf-8,' + encodeURIComponent(value);
    let link = document.createElement('a');
    link.href = uri;
    let myDate = new Date();
    let time = myDate.toLocaleDateString().split('/').join('-');
    link.download = '历史' + time + '.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div>
      <SaveArticle content={value}></SaveArticle>
      <WaterMark content="白色月光">
        <SimpleMdeReact
          value={value}
          onChange={onChange}
          options={autofocusNoSpellcheckerOptions}
        />
        <button type="button" onClick={exdown} className={styles.organization}>
          导出
        </button>
      </WaterMark>
    </div>
  );
};

export default Organization;
