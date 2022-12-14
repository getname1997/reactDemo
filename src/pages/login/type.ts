type loginForm = {
  username: string;
  password: string;
  pwd?: string;
  autoLogin: boolean;
};
type LoginType = 'phone' | 'account';

export { loginForm, LoginType };
