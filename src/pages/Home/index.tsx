import { SettingDrawer } from '@ant-design/pro-components';
import type { ProSettings } from '@ant-design/pro-layout';
// import styles from './index.less';
import React, { useState } from 'react';
import { Outlet } from 'umi';
const HomePage: React.FC = () => {
  const [pathname] = useState('/list/sub-page/sub-sub-page1');
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    layout: 'side',
  });
  return (
    <div id="test-pro-layout">
      <Outlet></Outlet>
      <SettingDrawer
        pathname={pathname}
        enableDarkTheme
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting);
        }}
        disableUrlParams={false}
      ></SettingDrawer>
    </div>
  );
};

export default HomePage;
