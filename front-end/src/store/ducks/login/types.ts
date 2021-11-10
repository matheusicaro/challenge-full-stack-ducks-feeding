import { AnyAction } from 'redux';

export enum Types {
  LOGOUT = '@auth/LOGOUT',
  UPDATE_USER = '@auth/UPDATE_USER',
  LOAD_REQUEST = '@auth/LOAD_RESQUEST',
  LOAD_SUCCESS = '@auth/LOAD_SUCCESS',
  LOAD_FAILURE = '@auth/LOAD_FAILURE',
}

export type User = {
  email: string;
  name: string;
};

export type State = {
  readonly authenticated: boolean;
  readonly sessionExpiresAt: number | null;
  readonly accessDenied: boolean;
  readonly user: User | null;
  readonly loading: boolean;
  readonly error: boolean;
};

export type Payload = {
  authenticated: boolean;
  user: User;
  accessDenied: boolean;
  tokenExpireIn: number;
};

export interface PayloadLoadRequest extends AnyAction {
  payload: {
    name: string;
    email: string;
    password: string;
  };
}

export interface Action extends AnyAction {
  payload: Payload;
}
