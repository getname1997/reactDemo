import React from 'react';
import { Outlet } from 'umi';
const Application: React.FC = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default Application;
