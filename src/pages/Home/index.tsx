// import Guide from '@/components/Guide';
// import { trim } from '@/utils/format';
// import { PageContainer } from '@ant-design/pro-components';
// import { useModel } from '@umijs/max';
// import styles from './index.less';
import React from 'react';
import { Outlet } from 'umi';
const HomePage: React.FC = () => {
  // const { name } = useModel('global');
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default HomePage;
