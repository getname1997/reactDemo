import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Tabs } from 'antd';
import { server, api } from '@/request/server';
import EnumTable from './commponents/enumTable';
import type { TabsProps } from 'antd';
const EnumerationManagement: React.FC = () => {
  const [EnumList, setEnumList] = useState<TabsProps['items']>([]);
  const [tableId, setTableId] = useState<string>();
  const getEnumList = () => {
    server(api.getEnumList).then((res) => {
      if (res.code === 200) {
        let data = res.data.map((item: any) => {
          return {
            key: item.id,
            label: item.name,
          };
        });
        setEnumList(data);
        setTableId(data[0].key);
      }
    });
  };
  const onTabClick = (key: string) => {
    setTableId(key);
  };
  useEffect(() => {
    getEnumList();
  }, []);

  return (
    <div className={styles.enumerationManagement}>
      <div className={styles.enumerationManagement_Left}>
        <Tabs
          tabPosition="left"
          items={EnumList}
          onTabClick={onTabClick}
        ></Tabs>
      </div>
      <EnumTable id={tableId}></EnumTable>
    </div>
  );
};

export default EnumerationManagement;
