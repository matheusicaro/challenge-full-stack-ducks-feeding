import { User } from '../store/ducks/login/types';

import StorageService from './storage';
import { AuthToken } from './types';

const TOKEN_KEY = 'app_control_token';
const USER_KEY = 'app_control_user';

/**
 * Function to get token stored in storage service
 *
 * @return {AuthToken}
 */
const getTokenInLocalStorage = (): AuthToken | null => {
  try {
    return StorageService.get<AuthToken>(TOKEN_KEY);
  } catch (err) {
    StorageService.delete(TOKEN_KEY);
    return null;
  }
};

const isTokenExpired = (token: AuthToken) => {
  return token && new Date(token.expires_in).getTime() < Date.now();
};

/**
 * Method responsible for returning validation if token stores in local store is valid and not expired
 *
 * @return {boolean}
 */
const isAuthenticated = (): boolean => {
  const token = getTokenInLocalStorage();

  const isAuthenticated = token !== null && !!token.expires_in && !isTokenExpired(token);

  if (!isAuthenticated) StorageService.delete(TOKEN_KEY);

  return isAuthenticated;
};

const getToken = (): string | undefined => getTokenInLocalStorage()?.token;
const getTokeneExpirationTime = (): number | null => getTokenInLocalStorage()?.expires_in || null;

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
  getTokeneExpirationTime,
  logout,
  saveToken,
  saveUser,
};

export default AuthService;
