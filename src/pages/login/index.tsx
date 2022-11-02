import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message, Tabs } from 'antd';
import styles from './index.less';
type loginForm = {
  username: string;
  password: string;
  autoLogin: boolean;
};
type LoginType = 'phone' | 'account';
import React, { useState } from 'react';
import { history, useModel } from 'umi';
import nengchengSvg from '@/assets/img/img.png';
const HomePage: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { name, setName } = useModel('global');
  const [loginType, setLoginType] = useState<LoginType>('account');
  const onSubmit = async (data: loginForm) => {
    setName(data.username);
    console.log(data, process.env, 555, name);
    message.success('登录成功');
    setInitialState(() => {
      return {
        ...initialState,
        name: '123',
        six: '男',
      };
    });
    history.push('/');
    return true;
  };
  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <LoginForm
          className={styles.loginFormDom}
          logo={nengchengSvg}
          title="能诚人资系统"
          onFinish={onSubmit}
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'用户名: admin'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder={'密码: 1'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default HomePage;
