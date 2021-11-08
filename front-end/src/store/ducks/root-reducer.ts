import { combineReducers } from 'redux';

import AnimalFeedingReducer from './animal-feeding/reducer';
import AuthReducer from './login/reducer';

export const rootReducer = combineReducers({
  animalFeeding: AnimalFeedingReducer,
  auth: AuthReducer
});

export type RootState = ReturnType<typeof rootReducer>;
