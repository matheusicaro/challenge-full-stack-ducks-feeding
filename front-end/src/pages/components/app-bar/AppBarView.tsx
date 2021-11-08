import React, { Fragment } from 'react';

import { AppBar as AppBarMaterial, Toolbar, Typography } from '@material-ui/core';
import styled from 'styled-components';

import { User } from '../../../store/ducks/login/types';

import LoginDialog from './LoginDialog';
import SingUpDialog from './SingUpDialog';

type Props = {
  userLogged: boolean;
  user: User | null;
};

const AppBarView: React.FC<Props> = (props) => {
  return (
    <AppBarMaterial position="static">
      <Toolbar>
        <Container>
          <Typography id="haeder-label" variant="h6">
            HOME - {props.user ? props.user.name : ''}
          </Typography>

          {!props.userLogged && (
            <Fragment>
              <SingUpDialog className="header-singup" />
              <LoginDialog className="header-login" />
            </Fragment>
          )}
        </Container>
      </Toolbar>
    </AppBarMaterial>
  );
};

export default AppBarView;

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1%;
  width: 100%;

  #haeder-label {
    justify-self: center;
  }
  .header-singup {
    grid-column: 5;
    justify-self: end;
  }
  .header-login {
    grid-column: 6;
  }
`;
