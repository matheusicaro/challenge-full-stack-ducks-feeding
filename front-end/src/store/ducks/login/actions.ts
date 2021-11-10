import { action } from 'typesafe-actions';

import { Types, Payload } from './types';

/**
 * Actions change auth ip state in store
 *
 * logout: request action to clean state in logout action
 * loadRequest: status update request in store in common action where user tries to login
 * loadSuccess: request action of failure to obtain the user oauth info
 * loadFailure: request to report failure in requesting oauth tokne
 */
export const logout = () => action(Types.LOGOUT);
export const loadRequest = (email: string, password: string) => action(Types.LOAD_REQUEST, { email, password });
export const loadSuccess = (data: Payload) => action(Types.LOAD_SUCCESS, data);
export const loadFailure = () => action(Types.LOAD_FAILURE);
