import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from '../pages/home';
import MySchedules from '../pages/my-schedules';
import NewAnimalFeedingPage from '../pages/new-animal-feeding';

import PrivateRoute from './PrivateRoute';

export const ROUTES = {
  HOME: {
    path: '/',
    label: 'Home',
    isPrivate: false,
  },
  NEW_ANIMAL_FEEDING: {
    path: '/animal/feeding/add-new',
    label: 'New Feeding',
    isPrivate: true,
  },
  MY_SCHEDULES: {
    path: '/animal/feeding/schedules',
    label: 'My Schedules',
    isPrivate: true,
  },
};

const Routes: React.FC = () => {
  return (
    <Switch>
      <PrivateRoute exact path={ROUTES.NEW_ANIMAL_FEEDING.path} component={NewAnimalFeedingPage} />
      <PrivateRoute exact path={ROUTES.MY_SCHEDULES.path} component={MySchedules} />
      <Route path="*" component={HomePage} />
    </Switch>
  );
};

export default Routes;
