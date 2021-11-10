import React, { useState } from 'react';
import { connect } from 'react-redux';

import ApiService from '../../services/api.service';
import { AnimalFeedingDTO, NewAnimalFeeding } from '../../services/types';
import { ApplicationState } from '../../store';
import { User } from '../../store/ducks/login/types';

import NewAnimalFeedingPageView from './NewAnimalFeedingView';
import { HandleInputChangeType, NewAnimalFeedingState, NewFeedingFormData } from './types';

type StateProps = {
  user: User | null;
};

/**
 * Stateful component for control and management of new animal feeding breeding
 *
 */
const NewAnimalFeedingPage: React.FC<StateProps> = (props) => {
  const [state, setState] = useState<NewAnimalFeedingState>(initialState());

  const handleFormDataInput: HandleInputChangeType = (value, field) => {
    if (field) {
      setState((prev) => {
        const newState: NewAnimalFeedingState = { ...prev, formData: { ...prev.formData, [field]: value } };
        newState.invalidFormData = invalidFormData(newState.formData);
        return newState;
      });
    }
  };

  const onError = () => setState((prev) => ({ ...prev, loading: false, error: true, alertType: 'error' }));

  const onSuccess = ({ data }: { data: AnimalFeedingDTO }) =>
    setState((prev) => ({ ...prev, data, loading: false, success: true, alertType: 'success', formData: initialState().formData }));

  const sendNewAnimalFeeding = () => {
    if (!state.loading || !state.error) setState((prev) => ({ ...prev, loading: true, error: false, success: false }));

    ApiService.saveAnimalFeeding(buildNewAnimalFeeding(state.formData, props.user), state.formData.animalName)
      .then(onSuccess)
      .catch(onError);
  };

  return (
    <NewAnimalFeedingPageView
      onClickSubmitButton={sendNewAnimalFeeding}
      handleInputChange={handleFormDataInput}
      requestSending={{
        loading: state.loading,
        error: state.error,
        success: state.success,
        alert: state.alertType ? ALERTS[state.alertType].type : state.alertType,
        alertMessage: state.alertType ? ALERTS[state.alertType].message : state.alertType,
      }}
      formData={state.formData}
      invalidFormData={state.invalidFormData}
    />
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(NewAnimalFeedingPage);

const initialState = (): NewAnimalFeedingState => ({
  error: false,
  loading: false,
  success: false,
  invalidFormData: true,
  formData: {
    animalQuantity: '0',
    animalName: 'duck',
    foodName: '',
    foodType: '',
    feedingTime: '07:30',
    location: '',
    quantityKilos: '0',
  },
});

/**
 * Function responsible for building model and instance of attributes to request external service
 *
 * @param  {NewFeedingFormData} data
 * @param  {User | null} user
 *
 * @returns {NewAnimalFeeding} returns the external request model service
 */
const buildNewAnimalFeeding = (data: NewFeedingFormData, user: User | null): NewAnimalFeeding => {
  return {
    animal: {
      name: data.animalName.toLocaleUpperCase(),
      quantity: parseInt(data.animalQuantity),
    },
    feeding: {
      time: getTimeInEnglishFormat(data.feedingTime),
      food: {
        name: data.foodName.toLocaleUpperCase(),
        type: data.foodType.toLocaleUpperCase(),
      },
      location: data.location,
      // eslint-disable-next-line @typescript-eslint/camelcase
      quantity_kilos: parseInt(data.animalQuantity),
    },
    user: user || { name: '', email: '' },
  };
};

/**
 * Function responsible for validating the form filled in by the visualization component, it is a valid data to be sent
 *
 * @param  {NewFeedingFormData} data
 *
 * @returns {boolean}
 */
const invalidFormData = (data: NewFeedingFormData) =>
  !data.animalName ||
  !parseInt(data.animalQuantity) ||
  !data.feedingTime ||
  !data.foodName ||
  !data.foodType ||
  !data.location ||
  !parseInt(data.quantityKilos);

type AlertType = {
  type: 'success' | 'error';
  message: string;
};

const ALERTS: { success: AlertType; error: AlertType } = {
  success: {
    type: 'success',
    message: 'Your information has been sent successfully! Thank you so much for contributing to my research =)',
  },

  error: {
    type: 'error',
    message: 'Your information could not be sent. I am very sorry, please try again later.',
  },
};

/**
 * Function responsible for formatting input time as English format for viewing date time.
 *
 * @param  {string} data - example input 15:45
 * @returns {string} returns 03:45 PM
 */
const getTimeInEnglishFormat = (time: string): string => {
  if (!time) return '';

  const timeSplited = time.split(':');
  const hour = parseInt(timeSplited[0]);
  const minutes = parseInt(timeSplited[1]);

  const currentDate = new Date(new Date().getUTCFullYear(), new Date().getUTCDate(), new Date().getUTCDay(), hour, minutes);

  const timeInEnglishFormat = currentDate
    .toLocaleString('en-US')
    .split(', ')[1]
    .split(':');

  if (!timeInEnglishFormat) return '';

  const hourFormatted = timeInEnglishFormat[0];
  const minutesFormatted = timeInEnglishFormat[1];
  const meridiemTimeFormatted = timeInEnglishFormat[2]?.split(' ')[1];

  return `${hourFormatted}:${minutesFormatted} ${meridiemTimeFormatted}`;
};
