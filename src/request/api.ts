interface apiType {
  [name: string]: string;
}
const user: apiType = {
  login: '/auth/login',
};

const article: apiType = {
  getBlogList: '/posts/getBlogList',
  createArticle: '/posts/Create', // 创建文章
  getArticleList: '/posts/findAll', // 获取文章列表
  getBlog: '/posts/getBlog', // 获取文章详情
  updateArticle: '/posts/update', // 更新文章
  deleteArticle: '/posts/blog', // 删除文章
};

/* 存放api */
const api: apiType = {
  ...user,
  ...article,
};

export default api;
