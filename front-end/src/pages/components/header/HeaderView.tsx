import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { AppBar as AppBarMaterial, Button, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle, ExitToApp } from '@material-ui/icons';
import styled from 'styled-components';

import { ROUTES } from '../../../routes';
import { User } from '../../../store/ducks/login/types';

import LoginDialog from './components/LoginDialog';
import SingUpDialog from './components/SingUpDialog';
import SessionTime from './SessionTime';

type Props = {
  userLogged: boolean;
  user: User | null;
  currentPath: string;
  sessionExpiresAt: number;
  handleTimeExpired: () => void;
};

const TOTAL_MINIMUM_COLUMNS = 6;

const HeaderView: React.FC<Props> = (props) => {
  const routes = Object.values(ROUTES);
  const totalLabels = routes.length > TOTAL_MINIMUM_COLUMNS ? routes.length : TOTAL_MINIMUM_COLUMNS;

  return (
    <AppBarMaterial position="static" style={{ marginBottom: '5%' }}>
      <Toolbar>
        <Container totalLabels={totalLabels}>
          {routes.map(({ isPrivate, path, label }) => (
            <RouterLink
              key={path}
              className={`haeder-label selected-${props.currentPath === path}`}
              userAuthenticated={props.userLogged}
              privateRoute={isPrivate}
              path={path}
              label={label}
            ></RouterLink>
          ))}

          {props.userLogged && (
            <Fragment>
              <Button className="haeder-label header-last-b1" variant="outlined" color="inherit" onClick={console.log}>
                <AccountCircle />
              </Button>
              <Button className="haeder-label header-last-b2" variant="outlined" color="inherit" onClick={console.log}>
                <ExitToApp />
              </Button>
            </Fragment>
          )}

          {!props.userLogged && (
            <Fragment>
              <SingUpDialog className="header-button-singup" />
              <LoginDialog className="header-button-login" />
            </Fragment>
          )}

          {props.userLogged && (
            <SessionTime time={props.sessionExpiresAt} start={props.userLogged} handleTimeExpired={props.handleTimeExpired} />
          )}
        </Container>
      </Toolbar>
    </AppBarMaterial>
  );
};

export default HeaderView;

const Label = ({ label }: { label: string }) => <Typography variant="h6">{label}</Typography>;

const RouterLink = ({
  privateRoute,
  userAuthenticated,
  path,
  label,
  className,
}: {
  privateRoute: boolean;
  userAuthenticated: boolean;
  path: string;
  label: string;
  className: string;
}) => {
  if (privateRoute && !userAuthenticated)
    return (
      <button className={`${className} actived-false`} disabled={true}>
        <Label label={label} />
      </button>
    );

  return (
    <Link key={label} className={className} to={path}>
      <Label label={label} />
    </Link>
  );
};

const Container = styled.section<{ totalLabels: number }>`
  display: grid;
  grid-template-columns: repeat(8, 2fr);
  grid-gap: 10px 10px;
  padding: 15px 160px;
  width: 100%;

  .haeder-label {
    justify-self: center;
    color: inherit;
    text-decoration: auto;
  }

  .haeder-label,
  .header-last-b2,
  .header-last-b1 {
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

  .header-last-b1 {
    grid-column: 6;
    justify-self: end;
  }
  .header-last-b2 {
    grid-column: 7;
    justify-self: start;
  }

  .header-button-singup{
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
