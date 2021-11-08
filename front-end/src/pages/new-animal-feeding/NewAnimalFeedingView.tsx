import React from 'react';

import { NewAnimalFeeding } from '../../services/types';

type Props = {
  submitFormData: (data: NewAnimalFeeding, animal: string) => void;
};

const NewAnimalFeedingPageView: React.FC<Props> = (props) => {
  const buildNewAnimalMeeding = () => ({
    animal: {
      quantity: 280,
      name: 'DUCK',
    },
    feeding: {
      food: {
        name: 'CORN',
        type: 'CEREAL',
      },
      time: '12:00 PM',
      location: 'Vancouver, BC, Canada',
      quantity_kilos: 2.525, // eslint-disable-line @typescript-eslint/camelcase
    },
    user: {
      email: 'user@email.com',
      name: 'User Name',
    },
  });

  return (
    <main>
      <h1>FORM </h1>
      <button onClick={() => props.submitFormData(buildNewAnimalMeeding(), 'DUCK')}>submit</button>
    </main>
  );
};

export default NewAnimalFeedingPageView;
