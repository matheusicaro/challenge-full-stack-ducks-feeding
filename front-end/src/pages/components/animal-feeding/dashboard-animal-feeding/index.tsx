import React from 'react';
import { connect } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from '../../../../store';
import { loadRequest } from '../../../../store/ducks/animal-feeding/actions';
import { AnimalFeeding } from '../../../../store/ducks/animal-feeding/types';

export type StateProps = {
  animalFeeding: Array<AnimalFeeding>;
  error: boolean;
  loading: boolean;
};

export type DispatchProps = {
  loadRequest: () => void;
};

export type Props = StateProps & DispatchProps;

/**
 * Stateful Component for Animal Feeding List View
 *
 */
const DashboardAnimalFeeding: React.FC<Props> = (props) => {
  const isStoryEmpty = props.animalFeeding.length < 1 && !props.loading && !props.error;

  if (isStoryEmpty) props.loadRequest();

  if (props.loading) return <h1> loading... </h1>;
  if (props.error) return <h1> ERROOOOOR... </h1>;

  return (
    <div>
      {props.animalFeeding.map((d) => (
        <div>{JSON.stringify(d)}</div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  animalFeeding: state.animalFeeding.data,
  loading: state.animalFeeding.loading,
  error: state.animalFeeding.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ loadRequest }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAnimalFeeding);
