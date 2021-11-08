import { User } from '../store/ducks/login/types';

import StorageService from './storage';
import { AuthToken } from './types';

const TOKEN_KEY = 'app_control_token';
const USER_KEY = 'app_control_user';

const getTokenInLocalStorage = (): AuthToken | null => {
  try {
    return StorageService.get<AuthToken>(TOKEN_KEY);
  } catch (err) {
    StorageService.delete(TOKEN_KEY);
    return null;
  }
};

const isTokenExpired = (token: AuthToken) => token && new Date(token.expires_in).getTime() < Date.now();

const isAuthenticated = (): boolean => {
  const token = getTokenInLocalStorage();

  if (token === null) return false;

  return !!token.expires_in && !isTokenExpired(token);
};

const getToken = (): string | undefined => getTokenInLocalStorage()?.token;

const getUser = (): User | null => {
  try {
    return StorageService.get<User>(USER_KEY);
  } catch (err) {
    StorageService.delete(USER_KEY);
    return null;
  }
};

const logout = (): void => {
  StorageService.delete(TOKEN_KEY);
};

const saveToken = (token: AuthToken): void => {
  StorageService.save<AuthToken>(TOKEN_KEY, token);
};

const saveUser = (user: User): void => {
  StorageService.save<User>(USER_KEY, user);
};

const AuthService = {
  isAuthenticated,
  getUser,
  getToken,
  logout,
  saveToken,
  saveUser,
};

export default AuthService;
