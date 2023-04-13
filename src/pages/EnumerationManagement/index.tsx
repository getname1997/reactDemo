import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Tabs } from 'antd';
import { server, api } from '@/request/server';
import EnumTable from './commponents/enumTable';
const EnumerationManagement: React.FC = () => {
  const [EnumList, setEnumList] = useState<any[]>([]);
  const [tableId, setTableId] = useState<string>();
  const [tableData, setTableData] = useState<any[]>([]);
  const [tabsData, setTabsData] = useState({
    key: '',
    name: '',
  });
  const [activeKey, setActiveKey] = useState('');
  const getEnum = async () => {
    let res = await server(api.getEnum, { id: activeKey });
    if (res.code === 200) {
      setTableData(res.data);
    }
  };

  const getEnumList = async () => {
    let res = await server(api.getEnumList);
    if (res.code === 200) {
      let data = res.data.map((item: any) => {
        return {
          key: item.id,
          label: item.name,
          description: item.description,
          id: item.id,
          name: item.name,
        };
      });
      await getEnum();
      if (activeKey === '') {
        setActiveKey(data[0].id);
        setTabsData(data[0]);
        setTableId(data[0].id);
      } else {
        let u = data.find((item: { id: string }) => item.id === activeKey);
        setTabsData(u);
      }
      setEnumList(data);
    }
  };

  const onTabClick = async (key: string) => {
    setActiveKey(key);
    setTableId(key);
    setTabsData(
      EnumList?.find((item) => item.key === key) || { key: '', name: '' },
    );
    await getEnum();
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
          activeKey={activeKey}
          onTabClick={onTabClick}
        ></Tabs>
      </div>
      <EnumTable
        id={tableId}
        getEnum={getEnum}
        getEnumList={getEnumList}
        tabsData={tabsData}
        data={tableData}
      ></EnumTable>
    </div>
  );
};

export default EnumerationManagement;
