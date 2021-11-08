
import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';

import { ROUTES } from '../../../routes';

import DashboardAnimalFeeding from './dashboard-animal-feeding';

const AnimalFeeding: React.FC = (props) => {
  return (
    <div>
      <Button>
        <Link to={ROUTES.NEW_ANIMAL_FEEDING.path}>ADD NEW ANIMAL FEEDING</Link>
      </Button>
      <DashboardAnimalFeeding />
    </div>
  );
};

export default AnimalFeeding;
