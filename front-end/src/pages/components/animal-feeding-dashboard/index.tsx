import React from 'react';
import { connect } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from '../../../store';
import { loadRequest } from '../../../store/ducks/animal-feeding/actions';
import { AnimalFeeding } from '../../../store/ducks/animal-feeding/types';

import DashboardAnimalFeedingView from './DashboardAnimalFeedingView';

export type StateProps = {
  animalFeeding: Array<AnimalFeeding>;
  error: boolean;
  loading: boolean;
};

export type DispatchProps = {
  loadRequest: () => void;
};

export type Props = StateProps & DispatchProps;

const TABLE_HEADER_LABELS = [
  'ADDED ON',
  'USER',
  'E-MAIL',
  'NUMBER OF DUCKS',
  'FEEDING TIME',
  'FOOD',
  'FOOD TYPE',
  'TOTAL FOOD',
  'LOCATION',
];

/**
 * Stateful Component for Animal Feeding List View
 *
 */
const DashboardAnimalFeeding: React.FC<Props> = (props) => {
  const isStoryEmpty = props.animalFeeding.length < 1 && !props.loading && !props.error;

  if (isStoryEmpty) props.loadRequest();

  return (
    <DashboardAnimalFeedingView
      headerLabels={TABLE_HEADER_LABELS}
      animalFeeding={props.animalFeeding}
      loading={props.loading}
      error={props.error}
      onClickTryAgain={props.loadRequest}
    />
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  animalFeeding: state.animalFeeding.data,
  loading: state.animalFeeding.loading,
  error: state.animalFeeding.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ loadRequest }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAnimalFeeding);
