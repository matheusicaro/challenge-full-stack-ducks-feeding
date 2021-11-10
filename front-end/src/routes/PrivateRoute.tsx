import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import AuthService from '../services/auth';

import { ROUTES } from '.';

interface PrivateRouteProps extends Omit<RouteProps, 'component'> {
  component: React.ElementType;
}


const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        AuthService.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: ROUTES.HOME.path, state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
