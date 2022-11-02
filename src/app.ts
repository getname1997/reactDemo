// 运行时配置
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
import { history } from '@@/core/history';
// import Header from "@/components/header";

export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'admin' };
}
import './app.less';
export const layout = () => {
  return {
    title: '人事管理系统',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    logout: (initialState: any) => {
      history.push('/login');
      console.log('initialState 退出了', initialState);
    },
    // headerRender:Header,
    layout: 'mix',
    menu: {
      locale: false,
      request: async () => {
        console.log('请求菜单');
        return [
          {
            name: '登入页',
            path: '/login',
            // 不展示菜单顶栏
            menuHeaderRender: false,
            // // 不展示顶栏
            headerRender: false,
            // // 不展示页脚
            // footerRender: false,
            // 不展示菜单
            menuRender: false,
            // 隐藏自己和子菜单
            hideInMenu: true,
            component: './login',
          },
          {
            path: '/',
            redirect: '/home',
          },
          {
            name: '首页',
            path: '/home',
            component: './Home',
          },
          {
            name: '权限演示',
            path: '/access',
            routes: [
              {
                path: '/access/sub-page1',
                name: '一级页面',
              },
            ],
          },
          {
            name: ' CRUD 示例',
            path: '/table',
            component: './Table',
          },
        ];
      },
    },
  };
};
// @ts-ignore
export function patchClientRoutes({ routes }) {
  // 在这里可以对路由进行修改
  routes.push({
    path: '/foo',
    name: '454+++54',
    element: '<div>6664</div>',
  });
}
