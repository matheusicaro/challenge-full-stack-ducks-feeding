import { put } from 'redux-saga/effects';

import ApiService from '../../../services/api.service';
import AuthService from '../../../services/auth';
import { AuthToken } from '../../../services/types';

import { loadSuccess, loadFailure } from './actions';
import { PayloadLoadRequest, User } from './types';

export function* loadAuth(action: PayloadLoadRequest) {
  const user = { email: action.payload.email, name: action.payload.name };

  try {
    const response = yield ApiService.login(action.payload.email, action.payload.password);

    const status = response ? response.status : null;

    if (status === 200) {
      const data: AuthToken = response?.data;
      user.name = data.user_name;

      AuthService.saveToken(data);
      AuthService.saveUser(user);

      yield put(loadSuccess({ authenticated: true, accessDenied: false, user }));
    } else if (isNotAuthorized(status)) {
      yield put(loadingSuccessWithUserNotAuthorized(user));
    } else {
      yield put(loadFailure());
    }
  } catch (err) {
    if (err && isNotAuthorized(err.status)) yield put(loadingSuccessWithUserNotAuthorized(user));

    yield put(loadFailure());
  }
}

const isNotAuthorized = (staus: number) => staus === 401 || staus === 400;

const loadingSuccessWithUserNotAuthorized = (user: User) => loadSuccess({ authenticated: false, accessDenied: true, user });
