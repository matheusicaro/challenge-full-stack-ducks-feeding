import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from '../pages/home';
import NewAnimalFeedingPage from '../pages/new-animal-feeding';

export const ROUTES = {
  HOME: {
    path: '/',
    label: 'Home',
  },
  NEW_ANIMAL_FEEDING: {
    path: '/animal/feeding/add-new',
    label: 'New Feeding',
  },
};

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.NEW_ANIMAL_FEEDING.path} component={NewAnimalFeedingPage} />
      <Route path="*" component={HomePage} />
    </Switch>
  );
};

export default Routes;
