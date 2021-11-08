import { Reducer } from 'redux';

import AuthService from '../../../services/auth';

import { Types, State, Action } from './types';

const INITIAL_STATE: State = {
  authenticated: AuthService.isAuthenticated(),
  user: AuthService.getUser(),
  accessDenied: false,
  loading: false,
  error: false,
};

const AuthReducer: Reducer<State, Action> = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case Types.LOGOUT:
      return { ...INITIAL_STATE, authenticated: false };
    case Types.LOAD_REQUEST:
      return loadRequest(state);
    case Types.UPDATE_USER:
      return updateUserLogged(state, action);
    case Types.LOAD_SUCCESS:
      return loadSuccess(state, action);
    case Types.LOAD_FAILURE:
      return loadFailure(state);
    default:
      return state;
  }
};

/*
 * Handlers
 */
const loadSuccess = (state: State, action: Action): State => ({
  ...state,
  loading: false,
  error: false,
  ...action.payload,
  user: {
    ...action.payload.user,
  },
});

const updateUserLogged = (state: State, action: Action): State => ({
  ...state,
  user: action.payload.user,
});

const loadRequest = (state: State): State => ({
  ...state,
  loading: true,
  error: false,
});

const loadFailure = (state: State): State => ({
  ...state,
  loading: false,
  error: true,
});

export default AuthReducer;
