import { combineReducers } from 'redux';

import AnimalFeedingReducer from './animal-feeding/reducer';

export const rootReducer = combineReducers({
  AnimalFeeding: AnimalFeedingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
