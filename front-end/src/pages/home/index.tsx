import React from 'react';

import { Grow as Transition, Paper } from '@material-ui/core';

import AnimalFeedingDashboard from '../components/animal-feeding-dashboard';

import Contextualization from './Contextualization';

const HomePage: React.FC = (props) => {
  return (
    <Transition in={true} timeout={2000}>
      <Paper className="Global-alignment" elevation={3} component="article">
        <Contextualization />
        <AnimalFeedingDashboard />
      </Paper>
    </Transition>
  );
};

export default HomePage;
