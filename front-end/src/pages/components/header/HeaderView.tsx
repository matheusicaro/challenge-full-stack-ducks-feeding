import React, { Fragment } from 'react';

import { AppBar as AppBarMaterial, Button, Grow as Transition, Toolbar, Tooltip } from '@material-ui/core';
import { AccountCircle, ExitToApp } from '@material-ui/icons';
import styled from 'styled-components';

import DuckWalking from '../../../assets/images/duck_walking.gif';
import { ROUTES } from '../../../routes';
import { User } from '../../../store/ducks/login/types';

import LoginButtonDialog from './components/LoginDialog';
import RouterLink from './components/RouterLink';
import SingUpButtonDialog from './components/SingUpDialog';
import SessionTime from './SessionTime';

type Props = {
  userLogged: boolean;
  user: User | null;
  currentPath: string;
  sessionExpiresAt: number;
  onLogout: () => void;
};

const TOTAL_MINIMUM_COLUMNS = 6;

const HeaderView: React.FC<Props> = (props) => {
  const routes = Object.values(ROUTES);
  const totalLabels = routes.length > TOTAL_MINIMUM_COLUMNS ? routes.length : TOTAL_MINIMUM_COLUMNS;

  return (
    <AppBarMaterial position="static">
      <Toolbar>
        <Transition in={true} timeout={4000}>
          <Container totalLabels={totalLabels}>
            <Transition in={true} timeout={50000}>
              <img src={DuckWalking} alt="duck walking" />
            </Transition>

            {routes.map(({ isPrivate, path, label }) => (
              <RouterLink
                key={path}
                className={`haeder-label haeder-label-${label.replace(' ', '')} selected-${props.currentPath === path}`}
                userAuthenticated={props.userLogged}
                privateRoute={isPrivate}
                path={path}
                label={label}
              ></RouterLink>
            ))}

            {props.userLogged && (
              <Fragment>
                <Tooltip title={props.user ? `${props.user.name} - ${props.user.email}` : ''} aria-label="add">
                  <Button className="haeder-label header-user-button" variant="outlined" color="inherit">
                    <AccountCircle />
                  </Button>
                </Tooltip>

                <Tooltip title="log out" aria-label="add">
                  <Button className="haeder-label header-user-logout" variant="outlined" color="inherit" onClick={props.onLogout}>
                    <ExitToApp />
                  </Button>
                </Tooltip>
              </Fragment>
            )}

            {!props.userLogged && (
              <Fragment>
                <SingUpButtonDialog className="header-button-singup" />
                <LoginButtonDialog className="header-button-login" />
              </Fragment>
            )}

            {props.userLogged && <SessionTime time={props.sessionExpiresAt} start={props.userLogged} handleTimeExpired={props.onLogout} />}
          </Container>
        </Transition>
      </Toolbar>
    </AppBarMaterial>
  );
};

export default HeaderView;

const Container = styled.section<{ totalLabels: number }>`
  display: grid;
  grid-template-columns: repeat(8, 2fr);
  grid-gap: 10px 10px;
  padding: 15px 160px;
  width: 100%;

  & > img {
    grid-column: 1;
    position: fixed;
    width: 65px;
    border: 1px solid;
    border-radius: 28px;
  }

  .haeder-label-Home {
    grid-column: 2;
  }

  .haeder-label-NewFeeding {
    grid-column: 3;
  }

  .haeder-label-MySchedules {
    grid-column: 4;
  }

  .haeder-label {
    justify-self: center;
    color: inherit;
    text-decoration: auto;
  }

  .haeder-label,
  .header-user-logout,
  .header-user-button {
    grid-row: 1 / 3;
    align-self: center;
  }

  .haeder-label:hover,
  .selected-true {
    border-bottom: 2px solid;
  }

  .actived-false,
  .actived-false:hover {
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
  }

  .actived-false,
  .actived-false:hover {
    opacity: 0.3;
  }

  .header-user-button {
    grid-column: 6;
    justify-self: end;
  }
  .header-user-logout {
    grid-column: 7;
    justify-self: start;
  }

  .header-button-singup {
    grid-column: 7;
    justify-self: end;
  }
  .header-button-login {
    grid-column: 8;
    justify-self: start;
  }

  #header-session-time {
    grid-column: 6;
    opacity: 0.5;
    text-align: end;
    grid-column: 8;
  }
`;
