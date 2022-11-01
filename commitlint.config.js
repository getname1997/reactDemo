/*
  规范commit日志
  https://commitlint.js.org
*/

const types = [
    'build', // 主要目的是修改项目构建系统（例如glup，webpack，rollup的配置等）的提交
    'ci', // 修改项目的持续集成流程（Kenkins、Travis等）的提交
    'chore', // 构建过程或辅助工具的变化
    'docs', // 文档提交（documents）
    'feat', // 新增功能（feature）
    'fix', // 修复 bug
    'pref', // 性能、体验相关的提交
    'refactor', // 代码重构
    'revert', // 回滚某个更早的提交
    'style', // 不影响程序逻辑的代码修改、主要是样式方面的优化、修改
    'test', // 测试相关的开发,
  ],
  typeEnum = {
    rules: {
      'type-enum': [2, 'always', types],
    },
    value: () => {
      return types;
    },
  };

module.exports = {
  // ↓忽略包含init的提交消息
  ignores: [(commit) => commit.includes('init')],
  // ↓按照传统消息格式来验证
  extends: ['@commitlint/config-conventional'],
  // ↓自定义提交消息规则
  rules: {
    // ↓type的类型
    'type-enum': typeEnum.rules['type-enum'],
    // ↓body以空白行开头
    'body-leading-blank': [2, 'always'],
    // ↓footer以空白行开头
    'footer-leading-blank': [1, 'always'],
    // ↓header的最大长度
    'header-max-length': [2, 'always', 108],
    // ↓subject为空
    'subject-empty': [2, 'never'],
    // ↓type为空
    'type-empty': [2, 'never'],
  },
};
