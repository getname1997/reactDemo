import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '人事系统',
  },
  /**
   * UMI_ENV 为环境变量，可通过 .env 修改
   *
   * */
  define: {
    'process.env.UMI_ENV': process.env.UMI_ENV,

    'process.env.FLUTTER_STORAGE_BASE_URL':
      process.env.FLUTTER_STORAGE_BASE_URL,
  },
  hash: true,
  routes: [
    {
      name: '登入页',
      path: '/login',
      // 不展示菜单顶栏
      menuHeaderRender: false,
      // 不展示顶栏
      headerRender: false,
      // 不展示页脚
      footerRender: false,
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
      path: '/home',
      redirect: '/home/workbench',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
      routes: [
        {
          name: '工作台',
          path: '/home/workbench',
          component: './Home/workbench/WorkBench',
        },
        {
          name: '日程待办',
          path: '/home/schedule',
          component: './Home/schedule/Schedule',
        },
      ],
    },
    {
      path: '/access/sub-page1',
      name: '一级页面',
      component: './Access',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/planmanage': {
      target: 'http://10.10.0.123:8088/',
      changeOrigin: true,
      // 'pathRewrite': { '^/api' : '' },
    },
  },
});
