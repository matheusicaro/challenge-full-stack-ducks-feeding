import { AnyAction } from 'redux';

/*
 * Action Types
 */
export enum Types {
  LOAD_REQUEST = '@animalFeeding/LOAD_RESQUEST',
  LOAD_SUCCESS = '@animalFeeding/LOAD_SUCCESS',
  LOAD_FAILURE = '@animalFeeding/LOAD_FAILURE',
}

export type State = {
  readonly data: [];
  readonly loading: boolean;
  readonly error: boolean;
};

export type Payload = [];

export interface Action extends AnyAction {
  payload: Payload;
}
