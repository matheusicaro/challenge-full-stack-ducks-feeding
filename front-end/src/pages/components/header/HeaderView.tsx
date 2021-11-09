import React, { Fragment } from 'react';

import { AppBar as AppBarMaterial, Toolbar, Typography } from '@material-ui/core';
import styled from 'styled-components';

import { ROUTES } from '../../../routes';
import { User } from '../../../store/ducks/login/types';

import LoginDialog from './LoginDialog';
import SingUpDialog from './SingUpDialog';

type Props = {
  userLogged: boolean;
  user: User | null;
};

const TOTAL_MINIMUM_COLUMNS = 6;

const HeaderView: React.FC<Props> = (props) => {
  const routes = Object.values(ROUTES);
  const totalLabels = routes.length > TOTAL_MINIMUM_COLUMNS ? routes.length : TOTAL_MINIMUM_COLUMNS;

  return (
    <AppBarMaterial position="static">
      <Toolbar>
        <Container totalLabels={totalLabels}>
          {routes.map(({ label }) => (
            <Typography key={label} className="haeder-label" variant="h6">
              {label}
            </Typography>
          ))}

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

export default HeaderView;

const Container = styled.section<{ totalLabels: number }>`
  display: grid;
  grid-template-columns: ${({ totalLabels }) => `repeat(${totalLabels}, 1fr)`};
  grid-gap: 1%;
  width: 100%;

  .haeder-label {
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
