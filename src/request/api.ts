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
const upload: apiType = {
  upload: '/upload/up', //通用上传
};

const enumList: apiType = {
  createType: '/enum/createType', // 创建枚举分类
  getEnumList: '/enum/getEnumType', // 获取枚举分类列表
  delete: '/enum/deleteType', // 获取枚举分类列表
  updateEnumType: '/enum/updateEnumType', // 更新枚举分类
};

/* 存放api */
const api: apiType = {
  ...user,
  ...article,
  ...upload,
  ...enumList,
};

export default api;
