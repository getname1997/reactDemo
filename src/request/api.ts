interface apiType {
  [name: string]: string;
}
const user: apiType = {
  login: '/Login/Login',
};

const article: apiType = {
  createArticle: '/posts/Create', // 创建文章
};

/* 存放api */
const api: apiType = {
  ...user,
  ...article,
};

export default api;
