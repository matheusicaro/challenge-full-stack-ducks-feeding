import React from 'react';
import { connect } from 'react-redux';

import { ApplicationState } from '../../../store';
import { User } from '../../../store/ducks/login/types';

import HeaderView from './HeaderView';

type StateProps = {
  authenticated: boolean;
  user: User | null;
};

const Header: React.FC<StateProps> = (props) => {
  return <HeaderView userLogged={props.authenticated} user={props.user} />;
};

const mapStateToProps = (state: ApplicationState) => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Header);
