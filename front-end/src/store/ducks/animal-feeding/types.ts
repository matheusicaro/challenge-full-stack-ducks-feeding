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
  readonly data: Array<AnimalFeeding>;
  readonly loading: boolean;
  readonly error: boolean;
};

export type Payload = Array<AnimalFeeding>;

export interface Action extends AnyAction {
  payload: Payload;
}

export type AnimalFeeding = {
  id: string;
  createdAt: Date;
  animal: {
    quantity: number;
    name: string;
  };
  feeding: {
    id: string;
    food: {
      name: string;
      type: string;
    };
    time: string;
    location: string;
    quantityKilos: number;
  };
  user: {
    email: string;
    name: string;
  };
};
