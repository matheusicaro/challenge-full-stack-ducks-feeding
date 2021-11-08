import React from 'react';
import { connect } from 'react-redux';

import { ApplicationState } from '../../../store';
import { User } from '../../../store/ducks/login/types';

import AppBarView from './AppBarView';

type StateProps = {
  authenticated: boolean;
  user: User | null;
};

const AppBar: React.FC<StateProps> = (props) => {
  return <AppBarView userLogged={props.authenticated} user={props.user} />;
};

const mapStateToProps = (state: ApplicationState) => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(AppBar);
