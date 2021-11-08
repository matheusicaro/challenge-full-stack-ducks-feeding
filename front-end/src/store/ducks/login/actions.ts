import { action } from 'typesafe-actions';

import { Types, Payload } from './types';

export const logout = () => action(Types.LOGOUT);
export const loadRequest = (email: string, password: string) => action(Types.LOAD_REQUEST, { email, password });
export const loadSuccess = (data: Payload) => action(Types.LOAD_SUCCESS, data);
export const loadFailure = () => action(Types.LOAD_FAILURE);
