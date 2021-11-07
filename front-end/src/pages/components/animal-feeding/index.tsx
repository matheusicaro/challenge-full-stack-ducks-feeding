import React from 'react';

import AddNewAnimalFeeding from './add-new-animal-feeding';
import DashboardAnimalFeeding from './dashboard-animal-feeding';

const AnimalFeeding: React.FC = (props) => {
  return (
    <div>
      <AddNewAnimalFeeding />
      <DashboardAnimalFeeding />
    </div>
  );
};

export default AnimalFeeding;
