interface apiType {
  [name: string]: string;
}
const user: apiType = {
  login: '/Login/Login',
};

/* 存放api */
const api: apiType = {
  ...user,
};

export default api;
