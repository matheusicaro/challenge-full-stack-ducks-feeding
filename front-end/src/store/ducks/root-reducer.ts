import { combineReducers } from 'redux';

import AnimalFeedingReducer from './animal-feeding/reducer';

export const rootReducer = combineReducers({
  animalFeeding: AnimalFeedingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
