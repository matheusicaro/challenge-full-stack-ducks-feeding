import React, { useState } from 'react';

import ApiService from '../../../../services/api.service';
import { NewAnimalFeeding } from '../../../../services/types';
import { AnimalFeedingDTO } from '../../../../services/types';

export type NewAnimalFeedingState = {
  data?: NewAnimalFeeding;
  success: boolean;
  loading: boolean;
  error: boolean;
};

/**
 * Stateful component for adding new Animal Feeding integrated with external service for requests and integration with the store
 * for insertion of new created item
 *
 */
const AddNewAnimalFeeding: React.FC = () => {
  const [state, setState] = useState<NewAnimalFeedingState>(initialState());

  const sendNewAnimalFeeding = () => {
    if (!state.loading || !state.error) setState((prev) => ({ ...prev, loading: true }));

    const onSuccess = (data: AnimalFeedingDTO): void => {
      setState((prev) => ({ ...prev, data, loading: false, success: true }));
    };

    const onError = () => setState((prev) => ({ ...prev, loading: false, error: true }));

    ApiService.saveAnimalFeeding(buildNewAnimalMeeding(), 'DUCK')
      .then((response) => onSuccess(response.data))
      .catch(onError);
  };

  return (
    <div>
      <button onClick={sendNewAnimalFeeding}>CLICK HERE</button>
    </div>
  );
};

export default AddNewAnimalFeeding;

const initialState = (): NewAnimalFeedingState => ({
  error: false,
  loading: false,
  success: false,
});

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
