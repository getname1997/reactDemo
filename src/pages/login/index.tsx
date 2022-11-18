import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message } from 'antd';
import styles from './index.less';
import type { LoginType, loginForm } from './type';
import React, { useState } from 'react';
import { history, useModel } from 'umi';
import { server, api } from '@/request/server';
import commonStorage from '@/utils/commonStorage';
import nengchengSvg from '@/assets/img/img.png';
const HomePage: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { name, setName } = useModel('global');
  const [loginType] = useState<LoginType>('account');
  const onSubmit = async (data: loginForm) => {
    server(api.login, data, 'post').then((res) => {
      console.log(res);
      if (res.Code === '10000') {
        commonStorage.set('token', res.Data.Token);
        setName(data.loginName);
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
      }
    });
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
          {loginType === 'account' && (
            <>
              <ProFormText
                name="loginName"
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
                name="pwd"
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
