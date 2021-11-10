import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from '../../../store';
import { logout } from '../../../store/ducks/login/actions';
import { User } from '../../../store/ducks/login/types';

import HeaderView from './HeaderView';

type StateProps = {
  authenticated: boolean;
  sessionExpiresAt: number | null;
  user: User | null;
};

export type DispatchProps = {
  logout: () => void;
};

const Header: React.FC<StateProps & DispatchProps> = (props) => {
  const location = useLocation();

  return (
    <HeaderView
      userLogged={props.authenticated}
      sessionExpiresAt={props.sessionExpiresAt || 0}
      user={props.user}
      currentPath={location.pathname}
      onLogout={props.logout}
    />
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  authenticated: state.auth.authenticated,
  sessionExpiresAt: state.auth.sessionExpiresAt,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
